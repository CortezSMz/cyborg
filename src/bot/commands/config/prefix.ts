import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { SETTINGS } from '../../util/constants';

export default class PrefixCommand extends Command {
	public constructor() {
		super('prefix', {
			aliases: ['prefix'],
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.PREFIX.DESCRIPTION,
				usage: () => '[prefix]',
				examples: () => ['*', 'Cyborg'],
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
			args: [
				{
					id: 'prefix',
					type: 'string',
				},
			],
		});
	}

	public async exec(message: Message, { prefix }: { prefix: string }) {
		if (!prefix) {
			return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.UTIL.PREFIX.REPLY((this.handler.prefix as PrefixSupplier)(message)));
		}
		this.client.settings.set(message.guild!, SETTINGS.PREFIX, prefix);
		if (prefix === process.env.COMMAND_PREFIX) {
			return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.UTIL.PREFIX.REPLY_2(prefix));
		}
		return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.UTIL.PREFIX.REPLY_3(prefix));
	}
}
