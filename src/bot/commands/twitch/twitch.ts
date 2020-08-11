import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { Flag } from 'discord-akairo';

export default class TwitchCommand extends Command {
    public constructor() {
        super('twitch', {
            aliases: ['twitch'],
            description: {
                content: () => 'Manages twitch notifications.',
                usage: () => null,
                examples: () => [
                    'create',
                    'add',
                    'remove',
                ]
            },
            channel: 'guild',
            category: 'twitch',
            clientPermissions: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.MENTION_EVERYONE],
            userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
            ratelimit: 2
        });
    }

    public *args() {
        const method = yield {
            type: [
                ['twitch-add', 'add'],
                ['twitch-remove', 'remove', 'rmv', 'rm'],
                ['twitch-list', 'list'],
            ],
            otherwise: (msg: Message) => {
                this.client.commandHandler.handleDirectCommand(msg, 'twitch', this.client.commandHandler.modules.get('help')!);
            },
        };
        return Flag.continue(method);
    }
}