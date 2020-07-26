import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { LOCALE } from '../../../util/constants';

export default class DeleteConfigCommand extends Command {
	public constructor() {
		super('config-delete', {
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.DESCRIPTION.USAGE,
				examples: () => null,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public *args() {
		const key = yield {
			type: [
				['config-del-memberlog', 'memberlog', 'member-log', 'member'],
				['config-del-autorole', 'autorole', 'auto-role', 'role'],
			],
			otherwise: (msg: Message): string => {
				const prefix = (this.handler.prefix as PrefixSupplier)(msg);
				return LOCALE(msg.guild!).COMMANDS.CONFIG.DELETE.REPLY(prefix);
			},
		};

		return Flag.continue(key);
	}
}
