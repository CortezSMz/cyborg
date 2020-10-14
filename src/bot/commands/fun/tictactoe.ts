import { Flag, Command, Argument, PrefixSupplier } from 'discord-akairo';
import { Message, MessageEmbed, Snowflake, TextChannel, User, Collection, MessageReaction } from 'discord.js';
import { COLORS } from '../../util/constants';

export enum mark {
	O = '⭕',
	X = '❌',
}

export interface Player {
	user: User;
	turn: boolean;
	mark: mark;
}

export interface GameInstance {
	code: string;
	delete(): boolean;
	players: Array<Player>;
	channel: TextChannel;
	board: string[][];
	embed: MessageEmbed;
}

export default class TicTacToeCommand extends Command {
	private readonly cleanBoard: { [key: string]: string } = {
		1: '1️⃣',
		2: '2️⃣',
		3: '3️⃣',
		4: '4️⃣',
		5: '5️⃣',
		6: '6️⃣',
		7: '7️⃣',
		8: '8️⃣',
		9: '9️⃣',
	};
	private instances: Collection<Snowflake, GameInstance> = new Collection();
	private constructor() {
		super('tictactoe', {
			aliases: ['jogodavelha', 'ttt', 'velha', 'tictactoe'],
			description: {
				content: (msg: Message) => `Reaja com o número do emoji onde quer colocar seu :x: ou :o:`,
				usage: () => '',
				examples: () => ['join CODIGO'],
			},
			userPermissions: (msg: Message) => {
				if (this.getInstance(msg.author)) this.getInstance(msg.author)?.delete();
			},
			channel: 'guild',
		});
	}

	private getInstance = (user: User | string): GameInstance | undefined => {
		if (typeof user === 'string') return this.instances.find(i => i.code.toLocaleLowerCase() === user.toLocaleLowerCase());
		return this.instances.find(i => i.players.map((p: Player) => p.user.id).includes(user.id));
	};

	private createID(): string {
		var uuid = 'xxxxxx'.replace(/[x]/g, () => {
			const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			return alphabet[Math.floor(Math.random() * alphabet.length)];
		});
		return this.instances.some(i => i.code === uuid) ? this.createID() : uuid;
	}

	private createPlayer(user: User, { code }: { code?: string } = {}): Player {
		const instance = this.getInstance(code ?? user);
		const player: Player = {
			user,
			turn: !!instance ? false : true,
			mark: !!instance ? mark['O'] : mark['X'],
		};
		return player;
	}

	private createBoard(): GameInstance['board'] {
		const board: GameInstance['board'] = [];
		let key = 1;
		for (let i = 0; i < 3; i++) {
			board[i] = [];
			for (let j = 0; j < 3; j++) {
				board[i].push(`${this.cleanBoard[key++]}`);
			}
		}
		return board;
	}

	private updateEmbed(msg: Message) {
		const instance = this.getInstance(msg.author)!;
		const turn = instance.players.find((p: Player) => p.turn)!;
		instance.embed
			.setAuthor('Vez do ' + turn.user.username, turn.user.displayAvatarURL())
			.setColor(COLORS.EMBED)
			.setDescription(instance.board.map(sq => sq.map(s => s).join('')).join('\n'));
		if (instance.players.length === 1) instance.embed.setFooter(`${(this.handler.prefix as PrefixSupplier)(msg)}jogodavelha juntar ${instance.code}`);
		else instance.embed.setFooter('');
	}

	private turn(reaction: MessageReaction): void {
		const instance = this.getInstance(reaction.users.cache.filter(u => !u.bot).first()!)!;
		const player = instance.players.find((p: Player) => p.turn)!;

		instance.board = instance.board.map(square => square.map(s => (s === reaction.emoji.name ? player.mark : s))!)!;
		instance.players.forEach((p: Player) => (p.turn = !p.turn));
	}

	private checkRow(first: string, second: string, third: string): string | null {
		const set = new Set([first, second, third]);
		return set.size === 1 ? Array.from(set.values())[0] : null;
	}

	private check(user: User): User | null {
		const instance = this.getInstance(user)!;
		const ayy =
			this.checkRow(instance.board[0][0], instance.board[0][1], instance.board[0][2]) ||
			this.checkRow(instance.board[1][0], instance.board[1][1], instance.board[1][2]) ||
			this.checkRow(instance.board[2][0], instance.board[2][1], instance.board[2][2]) ||
			this.checkRow(instance.board[0][0], instance.board[1][0], instance.board[2][0]) ||
			this.checkRow(instance.board[0][1], instance.board[1][1], instance.board[2][1]) ||
			this.checkRow(instance.board[0][2], instance.board[1][2], instance.board[2][2]) ||
			this.checkRow(instance.board[0][0], instance.board[1][1], instance.board[2][2]) ||
			this.checkRow(instance.board[0][2], instance.board[1][1], instance.board[2][0]) ||
			null;

		return instance.players.find((p: Player) => p.mark === ayy)?.user || null;
	}

	public *args(msg: Message) {
		const join: GameInstance | undefined = yield {
			type: Argument.compose([['join', 'juntar']], (msg: Message) => {
				const code = msg.util?.parsed?.content?.split(/ +/g).find((str: string) => this.getInstance(str));
				return this.getInstance(code!) || Flag.cancel();
			}),
			match: 'phrase',
			default: undefined,
		};

		if (!!join) {
			if (join.players.length === 1) {
				join.players.push(this.createPlayer(msg.author, { code: join.code }));
				msg.delete();
				msg.channel.send(`${msg.author} juntou-se ao jogo do ${join.players[0].user}...`).then(msg => msg.delete({ timeout: 1500 }));
				return Flag.cancel();
			} else {
				msg.util?.send('Muitos players nesse jogo...').then(msg => msg.delete({ timeout: 1500 }));
				return Flag.cancel();
			}
		} else {
			this.instances.set(msg.author.id, {
				code: this.createID(),
				delete: () => this.instances.delete(msg.author.id),
				players: [this.createPlayer(msg.author)],
				channel: msg.channel as TextChannel,
				embed: new MessageEmbed(),
				board: this.createBoard(),
			});
		}

		this.updateEmbed(msg);

		const winner: User = yield {
			type: async (msg: Message) => {
				const instance = this.instances.get(msg.author.id)!;
				const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
				let reactionMessage: Message = await msg.util?.send({ embed: instance.embed })!;
				for (const emoji of emojis) {
					await reactionMessage.react(emoji);
				}

				const filter = (reaction: MessageReaction, user: User) => {
					return emojis.includes(reaction.emoji.name) && user.id === instance.players.find((p: Player) => p.turn)?.user.id;
				};

				for (let i = 0; i < 9; i++) {
					try {
						this.updateEmbed(msg);
						await msg.util?.send({ embed: instance.embed })!;
						const reaction = await reactionMessage?.awaitReactions(filter, { maxEmojis: 1, time: 30000, errors: ['time'] });
						this.turn(reaction.first()!);

						if (this.check(msg.author)) {
							this.updateEmbed(msg);
							await msg.util?.send({ embed: instance.embed })!;
							await reactionMessage.reactions.removeAll();
							return this.check(msg.author);
						} else Flag.fail('...');
					} catch (error) {
						reactionMessage.reactions.removeAll();
						return Flag.cancel();
					}
				}
				this.updateEmbed(msg);
				await reactionMessage.reactions.removeAll();
				return 'velha';
			},
			prompt: {
				time: 300000,
				retries: 10,
				start: {
					embed: this.getInstance(msg.author)!.embed,
				},
				retry: {
					embed: this.getInstance(msg.author)!.embed,
				},
			},
		};

		return { winner };
	}

	public exec(message: Message, { winner }: { winner: User | string }) {
		message.util?.message.reactions.removeAll();
		this.getInstance(message.author)?.delete();

		if (typeof winner === 'string') return message.channel.send('Deu velha!');
		else return message.channel.send(`${winner} ganhou o jogo yay 🥳`);
	}
}
