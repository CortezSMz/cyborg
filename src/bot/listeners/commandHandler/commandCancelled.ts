import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { EVENTS, TOPICS } from '../../util/Logger';
import ConnectFourCommand from '../../commands/fun/connectfour';
import TicTacToeCommand from '../../commands/fun/tictactoe';

export default class CommandCancelledListener extends Listener {
	public constructor() {
		super('commandCancelled', {
			emitter: 'commandHandler',
			event: 'commandCancelled',
			category: 'commandHandler',
		});
	}

	public exec(message: Message, command: Command) {
		this.client.logger.info(`Cancelled ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}`, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_CANCELLED });

		if (command instanceof TicTacToeCommand || command instanceof ConnectFourCommand) {
			const instance = command.getInstance(message);
			if (instance) instance.delete();
		}
	}
}
