import { Command } from 'discord-akairo';
import { Role, Message } from 'discord.js';
import { stripIndents } from 'common-tags';

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
        const role: Role[] = yield {
            id: 'role',
            type: 'role',
            prompt: {
                start: stripIndents`
                What roles would you like to let users get?

                Type them in separate messages following this example:

                @Cyborg 🤖

                Type \`done\` when you finish.
                `,
                retry: stripIndents`how did you fucked that up`,
                infinite: true,
                stopWord: 'done',
                limit: 25
            }
        };
        return { role };
    }

    public async exec(message: Message, { role }: { role: Role[] }) {
        message.channel.send(role.map(r => r.name).join('\n'))
    }
}