import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { TOPICS, EVENTS } from '../../../util/logger';
import { graphQLClient, GRAPHQL } from '../../../util/graphQL';
import { ReactionrolesInsertInput } from '../../../util/graphQLTypes';
import { PRODUCTION } from '../../../util/constants';

export default class messageReactionRemoveReactionRole extends Listener {
    public constructor() {
        super('messageReactionRemoveReactionRole', {
            emitter: 'client',
            event: 'messageReactionRemove',
            category: 'client',
        });
    }

    public async exec(reaction: MessageReaction, user: User) {
        if (user.bot) return;
        if (reaction.partial || user.partial) {
            try {
                await reaction.message.fetch()
                await user.fetch()
            } catch (err) {
                this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
            }
        };

        console.log(`${user.tag} removed ${reaction.emoji.name} from ${reaction.message.channel.type == 'dm' ? 'DM' : `${reaction.message.channel}`}`);

        const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
            mutation: GRAPHQL.QUERY.REACTIONROLES,
            variables: {
                guild: reaction.message.guild?.id,
                channel: reaction.message.channel.id,
                message: reaction.message.id,
            },
        });

        let reactionRoles;
        if (PRODUCTION) reactionRoles = data.reactionroles
        else reactionRoles = data.reactionrolesStaging

        if (!reactionRoles.length) return;
        if (!reactionRoles[0].roles[reaction.emoji.name]) return;

        try {
            const guild = reaction.message.guild;
            const role = guild!.roles.cache.get(reactionRoles[0].roles[reaction.emoji.name]);
            const member = await guild?.members.fetch(user);
            if (!role || !member) return;
            if (!member.roles.cache.has(role.id)) return;
            await member.roles.remove(role);
        } catch (err) {
            this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
        }

    }
}
