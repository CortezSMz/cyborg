import CyborgClient from '../client/CyborgClient';
import { Reactionroles, ReactionrolesInsertInput } from '../util/GraphQLTypes'
import { GRAPHQL, graphQLClient } from '../util/graphQL';
import { PRODUCTION } from '../util/constants';
import { TextChannel, MessageEmbed } from 'discord.js';

export default class ReactionRoleHandler {
    public constructor(private readonly client: CyborgClient) { }

    public async create({ channel, guild, message }: Omit<Reactionroles, 'id' | 'roles'>) {
        const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
            mutation: GRAPHQL.MUTATION.INSERT_REACTION_ROLES,
            variables: {
                channel,
                guild,
                message,
                roles: {}
            },
        });
        console.log(data.insertReactionroles.returning[0])

        const chan = this.client.channels.cache.get(data.insertReactionroles.returning[0].channel) as TextChannel;
        const msg = chan.messages.cache.get(data.insertReactionroles.returning[0].message);

        const embed = new MessageEmbed()
            .setDescription(msg!.embeds[0].description!.replace('<ID>', data.insertReactionroles.returning[0].id))
            .setFooter(`Reaction role ID: ${data.insertReactionroles.returning[0].id}`)
        await msg!.edit({ embed })


        if (PRODUCTION) return data.insertReactionroles.returning[0] as Reactionroles;
        return data.insertReactionrolesStaging.returning[0] as Reactionroles;

    }

    public addRole() {

    }

    public removeRole() {

    }
}