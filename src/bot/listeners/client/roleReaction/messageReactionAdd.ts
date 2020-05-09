import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { TOPICS, EVENTS } from '../../../util/logger';

export default class messageReactionAddReactionRole extends Listener {
	public constructor() {
		super('messageReactionAddReactionRole', {
			emitter: 'client',
			event: 'messageReactionAdd',
			category: 'client',
		});
	}

	public async exec(reaction: MessageReaction, user: User) {
		if (user.bot) return;
		if (reaction.partial || user.partial) {
			try {
				await reaction.message.fetch()
				await user.fetch()
			} catch (err) {
				this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
			}
		};

		if (reaction.message.id === '706640843494129745' && reaction.emoji.name === '✅') {
			try {
				const guild = reaction.message.guild;
				const role = guild!.roles.cache.find(r => r.name == 'Regras');
				const member = await guild?.members.fetch(user);
				if (!role || !member) return;
				if (member.roles.cache.has(role.id)) return;
				await member.roles.add(role);
			} catch (err) {
				console.log(err);
			}
		}
	}
}
