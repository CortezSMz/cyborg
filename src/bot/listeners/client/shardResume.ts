import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/Constants';
import { TOPICS } from '../../util/Logger';

export default class ShardResumeListener extends Listener {
	public constructor() {
		super('shardResume', {
			emitter: 'client',
			event: 'shardResume',
			category: 'client',
		});
	}

	public exec(id: number) {
		this.client.logger.info(CYBORG.EVENTS.SHARD_RESUME.LOG, {
			topic: TOPICS.DISCORD,
			event: `SHARD ${id} RESUME`,
		});
	}
}
