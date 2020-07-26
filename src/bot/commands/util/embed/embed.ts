import { Command, Flag } from 'discord-akairo';
import { Message } from 'discord.js';
import { LOCALE } from '../../../util/constants';

export default class EmbedCommand extends Command {
	public constructor() {
		super('embed', {
			aliases: ['embed'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.EMBED.DESCRIPTION.CONTENT,
				usage: () => '<method> <...arguments>',
				examples: () => [
					'show Test',
				],
			},
			category: 'util',
			ratelimit: 2,
		});
	}

	public *args() {
		const method = yield {
			type: [
				['embed-send', 'send'],
				['embed-edit', 'edit'],
			],
			otherwise: (msg: Message) => {
				this.client.commandHandler.handleDirectCommand(msg, 'embed', this.client.commandHandler.modules.get('help')!);
			},
		};

		return Flag.continue(method);
	}
}
