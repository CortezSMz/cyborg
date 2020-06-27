import { Listener } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS, LOCALE } from '../../util/constants';

export default class MessageInvalidListener extends Listener {
	public constructor() {
		super('messageInvalid', {
			emitter: 'commandHandler',
			event: 'messageInvalid',
			category: 'commandHandler',
		});
	}

	public async exec(message: Message) {
		if (message.content.replace(/\W+/g, '') === this.client.user?.id) { // responds only when theres a mention and nothing else
			const embed = new MessageEmbed()
				.setColor(COLORS.EMBED)
			//				.setDescription(LOCALE(message.guild!).LISTENERS.COMMAND_HANDLER.MISSING_PERMISSIONS)
			return message.util?.send(embed);
		}

		if (message.guild && message.util?.parsed?.prefix) {
			if (!message.util?.parsed?.alias || !message.util?.parsed?.afterPrefix) return;
			const command = this.client.commandHandler.modules.get('tag-show')!;
			return this.client.commandHandler.runCommand(
				message,
				command,
				await command.parse(message, message.util?.parsed?.afterPrefix),
			);
		}
	}
}
