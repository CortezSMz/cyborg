import { Command } from 'discord-akairo';
import { Role, Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';

export default class ReactionRoleCreateCommand extends Command {
    constructor() {
        super('reactionrole-create', {
            description: {
                content: 'Create a **roles by reactions** message on the channel.',
            },
            channel: 'guild',
            category: 'reaction role',
            clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
        });
    }

    public async exec(message: Message) {
        const embed = new MessageEmbed()
            .setTitle(`React to get a role!`)
            .setDescription(stripIndents`
            It is important that you **do not delete** this message. I will keep updating and maintaining it when necessary.

            Use \`${(this.handler.prefix as PrefixSupplier)(message)}reactionrole add <ID> @Role <Emoji>\` to add new roles for users to react.
            `)

        const msg = await message.channel.send('React on the embed to get a role:', embed)

        this.client.reactionRoleHandler.create({
            channel: message.channel.id,
            guild: message.guild!.id,
            message: msg.id,
        })
    }
}