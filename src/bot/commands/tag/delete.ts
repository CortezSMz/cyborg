import CyborgCommand from '../../structures/CyborgCommand';
import { Message } from 'discord.js';
import { GRAPHQL, graphQLClient } from '../../util/graphQL';
import { Tags, TagsInsertInput } from '../../util/graphQLTypes';

export default class TagDeleteCommand extends CyborgCommand {
	public constructor() {
		super('tag-delete', {
			category: 'tag',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.DELETE.DESCRIPTION,
				usage: () => '<tag>',
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'tag',
					match: 'content',
					type: 'tag',
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.DELETE.PROMPT.START(message.author),
						retry: (message: Message, { failure }: { failure: { value: string } }) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.DELETE.PROMPT.RETRY(message.author, failure.value),
					},
				},
			],
		});
	}

	public async exec(message: Message, { tag }: { tag: Tags }) {
		if (tag.user !== message.author.id && !message.member?.permissions.has(['MANAGE_MESSAGES'])) {
			return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.TAGS.DELETE.OWN_TAG);
		}
		await graphQLClient.mutate<any, TagsInsertInput>({
			mutation: GRAPHQL.MUTATION.DELETE_TAG,
			variables: {
				id: tag.id,
			},
		});

		return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.TAGS.DELETE.REPLY(tag.name.substring(0, 1900)));
	}
}
