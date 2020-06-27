import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/constants';
import { TOPICS } from '../../util/logger';

export default class ShardReconnectListener extends Listener {
	public constructor() {
		super('shardReconnecting', {
			emitter: 'client',
			event: 'shardReconnecting',
			category: 'client',
		});
	}

	public exec(id: number) {
		this.client.logger.info(CYBORG.EVENTS.SHARD_RECONNECT.LOG, {
			topic: TOPICS.DISCORD,
			event: `SHARD ${id} RECONNECTING`,
		});
		this.client.promServer.close();
		this.client.logger.info(`Metrics server closed.`, { topic: TOPICS.METRICS, event: `SHARD ${id} RECONNECTING` });
		this.client.twitchListener.close();
		this.client.logger.info(`Twitch listener server closed.`, { topic: TOPICS.TWITCH, event: `SHARD ${id} RECONNECTING` });
	}
}
