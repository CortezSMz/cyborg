import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Permissions, TextChannel } from 'discord.js';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { TwitchStreamsInsertInput } from '../../util/graphQLTypes';
const fetch = require('node-fetch');

export default class TwitchAddCommand extends CyborgCommand {
	constructor() {
		super('twitch-remove', {
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
					id: 'streamer',
					match: 'rest',
					type: 'lowercase',
				},
			],
		});
	}

	public async exec(message: Message, { streamer }: { channel: TextChannel; streamer: string }) {
		const body = await fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.TWITCH_BEARER}`,
				'Client-ID': `${process.env.TWITCH_CLIENTID}`,
			},
		});
		const twitchStream = await body.json();

		await graphQLClient.mutate<any, TwitchStreamsInsertInput>({
			mutation: GRAPHQL.MUTATION.TWITCH_STREAMS_BY_STREAMER_GUILD,
			variables: {
				guild: message.guild!.id,
				streamer: twitchStream.data[0].id,
			},
		});

		message.util?.reply(`ok! Não vou mais notificar ${twitchStream.data[0].display_name.replace(/([^a-zA-Z0-9])/g, '\\$1')}.`);
	}
}
