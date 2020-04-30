import { Command, Flag } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../util/constants';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme', {
			aliases: ['remindme', 'remind'],
			category: 'util',
			description: {
				content: MESSAGES.COMMANDS.UTIL.REMINDME.DESCRIPTION,
				usage: '<when> <text>',
				examples: [
					"1s i'm lonely",
					'15m call mom',
					'1h drink water',
					'1d do the dishes',
					'1w do the thing',
					'9mt 👶',
					'1y FeelsBirthdayMan',
					'5y3mt2w3d12h30m what am I doing with my life?',
					'"1 year 6 mts 2 w" friends birthday',
				],
			},
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			channel: 'guild',
		});
	}

	public *args() {
		const method = yield {
			type: [
				['remindme-add', 'add'],
				['remindme-list', 'list'],
				['remindme-del', 'del'],
				['remindme-clear', 'clear'],
			],
			otherwise: async (msg: Message) => {
				const cmd = this.client.commandHandler.modules.get('remindme-add')!;
				return this.client.commandHandler.runCommand(
					msg,
					cmd,
					// @ts-ignore
					await cmd.parse(msg, msg.util?.parsed?.content)
				);
			},
		};
		return Flag.continue(method);
	}
}
