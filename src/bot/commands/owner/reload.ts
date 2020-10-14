import { Command, Argument, Inhibitor, Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class ReloadCommand extends Command {
	public constructor() {
		super('reload', {
			aliases: ['reload'],
			description: {
				content: () => 'Reload commands, listeners or inhibitors.',
				usage: () => '<handler>',
				examples: () => ['blacklist', 'ready', 'help'],
			},
			category: 'owner',
			ownerOnly: true,
			args: [
				{
					id: 'module',
					type: Argument.union('inhibitor', 'listener', 'command'),
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.OWNER.RELOAD.PROMPT.START(message.author),
						retry: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.OWNER.RELOAD.PROMPT.RETRY(message.author),
					},
				},
			],
		});
	}

	public exec(message: Message, { module }: { module: Inhibitor | Listener | Command }) {
		module.reload();
		return message.util?.send(`Successfully reloaded ${module.handler.classToHandle.name.toLowerCase()} \`${module.toString()}\``);
	}
}
