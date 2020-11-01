import CyborgCommand from '../../../structures/CyborgCommand';
import { Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';

export default class DeleteConfigCommand extends CyborgCommand {
	public constructor() {
		super('config-delete', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.DESCRIPTION.CONTENT,
				usage: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.DESCRIPTION.USAGE,
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
				return this.client.LOCALE(msg.guild!).COMMANDS.CONFIG.DELETE.REPLY(prefix);
			},
		};

		return Flag.continue(key);
	}
}
