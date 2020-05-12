import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { MESSAGES } from '../../util/constants';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { ReactionrolesInsertInput } from '../../util/graphQLTypes';

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
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(11453937)
        let msg: Message = await message.channel.send(embed);
        await msg.edit(embed.setDescription(stripIndents`
        ${message.guild!.emojis.cache.find(e => e.name == 'loading')} You can add new roles to this message at any time by typing
        \`${(this.handler.prefix as PrefixSupplier)(message)}reactionrole add ${msg.id}\`
        `))

        const { data } = await graphQLClient.mutate<any, ReactionrolesInsertInput>({
            mutation: GRAPHQL.MUTATION.INSERT_REACTION_ROLES,
            variables: {
                guild: message.guild!.id,
                channel: message.channel.id,
                message: message.id,
                roles: {}
            },
        });

        this.client.commandHandler.handleDirectCommand(message, msg.id, this.client.commandHandler.modules.get('reactionrole-add')!)
    }
}