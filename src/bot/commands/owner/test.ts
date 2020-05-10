/* eslint-disable */
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, MessageReaction, User } from 'discord.js';
import { COLORS, SETTINGS } from '../../util/constants';

export default class TestCommand extends Command {
	public constructor() {
		super('test', {
			aliases: ['test'],
			description: {
				content: 'test',
			},
			category: ' owner',
			ownerOnly: true,
		});
	}

	public async exec(message: Message) {

	}
}