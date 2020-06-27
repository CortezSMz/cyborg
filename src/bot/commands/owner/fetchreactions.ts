import { Command, Argument, Inhibitor, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { LOCALE } from '../../util/constants';

export default class FetchReactionsCommand extends Command {
	public constructor() {
		super('fetchreactions', {
			description: {
				content: () => 'Fetch reactions and give roles.',
				usage: () => '<message>',
				examples: () => []
			},
			category: 'owner',
			args: [
				{
					id: 'message',
					type: 'message',
					default: (message: Message) => message
				},
			],
		});
	}

	public async exec(msg: Message, { message }: { message: Message }) {
		const reactions = message.reactions.cache;
		await msg.guild?.members.fetch();

		for (const reaction of reactions) {
			await reaction[1].users.fetch()
			for (const user of reaction[1].users.cache) {
				if (!msg.guild?.members.cache.get(user[0])) continue;
				this.client.emit('messageReactionAdd', reaction[1], user[1])
			}
		}
	}
}
