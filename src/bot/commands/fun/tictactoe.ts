import { stripIndents } from 'common-tags';
import { Command, Flag } from 'discord-akairo';
import { Collection, Message, MessageEmbed, MessageReaction, Snowflake, TextChannel, User, Permissions } from 'discord.js';
import { COLORS } from '../../util/constants';

interface SCORES {
	[index: string]: number;
}

const Scores: SCORES = {
	O: 1,
	TIE: 0,
	X: -1,
};

enum Symbol {
	O = '⭕',
	X = '❌',
}

interface Player {
	user: User;
	turn: boolean;
	symbol: Symbol.O | Symbol.X;
}

interface GameInstance {
	delete(): boolean;
	players: Array<Player>;
	channel: TextChannel;
	board: string[][];
	embed: MessageEmbed;
}

export default class TicTacToeCommand extends Command {
	private readonly emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
	private instances: Collection<Snowflake, GameInstance> = new Collection();
	private constructor() {
		super('tictactoe', {
			aliases: ['tictactoe', 'ttt', 'jogodavelha', 'velha'],
			description: {
				content: () => `Reaja com o número lugar onde quer colocar seu ${Symbol.O} ou ${Symbol.X}`,
				usage: () => '',
				examples: () => [''],
			},
			userPermissions: (msg: Message) => {
				if (this.getInstance(msg.author)) this.getInstance(msg.author)?.delete();
			},
			channel: 'guild',
			clientPermissions: [Permissions.FLAGS.MANAGE_MESSAGES],
			category: 'fun',
			ratelimit: 2,
		});
	}

	private getInstance = (user: User): GameInstance | undefined => {
		return this.instances.find(i => i.players.map((p: Player) => p.user.id).includes(user.id));
	};

	private createPlayer(user: User, second: boolean = false): Player {
		const player: Player = {
			user,
			turn: second ? false : true,
			symbol: second ? Symbol.O : Symbol.X,
		};

		return player;
	}

	private createBoard(): GameInstance['board'] {
		const board: GameInstance['board'] = [];
		let key = 0;
		for (let i = 0; i < 3; i++) {
			board[i] = [];
			for (let j = 0; j < 3; j++) {
				board[i].push(`${this.emojis[key++]}`);
			}
		}
		return board;
	}

	private updateEmbed(msg: Message, finished: boolean = false) {
		const instance = this.getInstance(msg.author)!;
		instance.embed.setAuthor(`${Symbol.X} Jogo da Velha ${Symbol.O}`).setColor(COLORS.EMBED).setDescription(stripIndents`
			${instance.players
				.map((p: Player) => {
					if (p.turn) return `${p.symbol}: ${p.user}${finished ? '' : '**<--**'}`;
					else return `${p.symbol}: ${p.user}`;
				})
				.join('\n')}

			${instance.board.map(sq => sq.map(s => s).join('')).join('\n')}`);
	}

	async bestMove(player: Player): Promise<string> {
		const instance = this.getInstance(player.user)!;
		let board = instance.board;
		let bestScore: number = -Infinity;
		let move: { i: number; j: number } = { i: 0, j: 0 };

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] !== Symbol.O && board[i][j] !== Symbol.X) {
					let oldSymbol: string = board[i][j];
					board[i][j] = Symbol.O;
					let score = this.minimax(board, 0, false, player);
					board[i][j] = oldSymbol;
					if (score > bestScore) {
						bestScore = score;
						move = { i, j };
					}
				}
			}
		}

		return Promise.resolve(instance.board[move.i][move.j]);
	}

	minimax(board: string[][], depth: number, isMaximizing: boolean, player: Player): number {
		if (this.check(player.user, board)) {
			return Scores[this.check(player.user, board)?.mark ?? 'TIE'];
		}

		if (isMaximizing) {
			let bestScore: number = -Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (board[i][j] !== Symbol.O && board[i][j] !== Symbol.X) {
						let oldSymbol: string = board[i][j];
						board[i][j] = Symbol.O;
						let score = this.minimax(board, depth + 1, false, player);
						board[i][j] = oldSymbol;
						bestScore = Math.max(score, bestScore);
					}
				}
			}
			return bestScore;
		} else {
			let bestScore: number = Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (board[i][j] !== Symbol.O && board[i][j] !== Symbol.X) {
						let oldSymbol: string = board[i][j];
						board[i][j] = Symbol.X;
						let score = this.minimax(board, depth + 1, true, player);
						board[i][j] = oldSymbol;
						bestScore = Math.min(score, bestScore);
					}
				}
			}
			return bestScore;
		}
	}

	private turn(reaction: string, player: Player): Promise<boolean> {
		const instance = this.getInstance(player.user)!;

		instance.board = instance.board.map(square => square.map(s => (s === reaction ? player.symbol : s)));
		instance.players.forEach((p: Player) => (p.turn = !p.turn));

		return Promise.resolve(true);
	}

	private check(user: User, b: string[][]): { user: User; mark: string } | null {
		const instance = this.getInstance(user)!;
		const conditions = [
			[b[0][0], b[0][1], b[0][2]],
			[b[1][0], b[1][1], b[1][2]],
			[b[2][0], b[2][1], b[2][2]],
			[b[0][0], b[1][0], b[2][0]],
			[b[0][1], b[1][1], b[2][1]],
			[b[0][2], b[1][2], b[2][2]],
			[b[0][0], b[1][1], b[2][2]],
			[b[0][2], b[1][1], b[2][0]],
		];

		for (const win of conditions) {
			if (win[0] !== Symbol.X && win[0] !== Symbol.O) continue;
			if (win[0] === win[1] && win[0] === win[2]) {
				return {
					user: instance.players.find((p: Player) => p.symbol === win[0])?.user!,
					mark: win[0] === Symbol.O ? 'O' : 'X',
				};
			}
		}
		return null;
	}

	public *args(msg: Message) {
		this.instances.set(msg.author.id, {
			delete: () => this.instances.delete(msg.author.id),
			players: [this.createPlayer(msg.author)],
			channel: msg.channel as TextChannel,
			embed: new MessageEmbed(),
			board: this.createBoard(),
		});

		yield {
			type: async (msg: Message) => {
				const instance = this.instances.get(msg.author.id)!;
				const embed = new MessageEmbed().setColor(COLORS.EMBED).setTitle('Jogo da Velha').setDescription(stripIndents`
				Esperando alguém se juntar...
				
				Clique no ⚔️ para jogar contra ${msg.author}

				Ou clique no 🤖 para jogar contra o bot (${this.client.user})
				||PS: bot configurado no modo \`HARD\`!!||
				`);

				const filter = (reaction: MessageReaction, user: User) => {
					if (reaction.emoji.name === '⚔️') return user.id !== msg.author.id && !user.bot;
					else if (reaction.emoji.name === '🤖') return user.id === msg.author.id && !user.bot;
					else return false;
				};

				try {
					let instanceMessage: Message = await msg.util?.send({ embed })!;
					await instanceMessage.react('⚔️');
					await instanceMessage.react('🤖');

					const reaction = await instanceMessage?.awaitReactions(filter, { maxEmojis: 1, time: 30000, errors: ['time'] });

					let user: User;

					if (reaction.first()?.emoji.name === '🤖') {
						user = this.client.user!;
					} else if (reaction.first()?.emoji.name === '⚔️') {
						user = reaction.first()?.users.cache.find((u: User) => !u.bot && u.id !== msg.author.id)!;
					}

					instance.players.push(this.createPlayer(user!, true));
					if (user!.bot) instance.players.forEach((p: Player) => (p.turn = !p.turn));

					await instanceMessage.reactions.removeAll();

					msg.util?.send({
						embed: embed.setDescription(stripIndents`
						${msg.author} entrou no jogo como ${Symbol.X}
						${user!} entrou no jogo como ${Symbol.O}
						
						${this.client.emojis.cache.get('709533456866213930')} Carregando...
						`),
					});

					for (const emoji of this.emojis) await instanceMessage.react(emoji);
				} catch (error) {
					msg.util?.send({ embed: embed.setDescription(`Ninguém entrou e o jogo foi cancelado.`) }).then(msg => msg.reactions.removeAll());
					return Flag.cancel();
				}
			},
			match: 'none',
		};

		this.updateEmbed(msg);

		const winner: User = yield {
			type: async (msg: Message) => {
				const instance = this.instances.get(msg.author.id)!;
				let reactionMessage: Message = await msg.util?.send({ embed: instance.embed })!;

				const filter = (reaction: MessageReaction, user: User) => {
					reaction.users.remove(user);
					return instance.board.some(l => l.some(c => c.includes(reaction.emoji.name))) && this.emojis.includes(reaction.emoji.name) && user.id === instance.players.find((p: Player) => p.turn)?.user.id;
				};

				for (let i = 0; i < 9; i++) {
					try {
						this.updateEmbed(msg);
						await msg.util?.send({ embed: instance.embed })!;

						const player = instance.players.find((p: Player) => p.turn)!;

						let reaction: string;
						if (player.user.id === this.client.user!.id) {
							reaction = await this.bestMove(player);
						} else {
							const reacted = await reactionMessage?.awaitReactions(filter, { maxEmojis: 1, time: 30000, errors: ['time'] });
							reaction = reacted.first()!.emoji.name;
						}

						await this.turn(reaction, player);

						if (this.check(msg.author, instance.board)) return this.check(msg.author, instance.board)?.user;
						else Flag.fail('...');
					} catch (error) {
						msg.util?.send({ embed: instance.embed.setDescription(`Jogadores demoraram muito para escolher...\n\nO jogo foi cancelado.`) }).then(msg => msg.reactions.removeAll());
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
		const instance = this.getInstance(message.author)!;

		this.updateEmbed(message, true);

		if (typeof winner === 'string')
			message.util
				?.send({
					embed: instance.embed.setColor('#38667d').addField(`\u200b`, 'Velha!'),
				})
				.then(msg => msg.reactions.removeAll());
		else
			message.util
				?.send({
					embed: instance.embed.setColor('#06b814').addField(`\u200b`, `**🎊 ${winner} venceu a partida!!! 🥳🎉**\nNão foi dessa vez, ${instance.players.find((p: Player) => p.user.id !== winner.id)?.user}...`),
				})
				.then(msg => msg.reactions.removeAll());

		instance.delete();
	}
}
