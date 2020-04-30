import { Command, Argument, AkairoModule } from 'discord-akairo';
import { Message } from 'discord.js';
import { MESSAGES } from '../../util/constants';
import { Inhibitor } from 'discord-akairo';
import { Listener } from 'discord-akairo';

export default class ReloadCommand extends Command {
	constructor() {
		super('reload', {
			aliases: ['reload'],
			description: {
				content: 'Reload commands, listeners or inhibitors.',
				usage: '<handler>',
			},
			category: ' owner',
			ownerOnly: true,
			args: [
				{
					id: 'mod',
					type: Argument.union('inhibitor', 'listener', 'command'),
					prompt: {
						start: (message: Message) => MESSAGES.COMMANDS.OWNER.RELOAD.PROMPT.START(message.author),
						retry: (message: Message) => MESSAGES.COMMANDS.OWNER.RELOAD.PROMPT.RETRY(message.author),
					},
				},
			],
		});
	}

	public exec(message: Message, { mod }: { mod: Inhibitor | Listener | Command }) {
		mod.reload();
		return message.util?.send(
			`Successfully reloaded ${mod.handler.classToHandle.name.toLowerCase()} \`${mod.toString()}\``,
		);
	}
}
