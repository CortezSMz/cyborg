import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { TOPICS, EVENTS } from '../../../util/logger';
import { SETTINGS } from '../../../util/constants';
import moment = require('moment');

export default class messageReactionAddGiuEmote extends Listener {
	public constructor() {
		super('messageReactionAddGiuEmote', {
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

		if (!reaction.message.guild) return;

		const votes = this.client.settings.get(reaction.message.guild, SETTINGS.EMOTE_VOTE)!;
		if (!votes) return;
		if (!Object.keys(votes).includes(reaction.message.id)) return;
		if (reaction.emoji.name !== '❤️') return reaction.remove()

		votes[reaction.message.id] = reaction.count! - 1;

		await this.client.settings.set(reaction.message.guild, SETTINGS.EMOTE_VOTE, votes);

		const resultado = await reaction.message.channel.messages.fetch(votes['RESULTADO'] as string);

		let num = 1;

		resultado.edit(
			resultado.embeds[0]
				.setTitle('Votos:')
				.setDescription(
					Object.entries(votes).filter(a => (a[0] as string) !== 'RESULTADO').sort((a, b) => (b[1] as number) - (a[1] as number))
						.map(pos => {
							return `${num == 1 && pos[1] !== 0 ? '**' : ''} ${num++}º ${this.client.emojis.cache.find(e => e.name == pos[0])} • ${pos[1]}x\\❤️ ${num === 2 && pos[1] !== 0 ? '**' : ''}`
						}).join('\n')
				)
			//.setFooter(`A votação acaba em ${moment.duration((moment('2020-06-23T05:48:35.918Z') as any) - Date.now()).format('d[d ]h[h ]m[m e ]s[s ]')}`)
		)
	}
}
