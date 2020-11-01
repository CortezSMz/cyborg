import CyborgCommand from '../../../structures/CyborgCommand';
import { Message, Permissions } from 'discord.js';

export default class ClearConfigCommand extends CyborgCommand {
	public constructor() {
		super('config-clear', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.CLEAR.DESCRIPTION.CONTENT,
				usage: () => null,
				examples: () => null,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		this.client.settings.clear(message.guild!);
		return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.CONFIG.CLEAR.REPLY);
	}
}
