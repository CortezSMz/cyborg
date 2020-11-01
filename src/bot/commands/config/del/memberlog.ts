import CyborgCommand from '../../../structures/CyborgCommand';
import { Message, Permissions } from 'discord.js';
import { SETTINGS } from '../../../util/Constants';

export default class DeleteConfigMemberLogCommand extends CyborgCommand {
	public constructor() {
		super('config-del-memberlog', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.MEMBER_LOG.DESCRIPTION.CONTENT,
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
		this.client.settings.delete(message.guild!, SETTINGS.MEMBER_LOG);
		return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DELETE.MEMBER_LOG.REPLY);
	}
}
