import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/Constants';
import { TOPICS } from '../../util/Logger';

export default class ShardDisconnectListener extends Listener {
	public constructor() {
		super('shardDisconnected', {
			emitter: 'client',
			event: 'shardDisconnect',
			category: 'client',
		});
	}

	public exec(event: any, id: number) {
		this.client.logger.warn(CYBORG.EVENTS.SHARD_DISCONNECT.LOG(event.code), {
			topic: TOPICS.DISCORD,
			event: `SHARD ${id} DISCONNECT`,
		});
	}
}
