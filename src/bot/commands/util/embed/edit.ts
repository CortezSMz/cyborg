import CyborgCommand from '../../../structures/CyborgCommand';
import { Message } from 'discord.js';

import { Argument } from 'discord-akairo';
import { Flag } from 'discord-akairo';
import { PrefixSupplier } from 'discord-akairo';

export default class EmbedEditCommand extends CyborgCommand {
	public constructor() {
		super('embed-edit', {
			category: 'util',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.EMBED.EDIT.DESCRIPTION.CONTENT,
				usage: () => '<embed> [--hoist/--unhoist/--pin/--unpin/--template/--untemplate] <content>',
				examples: () => ['Test Some new content', '"Test 1" Some more new content', 'Test --hoist', '"Test 1" --unpin'],
			},
			channel: 'guild',
			ratelimit: 2,
			flags: ['--clear'],
		});
	}

	*args() {
		const embedMsg = yield {
			type: async (msg: Message, str: string) => {
				if (!str) return null;
				const embedMsg = await msg.channel.messages.fetch(str);
				if (!embedMsg) return null;
				if (embedMsg.author.id !== this.client.user!.id) return Flag.fail('!me');
				if (!embedMsg.embeds[0]) return Flag.fail('!embed');
				return embedMsg;
			},
			prompt: {
				start: 'What message is the embed you want to edit?',
				retry: (msg: Message, { failure }: { failure: { value: string } }) => {
					let str = 'What message is the embed you want to edit?';
					if (failure.value === '!me') return `${str}\n\nI can only edit my own message.`;
					if (failure.value === '!embed') return `${str}\n\nThere's no embed on this message.\nUse \`${(this.handler.prefix as PrefixSupplier)(msg)}embed send\` to create one.`;
					return str;
				},
			},
		};

		const option = yield {
			type: Argument.validate(
				[['author'], ['author:icon'], ['author:url'], ['color'], ['field'], ['description'], ['footer'], ['footer:icon'], ['image'], ['thumbnail'], ['timestamp'], ['title'], ['url']],
				(msg, phrase, value) => {
					let athr = true;
					let fter = true;
					if (['author:icon', 'author:url'].includes(value)) athr = Boolean(embedMsg.embeds[0].author.name);
					if (['footer:icon'].includes(value)) fter = Boolean(embedMsg.embeds[0].footer.text);
					return fter && athr && ['author', 'author:icon', 'author:url', 'color', 'field', 'description', 'footer', 'footer:icon', 'image', 'thumbnail', 'timestamp', 'title', 'url'].includes(value);
				}
			),
			prompt: {
				start: 'What part of the embed do you want to edit?',
				retry: 'What part of the embed do you want to edit?',
			},
		};

		const clear = yield {
			match: 'flag',
			flag: ['--clear'],
		};

		const action = clear
			? ''
			: yield {
					type: option === 'color' ? 'color' : 'string',
					match: 'rest',
					prompt: {
						start: 'Type the text to replace',
						retry: 'Type the text to replace',
					},
			  };

		return { embedMsg, option, action };
	}

	public async exec(message: Message, { embedMsg, option, action }: { embedMsg: Message; option: string; action: string | boolean }) {
		const embed = this.client.util.embed(embedMsg.embeds[0]);

		try {
			switch (option) {
				case 'author':
					// @ts-ignore
					embed.setAuthor(action ? action : '', embed.toJSON().author?.icon_url, embed.toJSON().author?.url);
					break;
				case 'author:icon':
					// @ts-ignore
					embed.setAuthor(embed.toJSON().author?.name, action, embed.toJSON().author?.url);
					break;
				case 'author:url':
					// @ts-ignore
					embed.setAuthor(embed.toJSON().author?.name, embed.toJSON().author?.icon_url, action);
					break;
				case 'field':
					const separated = (action as string).split(',');
					if (separated[0] && separated[1]) {
						embed.addField(separated[0], separated[1], separated[2] === 'true' ? true : false);
					}

					if (!action) {
						embed.spliceFields(embed.fields.length - 1, 1);
					}
					break;
				case 'color':
					// @ts-ignore
					embed.setColor(action);
					break;
				case 'description':
					embed.setDescription(action);
					break;
				case 'footer':
					// @ts-ignore
					embed.setFooter(action, embed.toJSON().footer?.icon_url);
					break;
				case 'footer:icon':
					// @ts-ignore
					embed.setFooter(embed.toJSON().footer?.text, action);
					break;
				case 'image':
					// @ts-ignore
					embed.setImage(action);
					break;
				case 'thumbnail':
					// @ts-ignore
					embed.setThumbnail(action);
					break;
				case 'timestamp':
					// @ts-ignore
					embed.setTimestamp(action);
					break;
				case 'title':
					embed.setTitle(action);
					break;
				case 'url':
					// @ts-ignore
					embed.setURL(action);
					break;
			}

			await embedMsg.edit({ embed });
		} catch (error) {
			this.client.logger.error(error);
		}
	}
}
