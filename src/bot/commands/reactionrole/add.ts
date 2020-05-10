import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Role, Emoji, GuildEmoji, ReactionEmoji } from 'discord.js';
import { Argument } from 'discord-akairo';
import * as emojis from 'node-emoji';
import { TOPICS, EVENTS } from '../../util/logger';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;
// ᛬᛬

export default class ReactionRoleCreateCommand extends Command {
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
                
                You can use an existing message or use \`${(this.handler.prefix as PrefixSupplier)(msg)}reactionrole create\` to setup a new one.`,
                retry: 'couldnt find that one cuz u dumb, try again'
            }
        };

        const role = yield {
            type: 'role',
            prompt: {
                start: (msg: Message) => stripIndents`
                Which role would you like to add?

                You can add new roles any time by doing \`${(this.handler.prefix as PrefixSupplier)(msg)}reactionrole add\`
                `,
                retry: (msg: Message) => stripIndents`
                Which role would you like to add?

                You can type the role's name, ID or tag it.
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
                        const guild = message.guild!;
                        if (!isNaN((emj as unknown) as number)) return guild.emojis.cache.get(emj);
                        return guild.emojis.cache.find((e) => e.name === emj)
                    }
                }
            }),
            prompt: {
                start: 'Which emoji for that role?',
                retry: 'Which emoji for that role?',
            },
        };

        return { roleReactionMessage, role, emoji };
    }

    public async exec(msg: Message, { roleReactionMessage, role, emoji }: { roleReactionMessage: Message, role: Role, emoji: GuildEmoji | ReactionEmoji | any }) {
        console.log(roleReactionMessage.id)
        console.log(role.name)
        console.log(emoji)

        try {
            const embed = new MessageEmbed(roleReactionMessage.embeds[0])
                .setDescription(roleReactionMessage.embeds[0].description + '\n' + `${emoji instanceof Emoji ? emoji : emoji.emoji} ᛬᛬ ${role}`)

            if (roleReactionMessage.author.id === this.client.user?.id) {
                await roleReactionMessage.edit(embed);
            }

            await roleReactionMessage.react(emoji.name ? emoji.name : emoji.emoji);

            /* this.client.reactionRoleHandler.includeRole({
                message: roleReactionMessage.id,
                roles: []
            }) */
        } catch (err) {
            this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
        }
    }
}