import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/Constants';
import { EVENTS, TOPICS } from '../../util/Logger';

export default class ReadyListener extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client',
		});
	}

	public async exec() {
		await this.client.twitchScheduler.init();
		this.client.logger.info(CYBORG.TWITCH_SCHEDULER.INIT, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		await this.client.remindmeScheduler.init();
		this.client.logger.info(CYBORG.REMINDME_SCHEDULER.INIT, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.client.logger.info(CYBORG.EVENTS.READY.LOG(this.client.user?.tag ?? '', this.client.user?.id ?? ''), {
			topic: TOPICS.DISCORD,
			event: EVENTS.READY,
		});
		this.client.user?.setActivity(CYBORG.EVENTS.READY.ACTIVITY(this.client.user?.username));
	}
}
