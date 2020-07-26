import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { LOCALE } from '../../../util/constants';

export default class ToggleCommand extends Command {
	public constructor() {
		super('config-toggle', {
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.TOGGLE.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.TOGGLE.DESCRIPTION.USAGE,
				examples: () => null,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public * args(): object {
		const method = yield {
			type: [
				['config-toggle-role-state', 'role', 'rolestate', 'role-state'],
			],
			otherwise: (msg: Message) => {
				const prefix = (this.handler.prefix as PrefixSupplier)(msg);
				return LOCALE(msg.guild!).COMMANDS.CONFIG.TOGGLE.REPLY(prefix);
			},
		};

		return Flag.continue(method);
	}
}
