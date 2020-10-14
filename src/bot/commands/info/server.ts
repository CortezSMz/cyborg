import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import * as moment from 'moment';
import 'moment-duration-format';
import { COLORS } from '../../util/constants';

interface HumanLevels {
	[key: string]: string;
}

const HUMAN_LEVELS: HumanLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

export default class GuildInfoCommand extends Command {
	public constructor() {
		super('guild', {
			aliases: ['guild', 'server', 'server-info'],
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.INFO.SERVER.DESCRIPTION,
				usage: () => null,
				examples: () => null,
			},
			category: 'info',
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const guild = message.guild!;
		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setDescription(`Info about **${guild.name}** (ID: ${guild.id})`)
			.addField(
				'ﾅ Channels',
				stripIndents`
				• ${guild.channels.cache.filter(ch => ch.type === 'text').size} Text, ${guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice
				• AFK: ${guild.afkChannelID ? `<#${guild.afkChannelID}> after ${guild.afkTimeout / 60}min` : 'None'}
			`
			)
			.addField(
				'ﾅ Member',
				stripIndents`
				• ${guild.memberCount} members
				• Owner: ${guild.owner!.user.tag} (ID: ${guild.ownerID})
			`
			)
			.addField(
				'ﾅ Other',
				stripIndents`
				• Roles: ${guild.roles.cache.size}
				• Region: ${guild.region}
				• Created at: ${moment.utc(guild.createdAt).format('YYYY/MM/DD hh:mm:ss')}
				• Verification Level: ${HUMAN_LEVELS[guild.verificationLevel]}
			`
			)
			.setThumbnail(guild.iconURL() ?? '');

		return message.util?.send(embed);
	}
}
