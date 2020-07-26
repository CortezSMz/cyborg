import { Command } from 'discord-akairo';
import { Message, Permissions, TextChannel } from 'discord.js';
import { LOCALE, SETTINGS } from '../../../util/constants';

export default class SetConfigMemberLogCommand extends Command {
	public constructor() {
		super('config-set-memberlog', {
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.MEMBER_LOG.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.MEMBER_LOG.DESCRIPTION.USAGE,
				examples: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.MEMBER_LOG.DESCRIPTION.EXAMPLES
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
			args: [
				{
					id: 'channel',
					match: 'content',
					type: 'textChannel',
				}
			],
		});
	}

	public async exec(message: Message, { channel }: { channel: TextChannel }) {
		const guild = message.guild!;
		const memberlog = this.client.settings.get(guild, SETTINGS.MEMBER_LOG, { CHANNEL: '' });
		memberlog.CHANNEL = channel.id;
		this.client.settings.set(guild, SETTINGS.MEMBER_LOG, memberlog);
		return message.util?.reply(LOCALE(message.guild!).COMMANDS.CONFIG.SET.MEMBER_LOG.REPLY(channel.name));
	}
}
