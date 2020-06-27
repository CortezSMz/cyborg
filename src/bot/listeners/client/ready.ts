import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/constants';
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
		await this.client.twitchScheduler.init();
		this.client.logger.info(CYBORG.TWITCH_SCHEDULER.INIT, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		await this.client.remindmeScheduler.init();
		this.client.logger.info(CYBORG.REMINDME_SCHEDULER.INIT, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.client.logger.info(CYBORG.EVENTS.READY.LOG(this.client.user?.tag ?? '', this.client.user?.id ?? ''), {
			topic: TOPICS.DISCORD,
			event: EVENTS.READY,
		});
		this.client.user?.setActivity(CYBORG.EVENTS.READY.ACTIVITY(this.client.user?.username));
		this.client.twitchListener.listen(6600);
		this.client.logger.info('Listening to twitch on 6600', { topic: TOPICS.TWITCH, event: EVENTS.READY });
		//this.client.promServer.listen(5500);
		//this.client.logger.info('Metrics listening on 5500', { topic: TOPICS.METRICS, event: EVENTS.READY });
	}
}
