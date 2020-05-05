import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';

export default class messageReactionAddReactionRole extends Listener {
	public constructor() {
		super('messageReactionAddReactionRole', {
			emitter: 'client',
			event: 'messageReactionAdd',
			category: 'client',
		});
	}

	public exec(messageReaction: MessageReaction, user: User) {
		if (messageReaction.partial || user.partial) return console.log(`Partial: messageReactionAdd`);
		console.log(`${user.tag} added ${messageReaction.emoji.name} on ${messageReaction.message.channel.type == 'dm' ? 'DM' : `${messageReaction.message.channel}`}`);
	}
}
