import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { LOCALE } from '../../util/constants';

export default class PingCommand extends Command {
	public constructor() {
		super('ping', {
			aliases: ['ping'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.UTIL.PING.DESCRIPTION,
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

		return message.util?.send(
			LOCALE(message.guild!).COMMANDS.UTIL.PING.RESPONSES[Math.floor(Math.random() * LOCALE(message.guild!).COMMANDS.UTIL.PING.RESPONSES.length)]
				.replace(
					'$(ping)',
					(
						(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)
					).toString(),
				)
				.replace('$(heartbeat)', Math.round(this.client.ws.ping).toString()),
		);
	}
}
