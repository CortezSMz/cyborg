import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { LOCALE } from '../../../util/constants';

export default class ClearConfigCommand extends Command {
	public constructor() {
		super('config-clear', {
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.CLEAR.DESCRIPTION.CONTENT,
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
		return message.util?.reply(LOCALE(message.guild!).COMMANDS.CONFIG.CLEAR.REPLY);
	}
}
