import { Listener } from 'discord-akairo';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { COLORS, SETTINGS } from '../../../util/Constants';

export default class GuildMemberRemoveMemberLogListener extends Listener {
	public constructor() {
		super('guildMemberRemoveMemberLog', {
			emitter: 'client',
			event: 'guildMemberRemove',
			category: 'client',
		});
	}

	public async exec(member: GuildMember) {
		const memberlog = this.client.settings.get(member.guild, SETTINGS.MEMBER_LOG);
		if (memberlog?.CHANNEL) {
			const embed = new MessageEmbed().setColor(COLORS.MEMBER_LEFT).setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL()).setFooter('User left').setTimestamp(new Date());

			return (this.client.channels.cache.get(memberlog.CHANNEL) as TextChannel).send(embed);
		} else return false;
	}
}
