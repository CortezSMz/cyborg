import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions, TextChannel } from 'discord.js';
import 'moment-duration-format';
import { LOCALE, COLORS } from '../../util/constants';

export default class ChannelInfoCommand extends Command {
	public constructor() {
		super('channel', {
			aliases: ['channel', 'channel-info'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.INFO.CHANNEL.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.INFO.CHANNEL.DESCRIPTION.USAGE,
				examples: (message: Message) => LOCALE(message.guild!).COMMANDS.INFO.CHANNEL.DESCRIPTION.EXAMPLES,
			},
			category: 'info',
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'channel',
					match: 'content',
					type: 'channel',
					default: (message: Message) => message.channel,
				},
			],
		});
	}

	public async exec(message: Message, { channel }: { channel: TextChannel }) {
		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setDescription(LOCALE(message.guild!).COMMANDS.INFO.CHANNEL.EMBED.DESCRIPTION(channel))
			.addField(
				'ﾅ ' + LOCALE(message.guild!).COMMANDS.INFO.CHANNEL.EMBED.FIELD_INFO.NAME,
				LOCALE(message.guild!).COMMANDS.INFO.CHANNEL.EMBED.FIELD_INFO.VALUE(channel)
			)
			.setThumbnail(message.guild!.iconURL() ?? '');

		return message.util?.send(embed);
	}
}
