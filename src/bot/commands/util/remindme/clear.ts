import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { graphQLClient, GRAPHQL } from '../../../util/graphQL';
import { RemindmesInsertInput, Remindmes } from '../../../util/graphQLTypes';
import { stripIndents } from 'common-tags';
import { SETTINGS } from '../../../util/constants';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-clear', {
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
			query: GRAPHQL.QUERY.REMINDMES_AUTHOR,
			variables: {
				author: message.author.id,
			},
		});
		let remindmes: Remindmes[];
		remindmes = data.remindmes;
		if (remindmes.length == 0) return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.CLEAR.NOT_FOUND);

		await message.util?.send(
			this.client
				.LOCALE(message.guild!)
				.COMMANDS.UTIL.REMINDME.CLEAR.AWAIT_MESSAGE.replace('$(qtd)', `${remindmes.length}`)
				.replace('$(s)', remindmes.length > 1 ? 's' : '')
		);

		const responses = await message.channel.awaitMessages((msg: Message) => msg.author.id === message.author.id, {
			max: 1,
			time: 10000,
		});

		if (responses?.size !== 1) {
			return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.CLEAR.TIMEOUT);
		}
		const response = responses.first();

		if (/^y(?:e(?:a|s)?s?)?$|^s(?:i(?:m)?)?$/i.test(response?.content ?? '')) {
			const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
				query: GRAPHQL.QUERY.REMINDMES_CLEAR_AUTHOR,
				variables: {
					author: message.author.id,
				},
			});
			for (const remind of remindmes) {
				const schedule = this.client.remindmeScheduler.queued.get(remind.id);
				if (schedule) this.client.clearTimeout(schedule);
				this.client.remindmeScheduler.queued.delete(remind.id);
			}
			return message.channel.send(
				this.client
					.LOCALE(message.guild!)
					.COMMANDS.UTIL.REMINDME.CLEAR.REPLY.replace('$(qtd)', data.deleteRemindmes.affected_rows)
					.replace('$(s)', remindmes.length > 1 ? 's' : '')
			);
		}
	}
}
