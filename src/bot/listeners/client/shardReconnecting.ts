import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/Constants';
import { TOPICS } from '../../util/Logger';

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
	}
}
