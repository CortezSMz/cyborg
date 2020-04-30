import { Listener } from 'discord-akairo';
import { Permissions } from 'discord.js';
import { MESSAGES, SETTINGS } from '../../util/constants';
import { EVENTS, TOPICS } from '../../util/logger';

export default class ReadyListener extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client',
		});
	}

	public async exec() {
		await this.client.remindmeScheduler.init();
		this.client.logger.info(MESSAGES.REMINDME_SCHEDULER.INIT, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.client.logger.info(MESSAGES.EVENTS.READY.LOG(this.client.user?.tag ?? '', this.client.user?.id ?? ''), {
			topic: TOPICS.DISCORD,
			event: EVENTS.READY,
		});
		this.client.user?.setActivity(MESSAGES.EVENTS.READY.ACTIVITY(this.client.user?.username));
		this.client.promServer.listen(5500);
		this.client.logger.info('Metrics listening on 5500', { topic: TOPICS.METRICS, event: EVENTS.READY });
		for (const guild of this.client.guilds.cache.values()) {
			const logs = this.client.settings.get(guild, SETTINGS.GUILD_LOG);
			if (!logs) continue;
			if (!guild.me?.permissions.has(Permissions.FLAGS.MANAGE_WEBHOOKS)) continue;
			const webhook = (await guild.fetchWebhooks()).get(logs);
			if (!webhook) continue;
			this.client.webhooks.set(webhook.id, webhook);
		}
	}
}
