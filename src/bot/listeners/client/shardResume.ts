import { Listener } from 'discord-akairo';
import { CYBORG } from '../../util/constants';
import { TOPICS } from '../../util/logger';

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
		this.client.twitchListener.listen(6600);
		this.client.logger.info(`Listening to twitch on 6600`, { topic: TOPICS.TWITCH, event: `SHARD ${id} RESUME` });
		//this.client.promServer.listen(5500);
		//this.client.logger.info(`Metrics listening on 5500`, { topic: TOPICS.METRICS, event: `SHARD ${id} RESUME` });
	}
}
