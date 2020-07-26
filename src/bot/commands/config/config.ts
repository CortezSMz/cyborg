import { Command, Flag } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { LOCALE } from '../../util/constants';
export default class ConfigCommand extends Command {
	public constructor() {
		super('config', {
			aliases: ['config'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.DESCRIPTION.USAGE,
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
				['config-check', 'check'],
				['config-set', 'set'],
				['config-delete', 'delete', 'del', 'remove', 'rm'],
				['config-clear', 'clear'],
				['config-toggle', 'toggle'],
			],
			otherwise: (msg: Message) => {
				this.client.commandHandler.handleDirectCommand(msg, 'config', this.client.commandHandler.modules.get('help')!);
			},
		};

		return Flag.continue(method);
	}
}
