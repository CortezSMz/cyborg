import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import * as moment from 'moment';
import 'moment-duration-format';
import { MESSAGES, COLORS } from '../../util/constants';

export default class StatsCommand extends Command {
	public constructor() {
		super('stats', {
			aliases: ['stats'],
			description: {
				content: MESSAGES.COMMANDS.UTIL.STATS.DESCRIPTION,
			},
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const mtl = await this.client.prometheus.fetchQuery('cyborg_messages_total');
		const mpm = await this.client.prometheus.fetchQuery('rate(cyborg_messages_total[1m])*60');
		const ctl = await this.client.prometheus.fetchQuery('cyborg_commands_total');
		const cpm = await this.client.prometheus.fetchQuery('rate(cyborg_commands_total[1m])*60');
		this.client.ws.ping;
		const embed = new MessageEmbed()
			.setColor(COLORS.EMBED)
			.setTitle(`${this.client.user?.username} Statistics`)
			.setThumbnail(this.client.user?.displayAvatarURL() ?? '')
			.setDescription('Profile picture by: [Ilya Kuvshinov](https://www.instagram.com/p/BlYTUg_lGi3/)')
			.addField('ﾅ Uptime', moment.duration(this.client.uptime ?? 0).format('d[d ]h[h ]m[m ]s[s]'), true)
			.addField('ﾅ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
			.addField('ﾅ Ping', `${this.client.ws.ping}ms`, true)
			.addField(
				'ﾅ General Stats',
				stripIndents`
				• Guilds: ${this.client.guilds.cache.size}
				• Users: ${this.client.users.cache.size}
				• Channels: ${this.client.channels.cache.size}
				${
					cpm
						? `• Messages seen: ${mtl.data.result[0].value[1]} \`~${parseInt(
								mpm.data.result[0].value[1],
						  )}/m\`\n• Commands seen: ${ctl.data.result[0].value[1]} \`~${parseInt(cpm.data.result[0].value[1])}/m\``
						: ''
				}
			`,
				true,
			)
			.addField('ﾅ Version', require('E:/cyborg/package.json').version, true)
			.addField(
				'ﾅ Library',
				'[discord.js](https://discord.js.org)[ブakairo](https://github.com/1Computer1/discord-akairo)',
				true,
			)
			.setFooter(`© 2020 ${this.client.users.cache.get(this.client.config.owner ?? '')?.tag}`);

		return message.util?.send(embed);
	}
}
