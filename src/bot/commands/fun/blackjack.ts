import { stripIndents } from 'common-tags';
import { Argument } from 'discord-akairo';
import { Flag } from 'discord-akairo';
import { Command } from 'discord-akairo';
import { User } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';
import { COLORS } from '../../util/constants';

export default class BlackJackCommand extends Command {
	public constructor() {
		super('blackjack', {
			aliases: ['blackjack'],
			description: {
				content: () => '',
				usage: () => '',
			},
			category: 'fun',
			ratelimit: 2,
		});
	}

	private readonly values = [
		'A',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
	];

	private readonly suits = ['♠️', '♦️', '♣️', '♥️'];

	public gameEmbed: MessageEmbed = new MessageEmbed();

	public deck: Array<{ v: string; s: string; w: number }> = [];

	public createDeck() {
		this.deck = [];
		for (let i = 0; i < this.values.length; i++) {
			for (let x = 0; x < this.suits.length; x++) {
				let weight = parseInt(this.values[i]);
				if (
					this.values[i] == 'J' ||
					this.values[i] == 'Q' ||
					this.values[i] == 'K'
				)
					weight = 10;
				if (this.values[i] == 'A') weight = 11;
				const card = {
					v: this.values[i],
					s: this.suits[x],
					w: weight,
				};
				this.deck.push(card);
			}
		}
	}
	private players: Array<{
		name: string;
		ID: number;
		Total: number;
		hand: Array<{ v: string; s: string; w: number }>;
	}> = [];

	public shuffle = (deck: Array<{ v: string; s: string; w: number }>) => {
		for (let i = 0; i < 1000; i++) {
			const location1 = Math.floor(Math.random() * deck.length);
			const location2 = Math.floor(Math.random() * deck.length);
			const tmp = deck[location1];

			deck[location1] = deck[location2];
			deck[location2] = tmp;
		}
	};

	public createPlayers(qtd: Number, author: User) {
		this.players = [];
		for (let i = 1; i <= qtd; i++) {
			const hand: Array<{ v: string; s: string; w: number }> = [];
			const player = {
				name: i === 1 ? author.username : 'Cyborg',
				ID: i,
				Total: 0,
				hand,
			};
			this.players.push(player);
		}
	}

	public dealHands() {
		for (let i = 0; i < 2; i++) {
			for (let x = 0; x < this.players.length; x++) {
				const card = this.deck.pop();
				this.players[x].hand.push(card!);
			}
		}
	}

	public hit() {
		const card = this.deck.pop();
		this.players[0].hand.push(card!);
	}

	public updateEmbed() {
		const p = this.players[0];
		const bot = this.players[1];

		this.gameEmbed
			.setColor(COLORS.EMBED)
			.spliceFields(0, 2, [])
			.addField(
				p.name,
				stripIndents`
				${p.hand.map((c) => `\`${c.s}${c.v}\``).join(' | ')}
				Total: ${p.hand.reduce((a, b) => a + (b['w'] || 0), 0)}
				`,
				true,
			)
			.addField(
				bot.name,
				stripIndents`
				\`${bot.hand[0].s}${bot.hand[0].v}\` \`?\`
				Total: ?
				`,
				true,
			);
	}

	public end(playerScore: number) {
		for (let i = 0; i < 100; i++) {
			const botScore = this.players[1].hand.reduce(
				(a, b) => a + (b['w'] || 0),
				0,
			);
			if (botScore > 21) {
				return 'won';
			} else if (botScore >= 17 && playerScore < botScore) {
				return 'lost';
			} else if (botScore >= 17 && playerScore > botScore) {
				return 'won';
			} else if (botScore < 17) {
				const card = this.deck.pop();
				this.players[1].hand.push(card!);
			}
		}

		return 'lost';
	}

	public *args(msg: Message) {
		this.createDeck();
		this.shuffle(this.deck);
		this.createPlayers(2, msg.author);

		this.dealHands();

		this.updateEmbed();

		if (
			this.players[1].hand.reduce((a, b) => a + (b['w'] || 0), 0) === 21
		) {
			return { option: 'houseblackjack' };
		}

		if (
			this.players[0].hand.reduce((a, b) => a + (b['w'] || 0), 0) === 21
		) {
			return { option: 'blackjack' };
		}

		const option = yield {
			type: Argument.compose(
				[
					['hit', 'h'],
					['stand', 's'],
				],
				(_, phrase: string) => {
					if (phrase === 'hit') this.hit();
					this.updateEmbed();

					const playerScore = this.players[0].hand.reduce(
						(a, b) => a + (b['w'] || 0),
						0,
					);
					if (playerScore > 21) return 'lost';

					if (playerScore === 21 || phrase === 'stand') {
						return this.end(playerScore);
					}

					Flag.fail(phrase);
				},
			),
			prompt: {
				retries: Infinity,
				start: {
					content: 'Type `h` to `hit` or type `s` to `stand`.',
					embed: this.gameEmbed,
				},
				retry: {
					content: 'Type `h` to `hit` or type `s` to `stand`.',
					embed: this.gameEmbed,
				},
			},
		};

		return { option };
	}

	public exec(message: Message, { option }: { option: string }) {
		console.log(option);
		const p = this.players[0];
		const bot = this.players[1];

		this.gameEmbed
			.setColor(COLORS.EMBED)
			.spliceFields(0, 2, [])
			.addField(
				p.name,
				stripIndents`
				${p.hand.map((c) => `\`${c.s}${c.v}\``).join(' | ')}
				Total: ${p.hand.reduce((a, b) => a + (b['w'] || 0), 0)}
				`,
				true,
			)
			.addField(
				bot.name,
				stripIndents`
				${bot.hand.map((c) => `\`${c.s}${c.v}\``).join(' | ')}
				Total: ${bot.hand.reduce((a, b) => a + (b['w'] || 0), 0)}
				`,
				true,
			);

		if (option === 'lost') {
			message.channel.send('You lost the game.', {
				embed: this.gameEmbed.setColor('#e6101b'),
			});
		}

		if (option === 'houseblackjack') {
			message.channel.send('Blackjack! You lost the game.', {
				embed: this.gameEmbed.setColor('#e6101b'),
			});
		}

		if (option === 'won') {
			message.channel.send('You won the game.', {
				embed: this.gameEmbed.setColor('#10e614'),
			});
		}

		if (option === 'blackjack') {
			message.channel.send('Blackjack!', {
				embed: this.gameEmbed.setColor('#10e614'),
			});
		}
	}
}
