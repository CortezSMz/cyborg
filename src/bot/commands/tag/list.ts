import CyborgCommand from '../../structures/CyborgCommand';
import { GuildMember, Message, MessageEmbed, Permissions } from 'discord.js';
import { PRODUCTION } from '../../util/Constants';
import { GRAPHQL, graphQLClient } from '../../util/graphQL';
import { Tags, TagsInsertInput } from '../../util/graphQLTypes';

export default class TagListCommand extends CyborgCommand {
	public constructor() {
		super('tag-list', {
			category: 'tag',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.LIST.DESCRIPTION,
				usage: () => null,
				examples: () => null,
			},
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
				},
			],
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }) {
		const guild = message.guild!;
		if (member) {
			const { data } = await graphQLClient.query<any, TagsInsertInput>({
				query: GRAPHQL.QUERY.TAGS_MEMBER,
				variables: {
					guild: guild.id,
					user: member.id,
				},
			});
			let tags: Pick<Tags, 'content' | 'name' | 'hoisted' | 'user'>[];
			if (PRODUCTION) tags = data.tags;
			else tags = data.tagsStaging;
			if (!tags.length) {
				if (member.id === message.author.id) return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.TAGS.LIST.NO_TAGS());
				return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.TAGS.LIST.NO_TAGS(member.displayName));
			}
			const embed = new MessageEmbed()
				.setColor(0x30a9ed)
				.setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
				.setDescription(
					tags
						.map(tag => `\`${tag.name}\``)
						.sort()
						.join(', ')
				);

			return message.util?.send(embed);
		}
		const { data } = await graphQLClient.query<any, TagsInsertInput>({
			query: GRAPHQL.QUERY.TAGS,
			variables: {
				guild: guild.id,
			},
		});
		let tags: Tags[];
		if (PRODUCTION) tags = data.tags;
		else tags = data.tagsStaging;
		if (!tags.length) return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.TAGS.LIST.GUILD_NO_TAGS(guild.name));
		const hoistedTags = tags
			.filter(tag => tag.hoisted)
			.map(tag => `\`${tag.name}\``)
			.sort()
			.join(', ');
		const userTags = tags
			.filter(tag => !tag.hoisted)
			.filter(tag => tag.user === message.author.id)
			.map(tag => `\`${tag.name}\``)
			.sort()
			.join(', ');
		const embed = new MessageEmbed().setColor(0x30a9ed).setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL());
		if (hoistedTags) embed.addField('ﾅ Tags', hoistedTags);
		if (userTags) embed.addField(`ﾅ ${message.member?.displayName ?? 'Unknown'}'s tags`, userTags);

		return message.util?.send(embed);
	}
}
