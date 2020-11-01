import { Message } from 'discord.js';
import CyborgCommand from '../../structures/CyborgCommand';

export default class TestCommand extends CyborgCommand {
	public constructor() {
		super('test', {
			category: 'owner',
			ownerOnly: true,
			args: [
				{
					id: 'topic',
					type: 'string',
					flag: ['-t'],
					match: 'option',
					prompt: {
						start: (msg: Message) => `${msg.author}, please provide a topic...`,
						retry: (msg: Message) => `${msg.author}, please provide a valid topic...`,
					},
				},
				{
					id: 'description',
					type: 'string',
					match: 'option',
					flag: ['-d'],
					prompt: {
						start: (msg: Message) => `${msg.author}, please provide a description...`,
						retry: (msg: Message) => `${msg.author}, please provide a valid description...`,
					},
				},
			],
		});
	}

	public exec(msg: Message, { topic, description }: { topic: string; description: string }) {
		console.log('topic', topic);
		console.log('description', description);
	}
}
