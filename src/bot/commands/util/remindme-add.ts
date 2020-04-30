import ms from '../../util/timeParser';
import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../util/constants';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-add', {
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			channel: 'guild',
			args: [
				{
					id: 'time',
					type: (_, str): number | null => {
						if (!str) return null;
						const time = ms(str);
						if (time && time >= 1000 && !isNaN(time)) return time;
						return null;
					},
					prompt: {
						start: (message: Message) => MESSAGES.COMMANDS.UTIL.REMINDME.PROMPT_TIME.START(message.author),
						retry: (message: Message) =>
							MESSAGES.COMMANDS.UTIL.REMINDME.PROMPT_TIME.RETRY(
								message.author,
								(this.handler.prefix as PrefixSupplier)(message)
							),
					},
				},
				{
					id: 'text',
					match: 'rest',
					type: 'string',
					prompt: {
						start: (message: Message) => MESSAGES.COMMANDS.UTIL.REMINDME.PROMPT_TEXT.START(message.author),
					},
				},
			],
		});
	}

	public async exec(message: Message, { time, text }: { time: number; text: string }) {
		this.client.remindmeScheduler.add(
			{
				channel: message.channel.id,
				guild: message.guild!.id,
				message: message.id,
				author: message.author.id,
				text,
				createdAt: new Date().toISOString(),
			},
			time
		);
	}
}
