import CyborgClient from '../client/CyborgClient';
import { TextChannel, MessageEmbed, Message } from 'discord.js';
import { TwitchStreamsInsertInput, TwitchStreams } from '../util/graphQLTypes';
import { graphQLClient, GRAPHQL } from '../util/graphQL';
import fetch from 'node-fetch';
import moment = require('moment');
import { SETTINGS } from '../util/Constants';
import { TOPICS, EVENTS } from '../util/Logger';

export default class TwitchScheduler {
	private readonly checkRate: number;

	private checkInterval!: NodeJS.Timeout;

	public streamers = new Map();

	public constructor(private readonly client: CyborgClient, { checkRate = 1.5 * 1000 * 60 } = {}) {
		this.checkRate = checkRate;
	}

	private async online(
		onlineData: {
			user_id: string;
			user_name: string;
			game_id: string;
			title: string;
			viewer_count: number;
			started_at: string;
			thumbnail_url: string;
		},
		storedData: {
			id: number;
			guild: string;
			channel: string;
			message: string;
			categories: string[];
			online: boolean;
			streamerName: string;
			duration: number;
			startedAt: string;
		},
		ID: number
	) {
		const bodyGame = await fetch(`https://api.twitch.tv/helix/games?id=${onlineData.game_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.TWITCH_BEARER}`,
				'Client-ID': `${process.env.TWITCH_CLIENTID}`,
			},
		});
		const bodyPic = await fetch(`https://api.twitch.tv/helix/users?login=${onlineData.user_name.toLowerCase()}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.TWITCH_BEARER}`,
				'Client-ID': `${process.env.TWITCH_CLIENTID}`,
			},
		});
		const game = await bodyGame.json();
		const pic = await bodyPic.json();

		storedData.categories = [game.data.length === 0 ? '\u200b' : game.data[0].name];

		const guild = this.client.guilds.cache.get(storedData.guild)!;
		const channel = guild.channels.cache.get(storedData.channel) as TextChannel;
		const gameName = game.data.length === 0 ? '\u200b' : game.data[0].name;
		const embed = new MessageEmbed()
			.setColor('#FF0000')
			.setAuthor(onlineData.user_name, pic.data[0].profile_image_url)
			.setThumbnail(pic.data[0].profile_image_url)
			.setURL(`https://www.twitch.tv/${onlineData.user_name.toLowerCase()}`)
			.setTitle(onlineData.title)
			.addField(
				`${gameName === 'Just Chatting' ? this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FIELD_CATEGORY.CATEGORY : this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FIELD_CATEGORY.GAME}`,
				`${gameName}`,
				true
			)
			.addField(this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FIELD_VIEWERS, `${onlineData.viewer_count}`, true)
			.setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${onlineData.user_name.toLowerCase()}.jpg?t=${Date.now()}`)
			.setFooter(this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FOOTER.replace('$(duration)', moment.duration(Date.now() - (new Date(onlineData.started_at) as any)).format('h[h ]m[m ]s[s ]')));

		const message = await channel
			.send(this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_MESSAGE.replace('$(streamer)', onlineData.user_name.replace(/([^a-zA-Z0-9])/g, '\\$1')) + `\n<https://www.twitch.tv/${onlineData.user_name}>`, {
				embed,
			})
			.catch(() => {});

		if (!message) return;

		this.streamers.set(ID, {
			...storedData,
			message: message.id,
			online: true,
			streamerName: onlineData.user_name,
			duration: Date.now() - (new Date(onlineData.started_at) as any),
			startedAt: onlineData.started_at,
		});

		graphQLClient.mutate<any, TwitchStreamsInsertInput>({
			mutation: GRAPHQL.MUTATION.UPDATE_TWITCH_STREAMS,
			variables: {
				...this.streamers.get(ID),
				streamer: onlineData.user_id,
				id: ID,
			},
		});
	}

	private async update(
		onlineData: {
			user_id: string;
			user_name: string;
			game_id: string;
			title: string;
			viewer_count: number;
			started_at: string;
			thumbnail_url: string;
		},
		storedData: {
			id: number;
			guild: string;
			channel: string;
			message: string;
			categories: string[];
			online: boolean;
			streamerName: string;
			duration: number;
			startedAt: string;
		},
		ID: number
	) {
		const bodyGame = await fetch(`https://api.twitch.tv/helix/games?id=${onlineData.game_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.TWITCH_BEARER}`,
				'Client-ID': `${process.env.TWITCH_CLIENTID}`,
			},
		});
		const game = await bodyGame.json();

		let newCat: string[] = storedData.categories;
		if (!newCat.includes(game.data.length === 0 ? '\u200b' : game.data[0].name)) newCat.push(game.data.length === 0 ? '\u200b' : game.data[0].name);

		const guild = this.client.guilds.cache.get(storedData.guild);
		const channel = guild?.channels.cache.get(storedData.channel) as TextChannel;
		if (!channel) return;
		let message: Message;
		try {
			message = await channel.messages.fetch(storedData.message);
		} catch (err) {
			return this.offline(storedData, ID);
		}

		const gameName = game.data.length === 0 ? '\u200b' : game.data[0].name;
		const embed = new MessageEmbed(message.embeds[0])
			.setTitle(onlineData.title)
			.setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${onlineData.user_name.toLowerCase()}.jpg?t=${Date.now()}`)
			.spliceFields(0, 2, [
				{
					name: `${gameName === 'Just Chatting' ? this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FIELD_CATEGORY.CATEGORY : this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FIELD_CATEGORY.GAME}`,
					value: `${game.data.length === 0 ? '\u200b' : game.data[0].name}`,
					inline: true,
				},
				{
					name: this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FIELD_VIEWERS,
					value: `${onlineData.viewer_count}`,
					inline: true,
				},
			])
			.setFooter(this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_EMBED.FOOTER.replace('$(duration)', moment.duration(Date.now() - (new Date(onlineData.started_at) as any)).format('h[h ]m[m ]s[s ]')));
		message.edit(
			this.client.LOCALE(guild!).COMMANDS.TWITCH.ONLINE_MESSAGE.replace('$(streamer)', onlineData.user_name.replace(/([^a-zA-Z0-9])/g, '\\$1')) + `\n<https://www.twitch.tv/${onlineData.user_name}>`,
			embed
		);

		this.streamers.set(ID, {
			...storedData,
			duration: Date.now() - (new Date(onlineData.started_at) as any),
			startedAt: onlineData.started_at,
			categories: newCat,
		});
		// only worth when DB is local, else too slow to maintain :(
		/* 
                graphQLClient.mutate<any, TwitchStreamsInsertInput>({
                    mutation: GRAPHQL.MUTATION.UPDATE_TWITCH_STREAMS,
                    variables: {
                        id: ID,
                        ...this.streamers.get(ID),
                        streamer: onlineData.user_id
                    },
                }); */
	}

	private async offline(
		storedData: {
			id: number;
			guild: string;
			channel: string;
			message: string;
			categories: string[];
			online: boolean;
			streamerName: string;
			startedAt: string;
			duration: number;
		},
		ID: number
	) {
		const guild = this.client.guilds.cache.get(storedData.guild)!;
		const channel = guild.channels.cache.get(storedData.channel) as TextChannel;
		let message;
		try {
			message = (await channel.messages.fetch(storedData.message)) as Message;
		} catch {
			message = null;
		}

		const embed = new MessageEmbed(message?.embeds[0])
			.setColor('#202225')
			.setAuthor('')
			.spliceFields(0, 2)
			.setImage(null as any)
			.setDescription(
				this.client
					.LOCALE(guild)
					.COMMANDS.TWITCH.OFFLINE_EMBED.DESCRIPTION.replace(
						'$(strmd)',
						storedData.categories
							.filter((c: string) => c !== '\u200b')
							.map((c: string) => `\`${c}\``)
							.join(' • ')
					)
					.replace('$(strtd)', moment(storedData.startedAt).utcOffset(-3).format('D/M/YY HH:mm:ss'))
					.replace('$(endd)', moment(storedData.startedAt).utcOffset(-3).add(storedData.duration, 'milliseconds').format('D/M/YY HH:mm:ss'))
					.replace('$(ttt)', moment.duration(storedData.duration).format('h[h]m[m]s[s]'))
			)
			.setFooter(this.client.LOCALE(guild!).COMMANDS.TWITCH.OFFLINE_EMBED.FOOTER.replace('$(streamer)', storedData.streamerName))
			.setTimestamp(new Date(storedData.startedAt));

		if (message) message.edit(this.client.LOCALE(guild!).COMMANDS.TWITCH.OFFLINE_MESSAGE, embed);
		else
			channel
				.send(
					this.client
						.LOCALE(guild)
						.COMMANDS.TWITCH.DELETED_MESSAGE.replace(/\$\(streamer\)/g, storedData.streamerName)
						.replace('$(prefix)', this.client.settings.get(storedData.guild, SETTINGS.PREFIX, process.env.COMMAND_PREFIX))
				)
				.catch(() => {});

		await graphQLClient.mutate<any, TwitchStreamsInsertInput>({
			mutation: GRAPHQL.MUTATION.UPDATE_TWITCH_STREAMS,
			variables: {
				id: ID,
				...this.streamers.get(ID),
				online: false,
				message: null,
				categories: [],
				duration: null,
				startedAt: null,
			},
		});
		this.streamers.set(ID, {
			...this.streamers.get(ID),
			message: null,
			categories: [],
			online: false,
			startedAt: null,
			duration: null,
		});
	}

	private streams(stream: TwitchStreams) {
		this.streamers.set(stream.id, {
			streamer: stream.streamer,
			guild: stream.guild,
			channel: stream.channel,
			message: stream.message,
			categories: stream.categories,
			online: stream.online,
			streamerName: stream.streamerName,
			startedAt: stream.startedAt,
			duration: stream.duration,
		});
	}

	public async init() {
		if (this.checkInterval) return;
		await this.check();
		this.checkInterval = this.client.setInterval(this.check.bind(this), this.checkRate);
	}

	private async check(): Promise<boolean> {
		let storedStreams: TwitchStreams[];
		try {
			const { data } = await graphQLClient.query<any, TwitchStreamsInsertInput>({
				query: GRAPHQL.QUERY.TWITCH_STREAMS,
			});

			storedStreams = data.twitchStreams;
		} catch (err) {
			this.client.logger.error(err, { topic: TOPICS.TWITCH, event: EVENTS.ERROR });
			storedStreams = [
				{ id: 0, streamer: '137512886', guild: '701892016337977394', channel: '701928421898453034', message: null, categories: [], online: false, streamerName: 'Giu14_', startedAt: null, duration: null },
				{ id: 1, streamer: '241862747', guild: '703820623624798208', channel: '703822562819440720', message: null, categories: [], online: false, streamerName: 'FornalhaRunica', startedAt: null, duration: null },
				{ id: 2, streamer: '241862747', guild: '706581070514094100', channel: '706603026357420103', message: null, categories: [], online: false, streamerName: 'FornalhaRunica', startedAt: null, duration: null },
			];
		}

		for (const stream of storedStreams) {
			if (this.streamers.has(stream.id)) continue;
			this.streams(stream);
		}

		for (const stream of this.streamers.keys()) {
			if (!storedStreams.find(s => s.id === stream)) this.streamers.delete(stream);
		}

		try {
			const body = await fetch(
				`https://api.twitch.tv/helix/streams?${Array.from(this.streamers.values())
					.map(s => `user_id=${s.streamer}`)
					.join('&')}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${process.env.TWITCH_BEARER}`,
						'Client-ID': `${process.env.TWITCH_CLIENTID}`,
					},
				}
			);

			const onlineStreams = await body.json();

			for (const streamer of this.streamers) {
				const onlineData = onlineStreams.data.find((s: { user_id: string }) => s.user_id === streamer[1].streamer);

				if (!onlineData && !streamer[1].online) continue;

				if (!onlineData && streamer[1].online && streamer[1].message) await this.offline(streamer[1], streamer[0]);

				if (onlineData && !streamer[1].online) await this.online(onlineData, streamer[1], streamer[0]);

				if (onlineData && streamer[1].online && streamer[1].message) await this.update(onlineData, streamer[1], streamer[0]);
			}
		} catch (err) {
			this.client.logger.error(err, { topic: TOPICS.TWITCH, event: EVENTS.ERROR });
			return false;
		}

		return true;
	}
}
