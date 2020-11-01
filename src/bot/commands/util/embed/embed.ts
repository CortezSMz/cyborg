import CyborgCommand from '../../../structures/CyborgCommand';
import { Flag } from 'discord-akairo';
import { Message } from 'discord.js';

export default class EmbedCommand extends CyborgCommand {
	public constructor() {
		super('embed', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.EMBED.DESCRIPTION.CONTENT,
				usage: () => '<method> <...arguments>',
				examples: () => ['show Test'],
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
