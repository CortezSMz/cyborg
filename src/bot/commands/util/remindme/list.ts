import * as moment from 'moment';
import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { COLORS, SETTINGS } from '../../../util/constants';
import { graphQLClient, GRAPHQL } from '../../../util/graphQL';
import { RemindmesInsertInput, Remindmes } from '../../../util/graphQLTypes';
import { MessageEmbed } from 'discord.js';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-list', {
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
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

		if (remindmes.length <= 0) return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.LIST.NOT_FOUND);

		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setAuthor(`${message.author.tag} ${this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.LIST.TITLE} `, message.author.displayAvatarURL())
			.setFooter(
				remindmes.length < 10
					? this.client
							.LOCALE(message.guild!)
							.COMMANDS.UTIL.REMINDME.LIST.FOOTER_1.replace('$(qtd)', `${remindmes.length}`)
							.replace('$(s)', remindmes.length == 1 ? '' : 's')
					: this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.LIST.FOOTER_2.replace('$(qtd)', `${remindmes.length}`)
			);

		for (let i = 0; i < (remindmes.length < 10 ? remindmes.length : 10); i++) {
			let timeStr = moment.duration((new Date(remindmes[i].duration) as any) - (Date.now() as any)).format('y[ year, ]M[ month, ]w[ week, ]d[ day, ]h[ hour, ]m[ minute and ]s[ second ]');
			timeStr = timeStr.replace(/((and|,)(\s[0]\s\w+))|(,\s)(\w+\s\w+)( and 0 seconds)/gi, '$4$5$6');
			if (timeStr.endsWith(' and 0 seconds')) timeStr = timeStr.replace(/(,)(\s\d+\s\w+)( and 0 seconds+$)/gi, ' and$2');
			embed.addField(`\`${remindmes[i].id}:\` in ${timeStr}:`, remindmes[i].text + '\u200b');
		}

		return message.util?.send(embed);
	}
}
