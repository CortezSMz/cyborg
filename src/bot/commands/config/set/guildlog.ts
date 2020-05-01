import { Command } from 'discord-akairo';
import { Message, Permissions, TextChannel } from 'discord.js';
import { MESSAGES, SETTINGS } from '../../../util/constants';
import { TOPICS } from '../../../util/logger';

export default class SetConfigGuildLogCommand extends Command {
	public constructor() {
		super('config-set-guildlog', {
			description: {
				content: MESSAGES.COMMANDS.CONFIG.SET.GUILD_LOG.DESCRIPTION,
				usage: '<channel>',
			},
			category: 'config',
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.MANAGE_WEBHOOKS],
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
			args: [
				{
					id: 'channel',
					match: 'content',
					type: 'textChannel',
					prompt: {
						start: (message: Message) => MESSAGES.COMMANDS.CONFIG.SET.GUILD_LOG.PROMPT.START(message.author),
					},
				},
			],
		});
	}

	public exec(message: Message, { channel }: { channel: TextChannel }) {
		const guild = message.guild!;

		channel
			.createWebhook(`${this.client.user?.username} logs [${guild.id}]`, {
				avatar: this.client.user?.displayAvatarURL(),
				reason: 'Cyborg: Webhook for logs.',
			})
			.then((wh) => {
				this.client.settings.set(guild, SETTINGS.GUILD_LOG, wh.id);
				this.client.configWebhooks.set(wh.id, wh);
				return message.util?.reply(MESSAGES.COMMANDS.CONFIG.SET.GUILD_LOG.REPLY);
			})
			.catch((err) => this.client.logger.error(err, { topic: TOPICS.UNHANDLED_REJECTION }));
	}
}
