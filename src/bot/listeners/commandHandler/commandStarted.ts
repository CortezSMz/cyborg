import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import CyborgCommand from '../../structures/CyborgCommand';
import { EVENTS, TOPICS } from '../../util/Logger';

export default class CommandStartedListener extends Listener {
	public constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			event: 'commandStarted',
			category: 'commandHandler',
		});
	}

	public exec(message: Message, command: CyborgCommand, args: any) {
		this.client.logger.info(
			`Started ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}${
				Object.keys(args).length && !args.command ? ` with arguments ${args.mod ? args.mod.id : JSON.stringify(args)}` : ''
			}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_STARTED }
		);

		command.uses++;
	}
}
