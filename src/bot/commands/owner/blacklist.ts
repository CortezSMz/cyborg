import { Command } from 'discord-akairo';
import { Message, User } from 'discord.js';
import { LOCALE, SETTINGS } from '../../util/constants';

export default class BlacklistCommand extends Command {
	public constructor() {
		super('blacklist', {
			aliases: ['blacklist', 'unblacklist'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.DESCRIPTION,
				usage: () => '<user>',
				examples: () => ['Cosmzs', '@Cosmzs', '200502727170588673'],
			},
			category: 'owner',
			ownerOnly: true,
			ratelimit: 2,
			args: [
				{
					id: 'user',
					match: 'content',
					type: 'user',
					prompt: {
						start: (message: Message) => LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.PROMPT.START(message.author),
					},
				},
			],
		});
	}

	public async exec(message: Message, { user }: { user: User }) {
		const blacklist = this.client.settings.get('global', SETTINGS.BLACKLIST, ['']);
		if (blacklist.includes(user.id)) {
			const index = blacklist.indexOf(user.id);
			blacklist.splice(index, 1);
			if (blacklist.length === 0) this.client.settings.delete('global', SETTINGS.BLACKLIST);
			else this.client.settings.set('global', SETTINGS.BLACKLIST, blacklist);

			return message.util?.send(LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.REPLY(user.tag));
		}

		blacklist.push(user.id);
		this.client.settings.set('global', SETTINGS.BLACKLIST, blacklist);

		return message.util?.send(LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.REPLY_2(user.tag));
	}
}
