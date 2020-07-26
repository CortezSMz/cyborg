import { Command } from 'discord-akairo';
import { Message, Permissions, MessageEmbed } from 'discord.js';
import * as emojis from 'node-emoji';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { ReactionRolesInsertInput, ReactionRoles } from '../../util/graphQLTypes';

export default class ReactionRoleFixCommand extends Command {
    constructor() {
        super('reactionrole-fix', {
            description: {
                content: () => 'Fix order for roles and reactions.',
                usage: () => 'fix <ID>'
            },
            channel: 'guild',
            category: 'reactionrole',
            clientPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.EMBED_LINKS],
            userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
            ratelimit: 2,
        });
    }

    public *args() {
        const roleReactionMessage = yield {
            type: 'message',
            prompt: {
                start: (msg: Message) => stripIndents`
                Which message should I use?
                
                You can use an existing message or type \`${(this.handler.prefix as PrefixSupplier)(msg)}reactionrole create\` to setup a new one.`,
                retry: stripIndents`
                Are you sure this is the correct ID? That message doesn't seem to exist.
                
                Steps to get a message ID: \`User Settings\` > \`Appearance\` enable \`Developer Mode\` > then right click the message and \`Copy ID\``
            }
        };

        return { roleReactionMessage };
    }

    public async exec(msg: Message, { roleReactionMessage }: { roleReactionMessage: Message }) {
        const { data } = await graphQLClient.mutate<any, ReactionRolesInsertInput>({
            mutation: GRAPHQL.QUERY.REACTIONROLES,
            variables: {
                guild: roleReactionMessage.guild!.id,
                channel: roleReactionMessage.channel.id,
                message: roleReactionMessage.id,
            },
        });

        let reactionRoles: ReactionRoles[];
        reactionRoles = data.reactionRoles

        if (!reactionRoles.length) return msg.util?.reply(`this does not seem to be a Reaction Role Message.\nUse \`${this.handler.prefix}reactionrole create\` to create a new one.`)
        reactionRoles = reactionRoles[0] as any;

        //        await roleReactionMessage.reactions.removeAll();

        Object.entries((reactionRoles as unknown as ReactionRoles).roles)
            // @ts-ignore
            .sort((a, b) => msg.guild!.roles.cache.get(b[1]).position - msg.guild!.roles.cache.get(a[1]).position)
            .map(async arr => {
                let emj = emojis.hasEmoji(arr[0]) ? arr[0] : this.client.emojis.cache.find(e => e.name == arr[0]);
                await roleReactionMessage.react(emj as any);
            });
        const embed = new MessageEmbed(roleReactionMessage.embeds[0])
            .setDescription(
                Object.entries((reactionRoles as unknown as ReactionRoles).roles)
                    // @ts-ignore
                    .sort((a, b) => msg.guild!.roles.cache.get(b[1]).position - msg.guild!.roles.cache.get(a[1]).position)
                    .map(arr => {
                        let emj = emojis.hasEmoji(arr[0]) ? arr[0] : this.client.emojis.cache.find(e => e.name == arr[0]);
                        return `${emj} :: ${msg.guild!.roles.cache.get(arr[1] as string)}`;
                    })
            );

        if (roleReactionMessage.author.id === this.client.user?.id && roleReactionMessage.embeds.length) {
            roleReactionMessage.edit(embed);
        } else {
            msg.util?.send(stripIndents`
            Alright! Here's the custom content **with reactions in the same order of the roles** if you wish:\`\`\`js
            ${embed.description}\`\`\``)
        }
    }
}
