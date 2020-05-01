import { Listener } from 'discord-akairo';
import { MessageEmbed, VoiceState } from 'discord.js';
import { SETTINGS } from '../../../util/constants';

export default class VoiceStateUpdateGuildLogListener extends Listener {
	public constructor() {
		super('voiceStateUpdateGuildLog', {
			emitter: 'client',
			event: 'voiceStateUpdate',
			category: 'client',
		});
	}

	public async exec(oldState: VoiceState, newState: VoiceState) {
		if (oldState?.member?.user.bot || newState.member?.user.bot) {
			return;
		}
		const guildLogs = this.client.settings.get(newState.guild, SETTINGS.GUILD_LOG);
		if (guildLogs) {
			const webhook = this.client.configWebhooks.get(guildLogs);
			if (!webhook) return;
			if (!newState.member) return;
			const embed = new MessageEmbed()
				.setColor(0x33ffff)
				.setAuthor(`${newState.member.user.tag} (${newState.member.id})`, newState.member.user.displayAvatarURL())
				.setTimestamp(new Date())
				.setFooter('Voice State Updated');

			if ((!oldState || (oldState && !oldState.channel)) && newState.channel) {
				embed.addField('ﾅ Joined', newState.channel);
			} else if (oldState?.channel && newState.channel && oldState.channelID !== newState.channelID) {
				embed.addField('ﾅ From', oldState.channel).addField('ﾅ To', newState.channel);
			} else if (oldState?.channel && !newState.channel) {
				embed.addField('ﾅ Left', oldState.channel);
			} else if (!oldState?.streaming && newState.streaming) {
				embed.addField('ﾅ Started a "Go Live" stream', newState.channel);
			} else if (oldState?.streaming && !newState.streaming) {
				embed.addField('ﾅ Finished the "Go Live" stream', newState.channel);
			} else {
				return;
			}

			return webhook.send({
				embeds: [embed],
				username: 'Logs: VOICE STATE UPDATE',
				avatarURL: 'https://i.imgur.com/wmsJNiu.png',
			});
		}
	}
}
