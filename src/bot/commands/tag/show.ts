import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Util } from 'discord.js';
import { PRODUCTION } from '../../util/Constants';
import { GRAPHQL, graphQLClient } from '../../util/graphQL';
import { Tags, TagsInsertInput } from '../../util/graphQLTypes';
import { interpolateString } from '../../util/template';

export default class TagShowCommand extends CyborgCommand {
	public constructor() {
		super('tag-show', {
			category: 'tag',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.SHOW.DESCRIPTION,
				usage: () => '<tag>',
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'name',
					match: 'content',
					type: 'lowercase',
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.SHOW.PROMPT.START(message.author),
					},
				},
			],
		});
	}

	public async exec(message: Message, { name }: { name: string }) {
		if (!name) return;
		const guild = message.guild!;
		name = Util.cleanContent(name, message);
		const { data } = await graphQLClient.query<any, TagsInsertInput>({
			query: GRAPHQL.QUERY.TAGS_TYPE,
			variables: {
				guild: guild.id,
			},
		});
		let tags: Tags[];
		if (PRODUCTION) tags = data.tags;
		else tags = data.tagsStaging;
		const [tag] = tags.filter(t => t.name === name || t.aliases.includes(name));
		if (!tag) return;
		graphQLClient.mutate<any, TagsInsertInput>({
			mutation: GRAPHQL.MUTATION.UPDATE_TAG_USAGE,
			variables: {
				id: tag.id,
				uses: tag.uses + 1,
			},
		});

		if (tag.templated) {
			const output = interpolateString(tag.content, {
				authorid: message.author.id,
				author: message.author.toString(),
				channelid: message.channel.id,
				channel: message.channel.toString(),
				guildid: message.guild ? message.guild.id : null,
				guild: message.guild ? message.guild.toString() : null,
				count: `${tag.uses + 1}`,
				mention: message.mentions.users.first()?.toString() || message.author.toString(),
			});

			return message.util?.send(output || 'The output was empty.');
		}

		return message.util?.send(tag.content);
	}
}
