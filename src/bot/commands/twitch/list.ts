import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Permissions, MessageEmbed } from 'discord.js';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { TwitchStreamsInsertInput, TwitchStreams } from '../../util/graphQLTypes';
import { COLORS } from '../../util/Constants';
import { stripIndents } from 'common-tags';

export default class TwitchAddCommand extends CyborgCommand {
	constructor() {
		super('twitch-list', {
			description: {
				content: () => 'Show all streamers who will notify on this server.',
				usage: () => 'list',
			},
			channel: 'guild',
			category: 'twitch',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const twitchEmote = this.client.emojis.cache.get('707810994973442128')!;
		const { data } = await graphQLClient.query<any, TwitchStreamsInsertInput>({
			query: GRAPHQL.QUERY.TWITCH_STREAMS_BY_GUILD,
			variables: {
				guild: message.guild!.id,
			},
		});
		const streams: TwitchStreams[] = data.twitchStreams;

		const embed = new MessageEmbed().setColor(COLORS.EMBED).setDescription('Esses são os streamers configurados neste servidor:');
		for (const stream of streams) {
			embed.addField(
				stream.online ? '🔴 Ao Vivo' : '⚫ Offline',
				stripIndents`
                ${twitchEmote} [${stream.streamerName.replace(/([^a-zA-Z0-9])/g, '\\$1')}](https://twitch.tv/${stream.streamerName})
                Chat: ${message.guild?.channels.cache.get(stream.channel)}
                `,
				true
			);
		}

		message.util?.send(embed);
	}
}
