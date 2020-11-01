import CyborgCommand from '../../structures/CyborgCommand';
import { Message, User } from 'discord.js';
import { SETTINGS } from '../../util/Constants';

export default class BlacklistCommand extends CyborgCommand {
	public constructor() {
		super('blacklist', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.DESCRIPTION,
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
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.PROMPT.START(message.author),
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

			return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.REPLY(user.tag));
		}

		blacklist.push(user.id);
		this.client.settings.set('global', SETTINGS.BLACKLIST, blacklist);

		return message.util?.send(this.client.LOCALE(message.guild!).COMMANDS.OWNER.BLACKLIST.REPLY_2(user.tag));
	}
}
