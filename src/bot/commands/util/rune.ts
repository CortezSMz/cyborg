import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Permissions } from 'discord.js';
import 'moment-duration-format';

import transcribe from '../../util/runeParser';

export default class RunaCommand extends CyborgCommand {
	public constructor() {
		super('rune', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.RUNE.DESCRIPTION.CONTENT,
				usage: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.RUNE.DESCRIPTION.USAGE,
				examples: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.RUNE.DESCRIPTION.EXAMPLES,
			},
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'text',
					match: 'rest',
					type: (_, phrase) => {
						// @ts-ignore
						if (!isNaN(phrase.split(' ').join('').trim())) return null;
						return phrase;
					},
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.RUNE.PROMPT.START(message.author),
						retry: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.RUNE.PROMPT.RETRY(message.author),
					},
				},
				{
					id: 'spacing',
					match: 'option',
					flag: ['espaçamento:', 'espaço:', 'spacing:', 'space:'],
					default: 'normal',
				},
				{
					id: 'ponctuation',
					match: 'option',
					flag: ['pontuação:', 'ponto:', 'ponctuation:', 'dot:'],
					default: 'single',
				},
			],
		});
	}

	public async exec(message: Message, { text, ponctuation, spacing }: { text: string; ponctuation: string; spacing: string }) {
		message.util?.send(
			transcribe(text, {
				ponctuation: ponctuation.toLowerCase(),
				spacing: spacing.toLowerCase(),
			})
		);
	}
}
