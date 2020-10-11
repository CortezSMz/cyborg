import { stripIndents } from 'common-tags';
import { Argument, Flag, Command } from 'discord-akairo';
import { Permissions, User, MessageEmbed, Message, Snowflake, Collection, TextChannel } from 'discord.js';
import { COLORS } from '../../util/constants';

export enum PlayerStatus {
	STANDING = 'Waiting...',
	DRAWING = 'Drawing cards...',
	WON = 'Won!',
	LOST = 'Lost...',
	TIE = 'Tie!',
}

export interface Card {
	value: string;
	suit: string;
	weight: number;
}

export interface Player {
	user: User;
	hand: Array<Card>;
	status: PlayerStatus;
}

export interface GameInstance {
	delete(): boolean;
	players: Array<Player>;
	channel: TextChannel;
	deck: Array<Card>;
	embed: MessageEmbed;
	ended: boolean;
}

export default class BlackJackCommand extends Command {
	private readonly values: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	private readonly suits: string[] = ['♠️', '♦️', '♣️', '♥️'];
	public instances: Collection<Snowflake, GameInstance> = new Collection();

	public constructor() {
		super('blackjack', {
			aliases: ['blackjack'],
			description: {
				content: () => 'Type `h` to `hit` or type `s` to `stand`.\n\nType `${msg.util?.parsed?.prefix}blackjack join @${msg.author.username}` to join a on-going game.\n\nJ, Q and K = 10       A = 11 or 1',
				usage: () => '',
				examples: () => ['join @Cosmzs'],
			},
			// userPermissions: (msg: Message) => {
			//	if (this.getInstance(msg.author)) return "You're already on a blackjack game.";
			//	else return null;
			// },
			clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
			category: 'fun',
			ratelimit: 2,
		});
	}

	private getInstance = (user: User) => this.instances.find(i => i.players.map((p: Player) => p.user.id).includes(user.id));

	private createDeck(): Array<Card> {
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
					value: this.values[i],
					suit: this.suits[x],
					weight,
				};
				deck.push(card);
			}
		}
		this.shuffle(deck);
		return deck;
	}

	private shuffle = (deck: Array<Card>): void => {
		for (let i = 0; i < 1000; i++) {
			const location1 = Math.floor(Math.random() * deck.length);
			const location2 = Math.floor(Math.random() * deck.length);
			const tmp = deck[location1];

			deck[location1] = deck[location2];
			deck[location2] = tmp;
		}
	};

	private createPlayer(author: User): Player {
		const hand: Array<Card> = [];
		const player: Player = {
			user: author,
			hand,
			status: PlayerStatus.DRAWING,
		};
		return player;
	}

	public dealHands(user: User): void {
		const instance = this.getInstance(user)!;
		for (const player of instance.players.values()) {
			if (!player.hand.length) {
				for (let i = 0; i < 2; i++) {
					const card = instance.deck.pop();
					player.hand.push(card!);
				}
			}
		}
	}

	private hit(user: User): void {
		const instance = this.getInstance(user)!;
		const card = instance.deck.pop();
		instance.players.find((p: Player) => p.user.id === user.id)!.hand.push(card!);
	}

	private updateEmbed(user: User): void {
		const instance = this.getInstance(user)!;
		const bot = instance.players.find((p: Player) => p.user.bot)!;
		const url = `https://discordapp.com/channels/${instance.channel.guild?.id ?? '@me'}/${instance.channel.id}`;

		instance.embed
			.setColor(COLORS.EMBED)
			.spliceFields(0, instance.embed.fields.length + 1, [])
			.setAuthor(`Cyborg, The Dealer`, bot?.user.displayAvatarURL())
			.setDescription(
				stripIndents`
				_\`${bot.status}\`_
				${bot.hand
					.map((c, i) => {
						if (!instance.ended && i !== 0) return `[**\`?\`**](${url})`;
						else return `[**\`${c.suit}${c.value}\`**](${url})`;
					})
					.join(' | ')}
					Total: ${instance.ended ? this.getScore(bot) : `[**\`?\`**](${url})`}
					`
			);

		for (const player of instance.players.filter((p: Player) => !p.user.bot).values()) {
			instance.embed.addField(
				player.user.username,
				stripIndents`
				_\`${player.status}\`_
				${player.hand.map((c: Card) => `[**\`${c.suit}${c.value}\`**](${url})`).join(' | ')}
					Total: ${this.getScore(player)}
					`,
				true
			);
		}
	}

	private getScore(player: Player): number {
		let playerScore = player.hand.reduce((a: number, b: Card) => a + b.weight, 0);
		const aces = player.hand.filter((c: Card) => c.value === 'A');
		if (!!aces.length) {
			for (const _ of aces.values()) {
				if (playerScore <= 21) continue;
				else playerScore -= 10;
			}
		}
		return playerScore;
	}

	private checkNatural = (player: Player): boolean => {
		const instance = this.getInstance(player.user)!;
		for (const player of instance.players) {
			if (this.getScore(player) === 21 && player.hand.length === 2) return true;
		}
		return false;
	};

	private check(user: User, { natural = false, phrase = '' }: { natural?: boolean; phrase?: string } = {}) {
		const instance = this.getInstance(user)!;
		const bot = instance.players.find((p: Player) => p.user.bot)!;
		const player = instance.players.find((p: Player) => p.user.id === user.id)!;
		const playerScore = this.getScore(player);
		let playerEnded: boolean = false;

		if (natural) {
			instance.ended = true;
		}

		if (this.getScore(player) > 21) {
			playerEnded = true;
			player.status = PlayerStatus.LOST;
			instance.ended = instance.players.filter((p: Player) => p.status !== PlayerStatus.DRAWING && !p.user.bot).length === instance.players.filter((p: Player) => !p.user.bot).length;
		}

		if (playerScore === 21 || phrase === 'stand') {
			playerEnded = true;
			player.status = PlayerStatus.STANDING;
			instance.ended = instance.players.filter((p: Player) => p.status !== PlayerStatus.DRAWING && !p.user.bot).length === instance.players.filter((p: Player) => !p.user.bot).length;
		}

		const botNatural = this.checkNatural(bot);
		const playerNatural = this.checkNatural(player);

		const result: { player: Player[] | null; natural: { h: boolean; p: boolean } } = {
			player: null,
			natural: { h: botNatural, p: playerNatural },
		};

		return instance.ended ? this.end(user, result) : playerEnded ? result : Flag.fail(phrase);
	}

	private end(
		user: User,
		result: {
			player: Player[] | null;
			natural: { h: boolean; p: boolean };
		}
	): { player: Player[] | null; natural: { h: boolean; p: boolean } } {
		const instance = this.getInstance(user)!;
		const bot = instance.players.find((p: Player) => p.user.bot)!;
		const player = instance.players.find((p: Player) => p.user.id === user.id)!;

		if (result.natural.p || result.natural.h) {
			this.setWinner(user, {
				players: instance.players.filter((p: Player) => this.getScore(p) === 21 && p.hand.length === 2),
				tie: instance.players.filter((p: Player) => this.getScore(p) === 21 && p.hand.length === 2).length > 1,
			});

			return (result = {
				player: instance.players.filter((p: Player) => this.getScore(p) === 21 && p.hand.length === 2),
				natural: result.natural,
			});
		}

		for (const card of instance.deck.reverse().values()) {
			if (this.getScore(bot) < 17) {
				bot.hand.push(card);
			}
		}

		const highestScore = instance.players
			.map((p: Player) => (this.getScore(p) <= 21 ? this.getScore(p) : 0))
			.sort((a, b) => a - b)
			.pop()!;

		const highestPlayers = instance.players
			.sort((p1: Player, p2: Player) => this.getScore(p1) - this.getScore(p2))
			.filter((p: Player, _, arr: Player[]) => {
				return this.getScore(p) === highestScore && this.getScore(p) <= 21;
			});

		this.setWinner(user, { players: highestPlayers, tie: highestPlayers.length > 1 });

		result = {
			...result,
			player: highestPlayers,
			natural: result.natural,
		};

		return result;
	}

	private setWinner(user: User, { players, tie }: { players: Player[]; tie: boolean }): void {
		const instance = this.getInstance(user)!;
		for (const player of instance.players) {
			if (players.some((p: Player) => player.user.id === p.user.id)) player.status = tie ? PlayerStatus.TIE : PlayerStatus.WON;
			else player.status = PlayerStatus.LOST;
		}
	}

	public *args(msg: Message) {
		const join: User | undefined = yield {
			type: Argument.compose([['join']], (msg: Message, _) => {
				return msg.util?.parsed?.content
					?.split(/ +/g)
					.map((str: string) => this.handler.resolver.type('user')(msg, str))
					.filter((u: User) => u?.id)
					.pop();
			}),
			match: 'phrase',
			default: undefined,
		};

		if (join) {
			const instance = this.getInstance(join)!;
			instance.players = [...instance.players, this.createPlayer(msg.author)];
		} else {
			this.instances.set(msg.author.id, {
				delete: () => this.instances.delete(msg.author.id),
				players: [this.createPlayer(this.client.user!), this.createPlayer(msg.author)],
				channel: msg.channel as TextChannel,
				deck: this.createDeck(),
				embed: new MessageEmbed(),
				ended: false,
			});
		}

		this.dealHands(msg.author);
		this.updateEmbed(msg.author);

		if (this.getInstance(msg.author)?.players.some((p: Player) => this.checkNatural(p))) {
			return this.check(msg.author, { natural: true });
		}

		const result: {
			player: Player[] | null;
			natural: { h: boolean; p: boolean };
		} = yield {
			type: Argument.compose(
				[
					['hit', 'h', 'draw', 'd'],
					['stand', 's', 'stay', 'leave', 'l', 'stop'],
				],
				(msg: Message, phrase: string) => {
					if (phrase === 'hit') this.hit(msg.author);

					this.updateEmbed(msg.author);

					return this.check(msg.author, { phrase });
				}
			),
			prompt: {
				time: 300000,
				retries: Infinity,
				start: {
					content: 'Type `h` to `hit` or `s` to `stand`.',
					embed: this.getInstance(msg.author)!.embed,
				},
				retry: {
					content: 'Type `h` to `hit` or `s` to `stand`.',
					embed: this.getInstance(msg.author)!.embed,
				},
			},
		};

		return result;
	}

	public exec(message: Message, { player, natural }: { player: Player[] | null; natural: { h: boolean; p: boolean } }) {
		const instance = this.getInstance(message.author)!;
		this.updateEmbed(message.author);

		let string: string = '';

		if (natural.h || natural.p) string = 'Blackjack! ';
		if (instance.ended && player?.length) string += `${player.map((p: Player) => p.user).join(' & ')} ${player.length > 1 ? 'tied' : 'won'} the game!`;
		else if (instance.ended) string += ` The game has ended.`;
		else string = 'Waiting for everyone to finish...';

		message.channel.send(string, {
			embed: instance.embed.setColor(!instance.ended ? COLORS.EMBED : '#e6101b'),
		});

		if (instance.ended) this.getInstance(message.author)?.delete();
	}
}