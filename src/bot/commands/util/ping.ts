import CyborgCommand from '../../structures/CyborgCommand';
import { Message } from 'discord.js';

export default class PingCommand extends CyborgCommand {
	public constructor() {
		super('ping', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.PING.DESCRIPTION,
				usage: () => null,
				examples: () => null,
			},
			category: 'util',
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const msg = await message.util?.send('Pinging...');
		if (!msg) return null;

		interface responses {
			chance: number;
			response: string;
		}

		function randomResponse(response: responses[]) {
			var rnd = Math.random();
			var cc = 0;
			for (var i = 0; i < response.length; i++) {
				cc += response[i].chance;
				if (rnd < cc) return response[i].response;
			}
			return 'Pong.';
		}

		return message.util?.send(
			randomResponse(this.client.LOCALE(message.guild!).COMMANDS.UTIL.PING.RESPONSES)
				.replace('$(ping)', ((msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)).toString())
				.replace('$(heartbeat)', Math.round(this.client.ws.ping).toString())
		);
	}
}
