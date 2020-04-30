import * as moment from 'moment';
import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { COLORS } from '../../util/constants';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { RemindmesInsertInput, Remindmes } from '../../util/graphQLTypes';
import { MessageEmbed } from 'discord.js';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-list', {
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			channel: 'guild',
			args: [],
		});
	}

	public async exec(message: Message) {
		const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
			query: GRAPHQL.QUERY.REMINDMES_AUTHOR,
			variables: {
				author: message.author.id,
			},
		});

		let remindmes: Remindmes[];
		remindmes = data.remindmes;

		if (remindmes.length <= 0) return message.util?.send("You don't have any running reminders.");

		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setTitle(`${message.author.tag} reminders`)
			.setFooter(
				remindmes.length < 10
					? `Total of ${remindmes.length} reminder${remindmes.length == 1 ? '' : 's'}`
					: `Showing latest 10 of ${remindmes.length} reminders`
			);

		for (let i = 0; i < (remindmes.length < 10 ? remindmes.length : 10); i++) {
			let timeStr = moment
				.duration((new Date(remindmes[i].duration) as any) - (Date.now() as any))
				.format('y[ year, ]M[ month, ]w[ week, ]d[ day, ]h[ hour, ]m[ minute and ]s[ second ]');
			timeStr = timeStr.replace(/((and|,)(\s[0]\s\w+))|(,\s)(\w+\s\w+)( and 0 seconds)/gi, '$4$5$6');
			if (timeStr.endsWith(' and 0 seconds')) timeStr = timeStr.replace(/(,)(\s\d+\s\w+)( and 0 seconds+$)/gi, ' and$2');
			embed.addField(`\`${remindmes[i].id}:\` in ${timeStr}:`, remindmes[i].text + '\u200b');
		}

		return message.util?.send(embed);
	}
}
