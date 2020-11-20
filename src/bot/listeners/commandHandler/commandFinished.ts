import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { EVENTS, TOPICS } from '../../util/Logger';
import ConnectFourCommand from '../../commands/fun/connectfour';
import TicTacToeCommand from '../../commands/fun/tictactoe';

export default class CommandFinishedListener extends Listener {
	public constructor() {
		super('commandFinished', {
			emitter: 'commandHandler',
			event: 'commandFinished',
			category: 'commandHandler',
		});
	}

	public exec(message: Message, command: Command, args: any) {
		this.client.logger.info(
			`Finished ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}${
				Object.keys(args).length && !args.command ? ` with arguments ${args.mod ? args.mod.id : JSON.stringify(args)}` : ''
			}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_FINISHED }
		);

		if (command instanceof TicTacToeCommand || command instanceof ConnectFourCommand) {
			const instance = command.getInstance(message);
			if (instance) instance.delete();
		}
	}
}
