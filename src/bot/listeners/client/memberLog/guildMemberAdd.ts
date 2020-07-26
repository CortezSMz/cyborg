import { Listener } from 'discord-akairo';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { COLORS, SETTINGS } from '../../../util/constants';

export default class GuildMemberAddMemberLogListener extends Listener {
	public constructor() {
		super('guildMemberAddMemberLog', {
			emitter: 'client',
			event: 'guildMemberAdd',
			category: 'client',
		});
	}

	public async exec(member: GuildMember) {
		const memberlog = this.client.settings.get(member.guild, SETTINGS.MEMBER_LOG);
		if (memberlog) {
			const embed = new MessageEmbed()
				.setColor(COLORS.MEMBER_JOIN)
				.setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
				.setFooter('User joined')
				.setTimestamp(new Date());

			return (this.client.channels.cache.get(memberlog.CHANNEL) as TextChannel).send(embed);
		}
	}
}
