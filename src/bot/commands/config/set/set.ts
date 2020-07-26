import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { LOCALE } from '../../../util/constants';

export default class SetConfigCommand extends Command {
	public constructor() {
		super('config-set', {
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.DESCRIPTION.USAGE,
				examples: () => null,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public *args(): object {
		const key = yield {
			type: [
				['config-set-memberlog', 'memberlog', 'member-log', 'member'],
				['config-set-autorole', 'autorole', 'auto-role', 'role'],
			],
			otherwise: (msg: Message) => {
				const prefix = (this.handler.prefix as PrefixSupplier)(msg);
				return LOCALE(msg.guild!).COMMANDS.CONFIG.SET.REPLY(prefix);
			},
		};

		return Flag.continue(key);
	}
}
