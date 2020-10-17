import { Command, Flag } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';

export default class ConfigCommand extends Command {
	public constructor() {
		super('config', {
			aliases: ['config'],
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DESCRIPTION.CONTENT,
				usage: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.CONFIG.DESCRIPTION.USAGE,
				examples: () => null,
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public *args() {
		const method = yield {
			type: [
				['config-check', 'check', 'checar'],
				['config-set', 'set', ''],
				['config-delete', 'delete', 'del', 'remove', 'rm', 'remover', 'deletar'],
				['config-clear', 'clear', 'limpar'],
				['config-toggle', 'toggle', 'alternar'],
			],
			otherwise: (msg: Message) => {
				this.client.commandHandler.handleDirectCommand(msg, 'config', this.client.commandHandler.modules.get('help')!);
			},
		};

		return Flag.continue(method);
	}
}
