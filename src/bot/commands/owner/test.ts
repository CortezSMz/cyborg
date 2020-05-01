/* eslint-disable */
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, MessageReaction, User } from 'discord.js';
import { COLORS } from '../../util/constants';

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

        const filter = (m: Message) => m.author.id === message.author.id && ['beginner developers', 'artists', 'sfx artists', 'ui designers', 'modelers', 'scriptors', 'traders', 'builders', 'legend artists', 'youtubers', 'translators', 'off-site developers', 'clothing designers', 'animators'].includes(m.content.toLowerCase())

    message.channel.send('oi')
    const question1 = await message.channel.awaitMessages(filter, { max: 1 })

    console.log(question1)
    message.channel.send(question1.first()?.content)
	}
}


/* 		const embed = new MessageEmbed()
			.setDescription('a')
			.setColor(COLORS.EMBED)
		msg.channel.send(embed).then((message) => {
			message.react('⏪');
			message.react('⏩');
			message.react('🗑');

			const backwardsFilter = (reaction: MessageReaction, user: User) =>
				reaction.emoji.name === '⏪' && user.id === msg.author.id;
			const forwardsFilter = (reaction: MessageReaction, user: User) =>
				reaction.emoji.name === '⏩' && user.id === msg.author.id;
			const removeFilter = (reaction: MessageReaction, user: User) =>
				reaction.emoji.name === '🗑' && user.id === msg.author.id;

			const backwards = message.createReactionCollector(backwardsFilter);
			const forwards = message.createReactionCollector(forwardsFilter);
			const remove = message.createReactionCollector(removeFilter);

			backwards.on('collect', (r, u) => {
				r.users.remove(u.id);
			});

			forwards.on('collect', (r, u) => {
				r.users.remove(u.id);
			});

			remove.on('collect', () => {
				message.delete();
			});
		}); */