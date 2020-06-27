import { Command } from 'discord-akairo';
import { Message, Permissions, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { LOCALE, COLORS } from '../../util/constants';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { ReactionRolesInsertInput } from '../../util/graphQLTypes';

export default class ReactionRoleCreateCommand extends Command {
    constructor() {
        super('reactionrole-create', {
            description: {
                content: (message: Message) => LOCALE(message.guild!).COMMANDS.REACTIONROLE.CREATE.DESCRIPTION,
            },
            channel: 'guild',
            category: 'reactionrole',
            clientPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.EMBED_LINKS],
            userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
            ratelimit: 2,
            args: [
                {
                    id: 'title',
                    prompt: {
                        start: (message: Message) => LOCALE(message.guild!).COMMANDS.REACTIONROLE.CREATE.PROMPT.START_TITLE(message.author),
                    },
                },
                {
                    id: 'color',
                    prompt: {
                        start: (message: Message) => LOCALE(message.guild!).COMMANDS.REACTIONROLE.CREATE.PROMPT.START_TITLE(message.author),
                    },

                }
            ]
        });
    }

    public async exec(message: Message, { title, color }: { title: string, color: string }) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(color || COLORS.EMBED)
        let msg: Message = await message.channel.send(embed);
        await msg.edit(embed.setDescription(stripIndents`
        ${message.guild!.emojis.cache.find(e => e.name == 'loading')} You can add new roles to this message at any time by typing
        \`${(this.handler.prefix as PrefixSupplier)(message)}reactionrole add ${msg.id}\`
        `))

        await graphQLClient.mutate<any, ReactionRolesInsertInput>({
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