import * as moment from 'moment';
import { TextChannel, DMChannel } from 'discord.js';
import CyborgClient from '../client/CyborgClient';
import { PRODUCTION, COLORS } from '../util/Constants';
import { GRAPHQL, graphQLClient } from '../util/graphQL';
import { Remindmes, RemindmesInsertInput } from '../util/graphQLTypes';
import { EVENTS, TOPICS } from '../util/Logger';
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';

export default class RemindmeScheduler {
	private readonly checkRate: number;

	private checkInterval!: NodeJS.Timeout;

	public queued = new Map();

	public constructor(private readonly client: CyborgClient, { checkRate = 1000 } = {}) {
		this.checkRate = checkRate;
	}

	public async add(remindme: Omit<Remindmes, 'id' | 'duration'>, duration: number) {
		let chan;
		if (remindme.guild == '@dm') {
			chan = ((await this.client.users.fetch(remindme.channel)) as unknown) as DMChannel;
		} else {
			chan = this.client.channels.cache.get(remindme.channel) as TextChannel;
		}

		const msg = await chan.messages.fetch(remindme.message);
		this.client.logger.info(
			stripIndents`
			Remindme started on ${remindme.guild == '@me' ? "DM's" : this.client.guilds.cache.get(remindme.guild)}${chan.type == 'dm' ? '' : ` channel ${(chan as TextChannel).name}`}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.REMINDME }
		);
		const { data } = await graphQLClient.mutate<any, RemindmesInsertInput>({
			mutation: GRAPHQL.MUTATION.INSERT_REMINDMES,
			variables: {
				guild: remindme.guild,
				channel: remindme.channel,
				message: remindme.message,
				author: remindme.author,
				duration: new Date(Date.now() + duration).toISOString(),
				text: remindme.text,
			},
		});
		if (PRODUCTION) remindme = data.insertRemindmes.returning[0];
		else remindme = data.insertRemindmesStaging.returning[0];

		let timeStr = moment.duration(duration).format('y[ year, ]M[ month, ]w[ week, ]d[ day, ]h[ hour, ]m[ minute and ]s[ second]');
		timeStr = timeStr.replace(/((and|,)(\s[0]\s\w+))|(,\s)(\w+\s\w+)( and 0 seconds)/gi, '$4$5$6');
		if (timeStr.endsWith(' and 0 seconds')) timeStr = timeStr.replace(/(,)(\s\d+\s\w+)( and 0 seconds+$)/gi, ' and$2');

		await chan.send(`Alright, ${msg.author}! In ${timeStr}: ${remindme.text}`);

		if (new Date((remindme as Remindmes).duration).getTime() < Date.now() + this.checkRate) {
			this.queue(remindme as Remindmes);
		}
	}

	public async end(remindme: Pick<Remindmes, 'author' | 'channel' | 'duration' | 'guild' | 'id' | 'message' | 'text' | 'createdAt'>) {
		const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
			query: GRAPHQL.QUERY.REMINDMES_ID,
			variables: {
				id: remindme.id,
			},
		});

		let remind: Remindmes;
		if (PRODUCTION) remind = data.remindmes[0];
		else remind = data.remindmesStaging[0];

		let chan;
		if (remindme.guild == '@dm') {
			chan = ((await this.client.users.fetch(remindme.channel)) as unknown) as DMChannel | null;
		} else {
			chan = this.client.channels.cache.get(remindme.channel) as TextChannel | null;
		}
		this.client.logger.info(
			stripIndents`
			Remindme ended on ${remindme.guild == '@me' ? "DM's" : this.client.guilds.cache.get(remindme.guild)}${chan?.type == 'dm' ? '' : ` channel ${(chan as TextChannel)?.name}`}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.REMINDME }
		);

		await graphQLClient.mutate<any, RemindmesInsertInput>({
			mutation: GRAPHQL.MUTATION.CANCEL_REMINDMES,
			variables: {
				id: remind.id,
			},
		});

		let timeStr = moment.duration((Date.now() as any) - (new Date(remind.createdAt) as any)).format('y[ year, ]M[ month, ]w[ week, ]d[ day, ]h[ hour, ]m[ minute and ]s[ second ]');
		timeStr = timeStr.replace(/((and|,)(\s[0]\s\w+))|(,\s)(\w+\s\w+)( and 0 seconds)/gi, '$4$5$6');
		if (timeStr.endsWith(' and 0 seconds')) timeStr = timeStr.replace(/(,)(\s\d+\s\w+)( and 0 seconds+$)/gi, ' and$2');

		const u = await this.client.users.fetch(remind.author);
		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setDescription(`\u200b${remind.text}`)
			.addField(`\u200b`, `[Bring me up, Cy!](https://discordapp.com/channels/${remind.guild}/${remind.channel}/${remind.message})`);
		await chan?.send(`Hey, ${u}! ${timeStr} ago you asked me to remind you of:`, { embed });

		const schedule = this.queued.get(remind.id);
		if (schedule) this.client.clearTimeout(schedule);
		return this.queued.delete(remind.id);
	}

	public queue(remindme: Remindmes) {
		this.queued.set(
			remindme.id,
			this.client.setTimeout_(() => {
				this.end(remindme);
			}, new Date(remindme.duration).getTime() - Date.now())
		);
	}

	public async init() {
		await this.check();
		if (this.checkInterval) return;
		this.checkInterval = this.client.setInterval(this.check.bind(this), this.checkRate);
	}

	public async check(): Promise<boolean> {
		try {
			const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
				query: GRAPHQL.QUERY.REMINDMES_DURATION,
			});
			let remindmes: Remindmes[];
			if (PRODUCTION) remindmes = data.remindmes;
			else remindmes = data.remindmes;
			const now = Date.now();

			for (const remindme of remindmes) {
				if (this.queued.has(remindme.id)) continue;
				if (new Date(remindme.duration).getTime() < now) {
					this.end(remindme);
				} else {
					this.queue(remindme);
				}
			}

			return true;
		} catch (err) {
			this.client.logger.error(err, { TOPIC: TOPICS.HASURA });
			return false;
		}
	}
}
