import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import * as moment from 'moment';
import 'moment-duration-format';
import { COLORS } from '../../util/constants';
import { Tags } from '../../util/graphQLTypes';

export default class TagInfoCommand extends Command {
	public constructor() {
		super('tag-info', {
			category: 'tag',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.INFO.DESCRIPTION,
				usage: () => '<tag>',
			},
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'tag',
					match: 'content',
					type: 'tag',
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.INFO.PROMPT.START(message.author),
						retry: (message: Message, { failure }: { failure: { value: string } }) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.INFO.PROMPT.RETRY(message.author, failure.value),
					},
				},
			],
		});
	}

	public async exec(message: Message, { tag }: { tag: Tags }) {
		const user = await this.client.users.fetch(tag.user);
		let lastModifiedBy;
		try {
			lastModifiedBy = await this.client.users.fetch(tag.lastModified ?? '');
		} catch (error) {
			lastModifiedBy = null;
		}
		const guild = this.client.guilds.cache.get(tag.guild);
		const embed = new MessageEmbed().setColor(COLORS.EMBED).addField('ﾅ Name', tag.name);
		if (tag.templated) {
			embed.addField('ﾅ Templated', '❗This tag is templated and resolves mentions and templates.');
		}
		embed
			.addField('ﾅ User', user ? `${user.tag} (ID: ${user.id})` : "Couldn't fetch user.")
			.addField('ﾅ Guild', guild ? `${guild.name}` : "Couldn't fetch guild.")
			.addField(
				'ﾅ Aliases',
				tag.aliases.length
					? tag.aliases
							.map((t: any) => `\`${t}\``)
							.sort()
							.join(', ')
					: 'No aliases.'
			)
			.addField('ﾅ Uses', tag.uses)
			.addField('ﾅ Created at', moment.utc(tag.createdAt).format('YYYY/MM/DD hh:mm:ss'))
			.addField('ﾅ Modified at', moment.utc(tag.updatedAt).format('YYYY/MM/DD hh:mm:ss'));
		if (lastModifiedBy) {
			embed.addField('ﾅ Last modified by', lastModifiedBy ? `${lastModifiedBy.tag} (ID: ${lastModifiedBy.id})` : "Couldn't fetch user.");
		}

		return message.util?.send(embed);
	}
}
