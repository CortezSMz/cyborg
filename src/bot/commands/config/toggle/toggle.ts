import CyborgCommand from '../../../structures/CyborgCommand';
import { Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';

export default class ToggleCommand extends CyborgCommand {
	public constructor() {
		super('config-toggle', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.TOGGLE.DESCRIPTION.CONTENT,
				usage: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.TOGGLE.DESCRIPTION.USAGE,
				examples: () => null,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public *args(): object {
		const method = yield {
			type: [['config-toggle-role-state', 'role', 'rolestate', 'role-state']],
			otherwise: (msg: Message) => {
				const prefix = (this.handler.prefix as PrefixSupplier)(msg);
				return this.client.LOCALE(msg.guild!).COMMANDS.CONFIG.TOGGLE.REPLY(prefix);
			},
		};

		return Flag.continue(method);
	}
}
