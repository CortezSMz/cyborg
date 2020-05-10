import CyborgClient from '../client/CyborgClient';
import { Reactionroles, ReactionrolesInsertInput } from '../util/graphQLTypes'
import { GRAPHQL, graphQLClient } from '../util/graphQL';
import { PRODUCTION } from '../util/constants';
import { TextChannel, MessageEmbed, Message } from 'discord.js';

export default class ReactionRoleHandler {
    public constructor(private readonly client: CyborgClient) { }

    public async create(reactionRole: Omit<Reactionroles, 'id' | 'roles'>, message: Message) {
        const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
            mutation: GRAPHQL.MUTATION.CREATE_REACTION_ROLES,
            variables: {
                guild: '706581070514094100',
                channel: '706626632676278323',
                message: '708849478777569281',
                roles: {
                    "🎨": "708845916161048646",
                    "🎲": "708793233429495819",
                    "📝": "708788914453741652",
                    "📹": "708740306094522388",
                    "✏️": "708845805624361073",
                    "🎞️": "708740185856409661",
                    "🖋️": "708845798288392234",
                    "🖌️": "708845808530882603"
                }
            },
        });
        if (PRODUCTION) reactionRole = data.insertReactionroles.returning[0];
        else reactionRole = data.insertReactionrolesStaging.returning[0];
        return;
        const chan = this.client.channels.cache.get(reactionRole.channel) as TextChannel;
        const msg = await chan.messages.fetch(reactionRole.message);

        const embed = new MessageEmbed(msg.embeds[0])

        await msg.edit({ embed })

        this.client.commandHandler.handleDirectCommand(message, msg.id, this.client.commandHandler.modules.get('reactionrole-add')!)
    };

    public async includeRole(reactionRole: Omit<Reactionroles, 'id' | 'guild' | 'channel'>) {
        console.log(reactionRole);
        /*         const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
                    mutation: GRAPHQL.MUTATION.CREATE_REACTION_ROLES,
                    variables: {
                        message: reactionRole.message,
                        roles: {}
                    },
                });
                if (PRODUCTION) reactionRole = data.insertReactionroles.returning[0];
                else reactionRole = data.insetReactionrolesStaging.returning[0]; */
    };

    public removeRole() {

    };
}