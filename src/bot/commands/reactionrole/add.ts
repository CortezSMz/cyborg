import { Command } from 'discord-akairo';
import { Message, Role, Emoji } from 'discord.js';
import { Argument } from 'discord-akairo';
import * as emojis from 'node-emoji';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { ReactionrolesInsertInput, Reactionroles } from '../../util/graphQLTypes';

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;

export default class ReactionRoleAddCommand extends Command {
    constructor() {
        super('reactionrole-add', {
            description: {
                content: 'Add roles for an existing reaction-role message.',
                usage: 'add <ID> @Role <Emoji>'
            },
            channel: 'guild',
            category: 'reaction role',
            clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
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

        const role = yield {
            type: 'role',
            prompt: {
                start: stripIndents`
                Which role would you like to add to this message?

                You can type the role's name, ID or mention it.
                `,
                retry: stripIndents`
                Which role would you like to add to this message?

                You can type the role's name, ID or mention it.
                `,
            }
        };

        const emoji = yield {
            type: Argument.union('emoji', async (message, content) => {
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
                start: 'And which emoji for that role?',
            },
        };

        return { roleReactionMessage, role, emoji };
    }

    public async exec(msg: Message, { roleReactionMessage, role, emoji }: { roleReactionMessage: Message, role: Role, emoji: Emoji | any }) {
        let roles: {} = JSON.parse(`{"${emoji.emoji ? emoji.emoji : emoji.name}": "${role.id}"}`);

        const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
            mutation: GRAPHQL.QUERY.REACTIONROLES,
            variables: {
                guild: roleReactionMessage.guild!.id,
                channel: roleReactionMessage.channel.id,
                message: roleReactionMessage.id,
            },
        });

        let reactionRoles: Reactionroles[];
        reactionRoles = data.reactionroles

        if (!reactionRoles.length) {
            await graphQLClient.mutate<any, ReactionrolesInsertInput>({
                mutation: GRAPHQL.MUTATION.INSERT_REACTION_ROLES,
                variables: {
                    guild: roleReactionMessage.guild!.id,
                    channel: roleReactionMessage.channel.id,
                    message: roleReactionMessage.id,
                    roles,
                },
            });
        } else {
            roles = { ...reactionRoles[0].roles, ...roles };
            await graphQLClient.mutate<any, ReactionrolesInsertInput>({
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