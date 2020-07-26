import { Command } from 'discord-akairo';
import * as util from 'util';
import { Message } from 'discord.js';
import { LOCALE } from '../../util/constants';
import { Argument } from 'discord-akairo';
import { TOPICS, EVENTS } from '../../util/logger';

export default class RunCommand extends Command {
	public constructor() {
		super('run', {
			aliases: ['run'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.DESCRIPTION,
				usage: () => '<command>',
				examples: () => ['eval', 'ping'],
			},
			category: 'owner',
			ownerOnly: true,
			ratelimit: 2,
			args: [
				{
					id: 'command',
					type: Argument.union('command', 'commandAlias'),
					prompt: {
						start: 'which command?',
						retry: 'which command?'
					}
				},
				{
					id: 'msg',
					type: Argument.union('message', 'guildMessage'),
					prompt: {
						start: 'which msg?',
						retry: 'which msg?'
					}
				},
				{
					id: 'content',
					match: 'rest',
					default: ''
				},
				{
					id: 'ignore',
					match: 'flag',
					flag: ['--force', '--ignore'],
				}
			],
		});
	}

	public async exec(message: Message, { command, msg, content, ignore }: { command: Command; msg: Message; content: string; ignore: boolean }) {
		try {
			if (msg.partial) await msg.fetch()
			await this.client.commandHandler.handleDirectCommand(
				msg,
				content,
				command,
				ignore
			);
		} catch (err) {
			this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
		}
	}
}
