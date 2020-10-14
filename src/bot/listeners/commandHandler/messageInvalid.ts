import { Listener } from 'discord-akairo';
import { Message, MessageEmbed, Util } from 'discord.js';
import { COLORS } from '../../util/constants';
import { TagsInsertInput, Tags } from '../../util/graphQLTypes';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';

export default class MessageInvalidListener extends Listener {
	public constructor() {
		super('messageInvalid', {
			emitter: 'commandHandler',
			event: 'messageInvalid',
			category: 'commandHandler',
		});
	}

	public async exec(message: Message) {
		if (message.guild && message.util?.parsed?.prefix && message.util?.parsed?.alias && message.util?.parsed?.afterPrefix) {
			const aliasArr = message.util?.parsed?.alias.split(',');
			aliasArr.forEach(s => Util.cleanContent(s.trim().toLowerCase(), message));
			const { data } = await graphQLClient.query<any, TagsInsertInput>({
				query: GRAPHQL.QUERY.TAGS_TYPE,
				variables: {
					guild: message.guild.id,
				},
			});
			let tags: Tags[] = data.tags;
			const [tag] = tags.filter(t => aliasArr.some(p => p === t.name || t.aliases.includes(p)));

			const command = this.client.commandHandler.modules.get('tag-show')!;
			return this.client.commandHandler.runCommand(message, command, await command.parse(message, tag ? message.util.parsed.alias : message.util?.parsed?.afterPrefix));
		}
	}
}
