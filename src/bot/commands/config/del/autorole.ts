import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { SETTINGS } from '../../../util/constants';

export default class DeleteConfigMemberLogCommand extends Command {
	public constructor() {
		super('config-del-autorole', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.AUTO_ROLE.DESCRIPTION.CONTENT,
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
		this.client.settings.delete(message.guild!, SETTINGS.AUTO_ROLE);
		return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.AUTO_ROLE.REPLY);
	}
}
