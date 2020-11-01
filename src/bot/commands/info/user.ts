import { stripIndents } from 'common-tags';
import CyborgCommand from '../../structures/CyborgCommand';
import { GuildMember, Message, MessageEmbed, Permissions } from 'discord.js';
import * as moment from 'moment';
import 'moment-duration-format';
import { COLORS } from '../../util/Constants';

export default class UserInfoCommand extends CyborgCommand {
	public constructor() {
		super('user', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.INFO.USER.DESCRIPTION,
				usage: () => '[member]',
				examples: () => ['Cosmzs', '@Cosmzs', '200502727170588673'],
			},
			category: 'info',
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					match: 'content',
					type: 'member',
					default: (message: Message) => message.member,
				},
			],
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }) {
		const { user } = member;
		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setDescription(`Info about **${user.tag}** (ID: ${member.id})`)
			.addField(
				'ﾅ Member Details',
				stripIndents`
				${member.nickname == undefined /* eslint-disable-line */ ? '• No nickname' : ` • Nickname: ${member.nickname}`}
				• Roles: ${member.roles.cache.map(roles => `\`${roles.name}\``).join(' ')}
				• Joined at: ${moment.utc(member.joinedAt ?? 0).format('YYYY/MM/DD hh:mm:ss')}
			`
			)
			.addField(
				'ﾅ User Details',
				stripIndents`
				• ID: ${member.id}
				• Username: ${member.user.tag}
				• Created at: ${moment.utc(user.createdAt).format('YYYY/MM/DD hh:mm:ss')}${user.bot ? '\n• Is a bot account' : ''}
				• Status: ${user.presence.status.toUpperCase()}
				• Activity: ${user.presence.activities?.[0]?.name ?? 'None'}
			`
			)
			.setThumbnail(user.displayAvatarURL());

		return message.util?.send(embed);
	}
}
