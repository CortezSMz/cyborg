import { Command } from 'discord-akairo';
import { Message, Util } from 'discord.js';
import { LOCALE } from '../../../util/constants';

export default class EmbedEditCommand extends Command {
	public constructor() {
		super('embed-send', {
			category: 'util',
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.EMBED.SEND.DESCRIPTION.CONTENT,
				usage: () => '',
				examples: () => [''],
			},
			channel: 'guild',
			ratelimit: 2,
		});
	}

	public *args() {
		const embed = yield {
			type: 'string',
			match: 'rest',
			prompt: {
				start: (message: Message) => LOCALE(message.guild!).COMMANDS.EMBED.SEND.PROMPT.START,
				retry: (message: Message) => LOCALE(message.guild!).COMMANDS.EMBED.SEND.PROMPT.RETRY,
			},
		};

		return { embed };
	}

	public async exec(message: Message, { embed }: { embed: string; },) {
		const embedToSend = this.client.util.embed(JSON.parse(embed))
		message.util?.send(embedToSend)
	}
}
