import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { MESSAGES, COLORS } from '../../util/constants';

export default class HelpCommand extends Command {
	public constructor() {
		super('help', {
			aliases: ['help'],
			description: {
				content: MESSAGES.COMMANDS.UTIL.HELP.DESCRIPTION,
				usage: '[command]',
			},
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'command',
					type: 'commandAlias',
				},
			],
		});
	}

	public async exec(message: Message, { command }: { command: Command }) {
		const prefix = (this.handler.prefix as PrefixSupplier)(message);
		if (!command) {
			const embed = new MessageEmbed()
				.setColor(COLORS.EMBED)
				.addField('ﾅ Commands', MESSAGES.COMMANDS.UTIL.HELP.REPLY(prefix));

			for (const category of this.handler.categories.sort().values()) {
				if (category.id === 'owner' && message.author.id !== this.client.config.owner) continue;
				embed.addField(
					`ﾅ ${category.id.replace(/(\b\w)/gi, (lc) => lc.toUpperCase())}`,
					`${category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => `\`${cmd.aliases[0]}\``)
						.join(' ')}`,
				);
			}

			return message.util?.send(embed);
		}

		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setTitle(`\`${prefix}${command.aliases[0]} ${command.description.usage || ''}\``)
			.addField('ﾅ Description', command.description.content || '\u200b');

		if (command.aliases.length > 1) embed.addField('ﾅ Aliases', `\`${command.aliases.join('` `')}\``, true);
		if (command.description.examples?.length)
			embed.addField(
				'ﾅ Examples',
				`\`${prefix}${command.aliases[0]} ${command.description.examples.join(
					`\`\n\`${prefix}${command.aliases[0]} `,
				)}\``,
				true,
			);

		return message.util?.send(embed);
	}
}
