import CyborgCommand from '../../structures/CyborgCommand';
import { Message } from 'discord.js';
import { Tags } from '../../util/graphQLTypes';

export default class TagSourceCommand extends CyborgCommand {
	public constructor() {
		super('tag-source', {
			category: 'tag',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.SOURCE.DESCRIPTION,
				usage: () => '[--file/-f] <tag>',
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'file',
					match: 'flag',
					flag: ['--file', '-f'],
				},
				{
					id: 'tag',
					match: 'rest',
					type: 'tag',
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.SOURCE.PROMPT.START(message.author),
						retry: (message: Message, { failure }: { failure: { value: string } }) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.SOURCE.PROMPT.RETRY(message.author, failure.value),
					},
				},
			],
		});
	}

	public async exec(message: Message, { tag, file }: { tag: Tags; file: boolean }) {
		return message.util?.send(tag.content, {
			code: 'md',
			files: file
				? [
						{
							attachment: Buffer.from(tag.content.replace(/\n/g, '\r\n'), 'utf8'),
							name: `${tag.name}_source.txt`,
						},
				  ]
				: undefined,
		});
	}
}
