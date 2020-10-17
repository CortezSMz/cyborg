import { Command, Flag } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';

import { Argument } from 'discord-akairo';
import { PrefixSupplier } from 'discord-akairo';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-add', {
			aliases: ['reminder', 'remindme', 'remind'],
			category: 'util',
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.DESCRIPTION.replace(/\$\(prefix\)/g, (this.handler.prefix as PrefixSupplier)(message) as string),
				usage: () => '<when> <...text>',
				examples: () => [
					"1s i'm lonely",
					'15m call mom',
					'1h drink water',
					'9mt 👶',
					'1y FeelsBirthdayMan',
					'5y3mt2w3d12h30m what am I doing with my life?',
					'"1 year 6 mts 2 w" friends birthday',
					'list',
					'del <ID>',
					'clear',
				],
			},
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
		});
	}

	public *args() {
		const methodOrArg = yield {
			type: Argument.union('duration', [
				['remindme-add', 'add', 'adicionar'],
				['remindme-list', 'list', 'show', 'listar', 'lista'],
				['remindme-del', 'del', 'delete', 'remove', 'rmv', 'rm', 'deletar', 'remover'],
				['remindme-clear', 'clear', 'limpar'],
			]),
			prompt: {
				start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.ADD.PROMPT_TIME.START(message.author),
				retry: (message: Message) =>
					this.client
						.LOCALE(message.guild!)
						.COMMANDS.UTIL.REMINDME.ADD.PROMPT_TIME.RETRY(message.author)
						.replace('$(prefix)', (this.handler.prefix as PrefixSupplier)(message) as string),
			},
		};
		if (typeof methodOrArg === 'string' && methodOrArg.startsWith('remindme-')) {
			return Flag.continue(methodOrArg);
		} else {
			const text = yield {
				id: 'text',
				match: 'rest',
				type: 'string',
				prompt: {
					start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.ADD.PROMPT_TEXT.START(message.author),
				},
			};
			return {
				time: methodOrArg,
				text,
			};
		}
	}

	public exec(message: Message, { time, text }: { time: number; text: string }) {
		if (text.length >= 1950) {
			return message.util?.reply(this.client.LOCALE(message.guild!).COMMANDS.UTIL.REMINDME.ADD.TOO_LONG);
		}
		this.client.remindmeScheduler.add(
			{
				channel: message.channel.id,
				guild: message.guild ? message.guild.id : '@me',
				message: message.id,
				author: message.author.id,
				text,
				createdAt: new Date().toISOString(),
			},
			time
		);
	}
}
