import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { SETTINGS } from '../../../util/constants';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';

export default class CheckConfigCommand extends Command {
	public constructor() {
		super('config-check', {
			aliases: ['check'],
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.CHECK.DESCRIPTION.CONTENT,
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
		const guild = message.guild!;
		const memberlog = this.client.settings.get(guild, SETTINGS.MEMBER_LOG, { CHANNEL: '' });
		const autorole = this.client.settings.get(guild, SETTINGS.AUTO_ROLE);
		const language = this.client.settings.get(guild, SETTINGS.LANGUAGE);

		return message.util?.send(
			new MessageEmbed()
				.setDescription(
					stripIndents`
				Viewing settings for ${message.guild!.name}
				Prefix for this guild is \`${(this.handler.prefix as PrefixSupplier)(message)}\`
				`
				)
				.addField('❯ Language', language ? `\`${language}\`` : `Using default: ${process.env.DEFAULT_LANG}`, true)
				.addField('❯ Member Log', memberlog.CHANNEL ? `${guild.channels.cache.get(memberlog.CHANNEL)} \`✅\`` : '`❌`', true)
				.addField('❯ Auto Role', autorole ? `${guild.roles.cache.get(autorole)} \`✅\`` : '`❌`', true)
				.setThumbnail(guild.iconURL() ?? '')
		);
	}
}
