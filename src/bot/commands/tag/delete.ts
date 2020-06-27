import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { LOCALE, SETTINGS } from '../../util/constants';
import { GRAPHQL, graphQLClient } from '../../util/graphQL';
import { Tags, TagsInsertInput } from '../../util/graphQLTypes';

export default class TagDeleteCommand extends Command {
	public constructor() {
		super('tag-delete', {
			category: 'tag',
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.TAGS.DELETE.DESCRIPTION,
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
						start: (message: Message) => LOCALE(message.guild!).COMMANDS.TAGS.DELETE.PROMPT.START(message.author),
						retry: (message: Message, { failure }: { failure: { value: string } }) => LOCALE(message.guild!).COMMANDS.TAGS.DELETE.PROMPT.RETRY(message.author, failure.value),
					},
				},
			],
		});
	}

	public async exec(message: Message, { tag }: { tag: Tags }) {
		if (tag.user !== message.author.id && !message.member?.permissions.has(['MANAGE_MESSAGES'])) {
			return message.util?.reply(LOCALE(message.guild!).COMMANDS.TAGS.DELETE.OWN_TAG);
		}
		await graphQLClient.mutate<any, TagsInsertInput>({
			mutation: GRAPHQL.MUTATION.DELETE_TAG,
			variables: {
				id: tag.id,
			},
		});

		return message.util?.reply(LOCALE(message.guild!).COMMANDS.TAGS.DELETE.REPLY(tag.name.substring(0, 1900)));
	}
}
