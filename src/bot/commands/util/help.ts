import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { COLORS } from '../../util/constants';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { TagsInsertInput, Tags } from '../../util/graphQLTypes';

export default class HelpCommand extends Command {
	public constructor() {
		super('help', {
			aliases: ['help', 'h', 'ajuda'],
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.DESCRIPTION.CONTENT((this.handler.prefix as PrefixSupplier)(message)),
				usage: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.DESCRIPTION.USAGE,
				examples: () => null,
			},
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'command',
					type: 'commandAlias',
				},
				{
					id: 'filterByPerms',
					match: 'flag',
					flag: ['--perm'],
				},
				{
					id: 'filterByDm',
					match: 'flag',
					flag: ['--dm'],
				},
			],
		});
	}

	public async exec(message: Message, { command, filterByPerms, filterByDm }: { command: Command; filterByPerms: boolean; filterByDm: boolean }) {
		const prefix = (this.handler.prefix as PrefixSupplier)(message);
		if (!command) {
			const embed = new MessageEmbed()
				.setColor(COLORS.EMBED)
				.addField(`ﾅ ${this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.EMBED.FIELD_COMMANDS} `, this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.REPLY(prefix, message));

			for (const category of this.handler.categories.sort().values()) {
				if (category.id === 'owner' && message.author.id !== this.client.config.owner) continue;
				embed.addField(
					`ﾅ ${this.client.LOCALE(message.guild!).COMMANDS.CATEGORIES[category.id.toUpperCase()]}`,
					`${category
						.filter(cmd => cmd.aliases.length > 0 && cmd.aliases[0] !== 'jackblack') // (filterByDm && cmd.channel !== 'guild')
						.map(cmd => {
							// @ts-ignore
							if (filterByPerms && message.guild && !message.member?.permissions.has(cmd.userPermissions)) return `||_\`${cmd.aliases[0]}\`_||`;
							else if (filterByDm && cmd.channel === 'guild') return `||_\`${cmd.aliases[0]}\`_||`;
							else return `**\`${cmd.aliases[0]}\`**`;
						})
						.join(' ')}\u200b`
				);
				/* 				if (category.id === 'tag' && message.guild) {
					const { data } = await graphQLClient.query<any, TagsInsertInput>({
						query: GRAPHQL.QUERY.TAGS,
						variables: {
							guild: message.guild.id,
						},
					});
					let tags: Tags[];
					tags = data.tags;
					let hoistedTags = tags
						.filter(tag => tag.hoisted)
						.map(tag => `\`${tag.name}\``)
						.sort()
						.join(', ');
					if (hoistedTags) {
						embed.addField(`ﾅ ${message.guild.name} ${this.client.LOCALE(message.guild!).COMMANDS.CATEGORIES[category.id.toUpperCase()]}`, hoistedTags);
					}
				} */
			}

			return message.util?.send(embed);
		}

		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setTitle(`\`${prefix}${command.aliases[0]} ${command.description.usage(message) || ''}\``)
			.addField(`ﾅ ${this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.EMBED.FIELD_DESCRIPTION} `, command.description.content(message) || '\u200b');

		if (command.aliases.length > 1) embed.addField(`ﾅ ${this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.EMBED.FIELD_ALIASES} `, `\`${command.aliases.join('` `')}\``, true);
		if (command.description.examples(message)?.length)
			embed.addField(
				`ﾅ ${this.client.LOCALE(message.guild!).COMMANDS.UTIL.HELP.EMBED.FIELD_EXAMPLES} `,
				`\`${prefix}${command.aliases[0]} ${command.description.examples(message).join(`\`\n\`${prefix}${command.aliases[0]} `)}\``,
				true
			);

		return message.util?.send(embed);
	}
}
