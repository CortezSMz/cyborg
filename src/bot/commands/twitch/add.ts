import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Permissions, TextChannel } from 'discord.js';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { TwitchStreamsInsertInput, TwitchStreams } from '../../util/graphQLTypes';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
const fetch = require('node-fetch');

export default class TwitchAddCommand extends CyborgCommand {
	constructor() {
		super('twitch-add', {
			description: {
				content: () => 'Add a new stream for the bot to check for.',
				usage: () => 'add <Channel> <Streamer>',
			},
			channel: 'guild',
			category: 'twitch',
			clientPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.EMBED_LINKS],
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
			args: [
				{
					id: 'channel',
					match: 'content',
					type: 'textChannel',
					default: (message: Message) => message.channel,
				},
				{
					id: 'streamer',
					match: 'rest',
					type: 'lowercase',
				},
			],
		});
	}

	public async exec(message: Message, { channel, streamer }: { channel: TextChannel; streamer: string }) {
		const { data } = await graphQLClient.query<any, TwitchStreamsInsertInput>({
			query: GRAPHQL.QUERY.TWITCH_STREAMS_BY_GUILD,
			variables: {
				guild: message.guild!.id,
			},
		});
		const streams: TwitchStreams[] = data.twitchStreams;

		if (streams.find(stream => stream.streamerName === streamer))
			return message.util?.send(stripIndents`Já estou notificando esse streamer.
        Use \`${(this.handler.prefix as PrefixSupplier)(message)}twitch list\` para ver quais streamers já estão configurados.`);

		if (streams.length >= 5)
			return message.util?.send(stripIndents`Você só pode configurar 5 streamers.
        Use \`${(this.handler.prefix as PrefixSupplier)(message)}twitch list\` para ver quais streamers já estão configurados.`);

		const body = await fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.TWITCH_BEARER}`,
				'Client-ID': `${process.env.TWITCH_CLIENTID}`,
			},
		});
		const twitchStream = await body.json();

		await graphQLClient.mutate<any, TwitchStreamsInsertInput>({
			mutation: GRAPHQL.MUTATION.INSERT_NEW_TWITCH_STREAMS,
			variables: {
				guild: message.guild!.id,
				channel: channel.id,
				streamer: twitchStream.data[0].id,
				streamerName: twitchStream.data[0].display_name,
			},
		});

		message.util?.reply(`prontinho! Quando ${twitchStream.data[0].display_name.replace(/([^a-zA-Z0-9])/g, '\\$1')} ficar online eu irei notificar nesse canal.`);
	}
}
