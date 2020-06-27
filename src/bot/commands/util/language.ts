import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { LOCALE, SETTINGS } from '../../util/constants';

export default class LanguageCommand extends Command {
	public constructor() {
		super('language', {
			aliases: ['language', 'lang'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.UTIL.LANGUAGE.DESCRIPTION,
				usage: () => '[language]',
				examples: () => ['PT-BR', 'EN', 'português', 'english'],
			},
			category: 'util',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
			args: [
				{
					id: 'language',
					type: [
						['PT-BR', 'PTBR', 'português'],
						['EN', 'english'],
					]
				},
			],
		});
	}

	public async exec(message: Message, { language }: { language: string }) {
		if (!language) {
			return message.util?.send(LOCALE(message.guild!).COMMANDS.UTIL.LANGUAGE.REPLY(this.client.settings.get(message.guild!, SETTINGS.LANGUAGE, process.env.DEFAULT_LANG)));
		}
		this.client.settings.set(message.guild!, SETTINGS.LANGUAGE, language);
		if (language === process.env.DEFAULT_LANG) {
			return message.util?.reply(LOCALE(message.guild!).COMMANDS.UTIL.LANGUAGE.REPLY_2(language));
		}
		return message.util?.reply(LOCALE(message.guild!).COMMANDS.UTIL.LANGUAGE.REPLY_3(language));
	}
}
