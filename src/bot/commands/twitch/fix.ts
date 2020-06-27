import { Command } from 'discord-akairo';
import { Message, Permissions, TextChannel } from 'discord.js';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { TwitchStreamsInsertInput, } from '../../util/graphQLTypes';
const fetch = require('node-fetch');

export default class TwitchFixCommand extends Command {
    constructor() {
        super('twitch-fix', {
            description: {
                content: () => 'Fix offline stream message.',
                usage: () => 'fix <vod>'
            },
            channel: 'guild',
            category: 'twitch',
            clientPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.EMBED_LINKS],
            userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
            ratelimit: 2,
            /*             args: [
                            {
                                id: 'channel',
                                match: 'content',
                                type: 'textChannel',
                                default: (message: Message) => message.channel,
                            },
                            {
                                id: 'streamer',
                                match: 'rest',
                                type: 'lowercase'
                            }
                        ] */
        });
    }

    public async exec(message: Message, { channel, streamer }: { channel: TextChannel, streamer: string }) {
        const body = await fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.TWITCH_BEARER}`,
                'Client-ID': `${process.env.TWITCH_CLIENTID}`
            }
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
    }
}