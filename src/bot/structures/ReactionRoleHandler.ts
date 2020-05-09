import CyborgClient from '../client/CyborgClient';
import { Reactionroles, ReactionrolesInsertInput } from '../util/graphQLTypes'
import { GRAPHQL, graphQLClient } from '../util/graphQL';
import { PRODUCTION } from '../util/constants';
import { TextChannel, MessageEmbed, Message } from 'discord.js';
import { threadId } from 'worker_threads';

export default class ReactionRoleHandler {
    public constructor(private readonly client: CyborgClient) { }

    public async create(reactionRole: Omit<Reactionroles, 'id' | 'roles'>, message: Message) {
        const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
            mutation: GRAPHQL.MUTATION.INSERT_REACTION_ROLES,
            variables: {
                guild: reactionRole.guild,
                channel: reactionRole.channel,
                message: reactionRole.message,
                roles: {}
            },
        });
        if (PRODUCTION) reactionRole = data.insertReactionroles.returning[0];
        else reactionRole = data.insetReactionrolesStaging.returning[0];

        const chan = this.client.channels.cache.get(reactionRole.channel) as TextChannel;
        const msg = await chan.messages.fetch(reactionRole.message);

        const embed = new MessageEmbed(msg.embeds[0])

        await msg.edit({ embed })

        this.client.commandHandler.handleDirectCommand(message, msg.id, this.client.commandHandler.modules.get('reactionrole-add')!)
    }

    public includeRole() {

    }

    public removeRole() {

    }
}