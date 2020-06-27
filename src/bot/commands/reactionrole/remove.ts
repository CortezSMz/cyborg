import { Command } from 'discord-akairo';
import { Message, Permissions, Emoji } from 'discord.js';
import { Argument } from 'discord-akairo';
import * as emojis from 'node-emoji';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { ReactionRolesInsertInput, ReactionRoles } from '../../util/graphQLTypes';

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;

export default class ReactionRoleRemoveCommand extends Command {
    constructor() {
        super('reactionrole-remove', {
            description: {
                content: () => 'Removes roles for an existing reaction-role message.',
                usage: () => 'rmv <ID> <Emoji>'
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

        const emoji = yield {
            type: Argument.union('emoji', async (_, content) => {
                let possibleEmojis = content.split(' ');
                for (let emj of possibleEmojis) {
                    if (emojis.hasEmoji(emj)) {
                        return emojis.find(emj);
                    } else {
                        if (EMOJI_REGEX.test(emj)) [, emj] = EMOJI_REGEX.exec(emj)!;
                        if (!isNaN((emj as unknown) as number)) return this.client.emojis.cache.get(emj);
                        return this.client.emojis.cache.find((e) => e.name === emj)
                    }
                }
            }),
            prompt: {
                start: 'Which emoji would you like to remove?',
            },
        };

        return { roleReactionMessage, emoji };
    }

    public async exec(msg: Message, { roleReactionMessage, emoji }: { roleReactionMessage: Message, emoji: Emoji | any }) {
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

        if (!reactionRoles.length) {
            return msg.util?.reply(`this does not seem to be a Reaction Role Message.\nUse \`${this.handler.prefix}reactionrole create\` to create a new one.`)
        } else {
            let roles = reactionRoles[0].roles;
            delete roles[emoji.emoji ? emoji.emoji : emoji.name];

            await graphQLClient.mutate<any, ReactionRolesInsertInput>({
                mutation: GRAPHQL.MUTATION.UPDATE_REACTION_ROLES,
                variables: {
                    id: reactionRoles[0].id,
                    roles,
                },
            });
        }
        this.client.commandHandler.handleDirectCommand(msg, roleReactionMessage.id, this.client.commandHandler.modules.get('reactionrole-fix')!)
    }
}