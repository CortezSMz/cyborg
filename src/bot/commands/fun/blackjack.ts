import { stripIndents } from 'common-tags';
import { Argument, Flag, Command } from 'discord-akairo';
import { User, MessageEmbed, Message, Snowflake, Collection } from 'discord.js';
import { COLORS } from '../../util/constants';

export interface Card {
	v: string;
	s: string;
	w: number;
}

export interface Player {
	name: string;
	ID: string;
	total: number;
	hand: Array<Card>;
}

export interface GameInstance {
	players: Array<Player>;
	deck: Array<Card>;
	embed: MessageEmbed;
	ended: boolean;
}

export default class BlackJackCommand extends Command {
	public constructor() {
		super('blackjack', {
			aliases: ['blackjack'],
			description: {
				content: () => 'Type `h` to `hit` or type `s` to `stand`.\n\nJ, Q and K = 10 | A = 11 or 1',
				usage: () => '',
				examples: () => [],
			},
			category: 'fun',
			ratelimit: 2,
		});
	}

	public instances: Collection<Snowflake, GameInstance> = new Collection();

	private readonly values: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

	private readonly suits: string[] = ['♠️', '♦️', '♣️', '♥️'];

	private createDeck() {
		let deck: Array<Card> = [];
		for (let i = 0; i < this.values.length; i++) {
			for (let x = 0; x < this.suits.length; x++) {
				let weight: number = 0;

				switch (this.values[i]) {
					case 'J':
					case 'Q':
					case 'K':
						weight = 10;
						break;
					case 'A':
						weight = 11;
						break;
					default:
						weight = parseInt(this.values[i]);
						break;
				}
				const card: Card = {
					v: this.values[i],
					s: this.suits[x],
					w: weight,
				};
				deck.push(card);
			}
		}
		this.shuffle(deck);
		return deck;
	}

	private shuffle = (deck: Array<Card>) => {
		for (let i = 0; i < 1000; i++) {
			const location1 = Math.floor(Math.random() * deck.length);
			const location2 = Math.floor(Math.random() * deck.length);
			const tmp = deck[location1];

			deck[location1] = deck[location2];
			deck[location2] = tmp;
		}
	};

	public createPlayer(author: User) {
		const hand: Array<Card> = [];
		const player: Player = {
			name: author.username,
			ID: author.id,
			total: 0,
			hand,
		};
		return player;
	}

	public dealHands(user: User) {
		const instance = this.instances.get(user.id)!;
		for (const player of instance.players.values()) {
			for (let i = 0; i < 2; i++) {
				const card = instance.deck.pop();
				player.hand.push(card!);
			}
		}
	}

	public hit(user: User) {
		const instance = this.instances.get(user.id)!;
		const card = instance.deck.pop();
		instance.players.find((p: Player) => p.ID === user.id)!.hand.push(card!);
	}

	public updateEmbed(user: User) {
		const instance = this.instances.get(user.id)!;

		instance.embed.setColor(COLORS.EMBED).spliceFields(0, 2, []);

		for (const player of instance.players.values()) {
			instance.embed.addField(
				player.name,
				stripIndents`
					${player.hand
						.map((c, i) => {
							if (!instance.ended && player.ID === this.client.user!.id && i !== 0) return `\`?\``;
							else return `\`${c.s}${c.v}\``;
						})
						.join(' | ')}
					Total: ${player.ID !== this.client.user!.id ? this.getScore(player) : instance.ended ? this.getScore(player) : '`?`'}
					`,
				true,
			);
		}
	}

	public getScore(player: Player) {
		let playerScore: number = player.hand.reduce((a, b) => a + (b['w'] || 0), 0);
		const aces = player.hand.filter((c: Card) => c.v === 'A');

		if (!!aces.length) {
			for (const _ of aces.values()) {
				if (playerScore <= 21) continue;
				else playerScore -= 10;
			}
		}

		return playerScore;
	}

	public check(user: User, phrase?: string) {
		const instance = this.instances.get(user.id)!;
		let playerScore: number = this.getScore(instance.players.find((p: Player) => p.ID === user.id)!);

		if (playerScore >= 21 || phrase === 'stand') {
			return this.end(user, playerScore);
		}

		return Flag.fail(phrase);
	}

	public end(user: User, playerScore: number, bljk?: { h: boolean; p: boolean }) {
		const instance = this.instances.get(user.id)!;
		this.instances.set(user.id, {
			...instance,
			ended: true,
		});

		if (bljk?.h || bljk?.p) return { house: bljk?.h, player: bljk?.p, blackjack: true };

		if (playerScore > 21) {
			return { player: false, house: true, blackjack: false };
		}

		for (let i = 0; i < instance.deck.length; i++) {
			const botScore = this.getScore(instance.players[1]);

			if (botScore > 21) {
				return { player: true, house: false, blackjack: false };
			} else if (botScore >= 17 && playerScore < botScore) {
				return { player: false, house: true, blackjack: false };
			} else if (botScore >= 17 && playerScore > botScore) {
				return { player: true, house: false, blackjack: false };
			} else if (botScore < 17) {
				const card = instance.deck.pop();
				instance.players[1].hand.push(card!);
			}
		}

		return { player: false, house: true, blackjack: false };
	}

	public *args(msg: Message) {
		this.instances.set(msg.author.id, {
			deck: this.createDeck(),
			embed: new MessageEmbed(),
			players: [this.createPlayer(msg.author), this.createPlayer(this.client.user!)],
			ended: false,
		});

		this.dealHands(msg.author);
		this.updateEmbed(msg.author);

		if (this.instances.get(msg.author.id)!.players[1].hand.length === 2 && this.getScore(this.instances.get(msg.author.id)!.players[1]) === 21) {
			return this.end(msg.author, 0, { p: false, h: true });
		}

		if (this.instances.get(msg.author.id)!.players[0].hand.length === 2 && this.getScore(this.instances.get(msg.author.id)!.players[0]) === 21) {
			return this.end(msg.author, 0, { p: true, h: false });
		}

		const result = yield {
			type: Argument.compose(
				[
					['hit', 'h', 'draw', 'd'],
					['stand', 's', 'stay', 'leave', 'l', 'stop'],
				],
				(msg: Message, phrase: string) => {
					if (phrase === 'hit') this.hit(msg.author);

					this.updateEmbed(msg.author);

					return this.check(msg.author, phrase);
				},
			),
			prompt: {
				retries: Infinity,
				start: {
					content: 'Type `h` to `hit` or `s` to `stand`.',
					embed: this.instances.get(msg.author.id)!.embed,
				},
				retry: {
					content: 'Type `h` to `hit` or `s` to `stand`.',
					embed: this.instances.get(msg.author.id)!.embed,
				},
			},
		};

		return result;
	}

	public exec(message: Message, { player, house, blackjack }: { player: boolean; house: boolean; blackjack: boolean }) {
		const instance = this.instances.get(message.author.id)!;
		this.updateEmbed(message.author);

		let string: string = '';

		if (blackjack) string = 'Blackjack! ';
		if (player) string += 'You won the game!';
		if (house) string += 'You lost the game.';

		message.channel.send(string, {
			embed: instance.embed.setColor(player ? '#10e614' : '#e6101b'),
		});

		this.instances.delete(message.author.id);
	}
}
