import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { EVENTS, TOPICS } from '../../util/logger';
import { PrefixSupplier } from 'discord-akairo';

export default class CommandBlockedListener extends Listener {
	public constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			event: 'commandBlocked',
			category: 'commandHandler',
		});
	}

	public exec(message: Message, command: Command, reason: string) {
		this.client.logger.info(
			`Blocked ${command.id} on ${
			message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'
			} with reason ${reason}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_BLOCKED },
		);
		if (reason === 'guild') return message.author.send(`Sorry, you can't use \`${(this.client.commandHandler.prefix as PrefixSupplier)(message)}${command.id}\` on DMs`)
	}
}
