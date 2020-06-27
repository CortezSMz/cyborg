/* eslint-disable */
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import moment = require('moment');
import { stripIndents } from 'common-tags';

export default class TestCommand extends Command {
	public constructor() {
		super('test', {
			aliases: ['setup'],
			description: {
				content: () => 'setup',
				usage: () => null,
				examples: () => null,
			},
			category: 'owner',
			ownerOnly: true
		});
	}

	public async exec(message: Message) {
		const badimg = 'https://i.imgur.com/F2Kz5aS.png';
		const ramboimg = 'https://i.imgur.com/B3S4N5x.png';
		const mineimg = 'https://i.imgur.com/Qr5vynA.png';
		const bad = this.client.emojis.cache.get('722302447124480070')!;
		const rambo = this.client.emojis.cache.get('722302449179689060')!;
		const mine = this.client.emojis.cache.get('722302449163174039')!;

		const embed = new MessageEmbed()
			.setColor(16464082)

		// 1º emote
		embed
			.setImage(badimg)
		const firstMsg = await message.channel.send({ embed });

		// 2º emote
		embed
			.setImage(ramboimg)
		const secondMsg = await message.channel.send({ embed })

		// 3º emote
		embed
			.setImage(mineimg)
		const thirdMsg = await message.channel.send({ embed })

		// resultado
		embed
			.setImage(null as any)
			//.setTitle('Resultado parcial:')
			.setDescription(stripIndents`
			1º ${bad} • 0x\\❤️
			2º ${rambo} • 0x\\❤️
			3º ${mine} • 0x\\❤️
			`)
		//.setFooter(`A votação acaba em ${moment.duration((moment('2020-06-23T05:48:35.918Z') as any) - Date.now()).format('d[d ]h[h ]m[m e ]s[s ]')}`)
		await message.channel.send('Escolha o próximo emote do canal do Giu14!\n\nVote reagindo com ❤️ no emote que você mais gostou!')
		const resultado = await message.channel.send({ embed });
		firstMsg.react('❤️');
		secondMsg.react('❤️');
		thirdMsg.react('❤️');
		let EMOTEVOTES = {} = JSON.parse(`
		{
			"${firstMsg.id}": 0,
			"${secondMsg.id}": 0,
			"${thirdMsg.id}": 0,
			"RESULTADO": "${resultado.id}"
		}
		`);
		this.client.settings.set(message.guild!, 'EMOTE_VOTE', EMOTEVOTES)

		bad.setName(firstMsg.id)
		rambo.setName(secondMsg.id)
		mine.setName(thirdMsg.id)
	}
}