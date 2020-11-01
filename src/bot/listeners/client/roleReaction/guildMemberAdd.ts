import { Listener } from 'discord-akairo';
import { GuildMember, TextChannel } from 'discord.js';

export default class guildMemberAddReactionRole extends Listener {
	public constructor() {
		super('guildMemberAddReactionRole', {
			emitter: 'client',
			event: 'guildMemberAdd',
			category: 'client',
		});
	}

	public async exec(member: GuildMember) {
		if (member.user.bot) return;
		if (member.guild.id === '701892016337977394') {
			try {
				(member.guild.channels.cache.get('717329301967470594') as TextChannel).send(`${member}`).then(msg => msg.delete());
			} catch {}
		}

		if (member.guild.id === '706581070514094100') {
			try {
				(member.guild.channels.cache.get('706626632676278323') as TextChannel).send(`${member}`).then(msg => msg.delete());
			} catch {}
		}
	}
}
