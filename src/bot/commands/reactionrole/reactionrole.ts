import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Flag } from 'discord-akairo';

export default class ReactionRoleCommand extends Command {
    public constructor() {
        super('reactionrole', {
            aliases: ['reactionrole', 'rr'],
            description: {
                content: 'Manages roles by reactions.',
                usage: '<method> <...arguments>',
                examples: [
                    'create',
                    'add',
                    'remove',
                ]
            },
            channel: 'guild',
            category: 'reaction role',
            clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2
        });
    }

    public *args() {
        const method = yield {
            type: [
                ['reactionrole-create', 'create'],
                ['reactionrole-add', 'add'],
                ['reactionrole-fix', 'fix'],
                ['reactionrole-remove', 'remove', 'rmv', 'rm'],
            ],
            otherwise: (msg: Message) => {
                this.client.commandHandler.handleDirectCommand(msg, 'reactionrole', this.client.commandHandler.modules.get('help')!);
            },
        };

        return Flag.continue(method);
    }
}