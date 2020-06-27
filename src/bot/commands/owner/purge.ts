import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';

export default class PurgeCommand extends Command {
    public constructor() {
        super('purge', {
            aliases: ['purge', 'prune'],
            description: {
                content: () => 'Purge messages from the channel.',
                usage: () => '<number>',
                examples: () => null,
            },
            category: 'owner',
            ownerOnly: true,
            channel: 'guild',
            args: [
                {
                    id: 'amount',
                    type: (_, qtd) => {
                        if (!qtd || isNaN(qtd as unknown as number)) return null;
                        const num = parseInt(qtd);
                        if (num < 1 || num > 100) return null;
                        return num;
                    },
                    default: 100
                },
            ],
        });
    }

    public async exec(message: Message, { amount }: { amount: number }) {
        await message.delete();
        (message.channel as TextChannel).bulkDelete(amount, true).then(msgs => {
            return message.util?.send(`Deleted ${msgs.size} messages.`).then(msg => msg.delete({ timeout: 2500 }))
        });
    }
}
