import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';

import { graphQLClient, GRAPHQL } from '../../../util/graphQL';
import { RemindmesInsertInput } from '../../../util/graphQLTypes';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-del', {
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'key',
					type: 'integer',
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.DEL.PROMPT.START(message.author),
						retry: (message: Message) =>
							this.client
								.LOCALE(message.guild!)
								.COMMANDS.UTIL.REMINDME.DEL.PROMPT.RETRY(message.author)
								.replace('$(prefix)', (this.handler.prefix as PrefixSupplier)(message) as string),
					},
				},
			],
		});
	}

	public async exec(message: Message, { key }: { key: number }) {
		const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
			query: GRAPHQL.QUERY.REMINDMES_CLEAR_ID,
			variables: {
				id: key,
				author: message.author.id,
			},
		});

		if (data.deleteRemindmes.affected_rows === 0) {
			return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.DEL.ERROR.replace('$(prefix)', (this.handler.prefix as PrefixSupplier)(message) as string));
		}

		const schedule = this.client.remindmeScheduler.queued.get(key);
		if (schedule) this.client.clearTimeout(schedule);
		this.client.remindmeScheduler.queued.delete(key);
		return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.DEL.REPLY.replace('$(key)', `${key}`));
	}
}
