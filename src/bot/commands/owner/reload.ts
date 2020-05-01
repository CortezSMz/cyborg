import { Command, Argument, Inhibitor, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { MESSAGES } from '../../util/constants';

export default class ReloadCommand extends Command {
	public constructor() {
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
