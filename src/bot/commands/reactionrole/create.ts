import { Command } from 'discord-akairo';
import { Role, Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { MESSAGES } from '../../util/constants';

export default class ReactionRoleCreateCommand extends Command {
    constructor() {
        super('reactionrole-create', {
            description: {
                content: MESSAGES.COMMANDS.REACTIONROLE.CREATE.DESCRIPTION,
            },
            channel: 'guild',
            category: 'reaction role',
            clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
            args: [
                {
                    id: 'title',
                    match: 'content',
                    prompt: {
                        start: (message: Message) => MESSAGES.COMMANDS.REACTIONROLE.CREATE.PROMPT.START_TITLE(message.author),
                    },
                    default: 'REACTION ROLES'
                }
            ]
        });
    }

    public async exec(message: Message, { title }: { title: string }) {
        return;
        await message.delete({ timeout: 500, reason: 'Tidy reaction role channel.' });

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription('\u200b')
        const msg = await message.channel.send(embed)

        this.client.reactionRoleHandler.create({
            guild: msg.guild!.id,
            channel: msg.channel.id,
            message: msg.id
        },
            message
        );
    }
}