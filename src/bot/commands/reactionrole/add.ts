import { Command } from 'discord-akairo';
import { Role, Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { Argument } from 'discord-akairo';
import * as emojis from 'node-emoji';

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
                start: 'what message?',
                retry: 'couldnt find that one cuz u dumb, try again'
            }
        };
        const roleReaction = yield {
            type: Argument.product('role', (_, phrase) => {
                let possibleEmojis = phrase.split(' ');
                for (const emj of possibleEmojis) {
                    if (emojis.hasEmoji(emj)) {
                        return emojis.find(emj);
                    }
                }
                return null;
            }),
            prompt: {
                start: stripIndents`
                What roles would you like to let users get in this message?

                Type the combination in separate messages following this example:

                @Role 🤖

                Type \`done\` when you finish.
                `,
                retry: stripIndents`
                Type the combination in separate messages following this example:

                @Role 🤖

                Type \`done\` when you finish.
                `,
                infinite: true,
                stopWord: 'done',
                limit: 25
            }
        };
        return { roleReactionMessage, roleReaction };
    }

    public async exec(message: Message, { roleReactionMessage, roleReaction }: { roleReactionMessage: Message, roleReaction: any[] }) {
        const embed = new MessageEmbed(roleReactionMessage.embeds[0])
            .setDescription(roleReaction.map(rr => `${rr[1].emoji} ᛬᛬ ${rr[0]}`).join('\n'))

        roleReactionMessage.edit(embed).then(async msg => {
            for (const rr of roleReaction) {
                await msg.react(rr[1].emoji);
            };
        });
    }
}