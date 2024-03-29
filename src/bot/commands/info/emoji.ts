import CyborgCommand from '../../structures/CyborgCommand';
import { GuildEmoji, Message, MessageEmbed, Permissions } from 'discord.js';
import * as emojis from 'node-emoji';
import * as punycode from 'punycode';
import { COLORS } from '../../util/Constants';

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;

export default class EmojiInfoCommand extends CyborgCommand {
	public constructor() {
		super('emoji', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.DESCRIPTION.CONTENT,
				usage: () => '<emoji>',
				examples: () => ['🤔', 'thinking_face', '713815930983153675', '<:Thonk:713815930983153675>'],
			},
			category: 'info',
			//channel: 'guild',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'emoji',
					match: 'content',
					type: async (message, content) => {
						if (EMOJI_REGEX.test(content)) [, content] = EMOJI_REGEX.exec(content)!;
						const guild = message.guild;
						if (!isNaN((content as unknown) as number)) return guild?.emojis.cache.get(content) || this.client.emojis.cache.get(content);
						return guild?.emojis.cache.find(e => e.name === content) || emojis.find(content) || this.client.emojis.cache.find(e => e.name === content);
					},
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.PROMPT.START(message.author),
						retry: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.PROMPT.RETRY(message.author),
					},
				},
			],
		});
	}

	public async exec(message: Message, { emoji }: { emoji: GuildEmoji | emojis.Emoji }) {
		const embed = new MessageEmbed().setColor(COLORS.EMBED);

		if (emoji instanceof GuildEmoji) {
			embed.setDescription(this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.EMBED.DESCRIPTION.GUILDEMOJI(emoji));
			embed.setThumbnail(emoji.url ?? '');
			embed.addField('ﾅ ' + this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.EMBED.FIELD_INFO.NAME, this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.EMBED.FIELD_INFO.VALUE.GUILDEMOJI(emoji));
		} else {
			embed.setDescription(this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.EMBED.DESCRIPTION.EMOJI(emoji));
			embed.addField(
				'ﾅ ' + this.client.LOCALE(message.guild!).COMMANDS.INFO.EMOJI.EMBED.FIELD_INFO.NAME,
				this.client
					.LOCALE(message.guild!)
					.COMMANDS.INFO.EMOJI.EMBED.FIELD_INFO.VALUE.EMOJI(emoji)
					.replace(
						'$(unicode)',
						`\`${punycode.ucs2
							.decode(emoji.emoji)
							.map((e: any) => `\\u${e.toString(16).toUpperCase().padStart(4, '0')}`)
							.join('')}\``
					)
			);
		}
		return message.util
			?.send(embed)
			.then(msg => msg.react(emoji instanceof GuildEmoji ? emoji : emoji.emoji))
			.catch(() => {});
	}
}
