import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { MESSAGES, SETTINGS } from '../../../util/constants';

export default class CheckConfigCommand extends Command {
	public constructor() {
		super('config-check', {
			description: {
				content: MESSAGES.COMMANDS.CONFIG.CHECK.DESCRIPTION,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const guild = message.guild!;
		const guildlog = this.client.settings.get(guild, SETTINGS.GUILD_LOG);
		const roleState = this.client.settings.get(guild, SETTINGS.ROLE_STATE);
		const memberlog = this.client.settings.get(guild, SETTINGS.MEMBER_LOG, { ID: '', MENTION: false });
		let guildlogChannel;
		if (guildlog) {
			guildlogChannel = this.client.configWebhooks.get(guildlog)?.channelID;
		}

		return message.util?.send(
			new MessageEmbed()
				.addField('ﾅ Role State', roleState ? `\`✅\`` : '`❌`')
				.addField('ﾅ Guild Log', guildlogChannel ? `${guild.channels.cache.get(guildlogChannel)} \`✅\`` : '`❌`')
				.addField('ﾅ Member Log', memberlog.ID ? `${guild.channels.cache.get(memberlog.ID)} ${memberlog.MENTION ? '(w/ mention)' : ''} \`✅\`` : '`❌`')
				.setThumbnail(guild.iconURL() ?? '')
		);
	}
}
