import { stripIndents } from 'common-tags';
import { COLORS } from '../../util/constants';
import { Flag, Command } from 'discord-akairo';
import { User, MessageReaction, MessageEmbed, Snowflake, Message, Collection } from 'discord.js';

enum Scores {
	YELLOW = -1,
	TIE,
	RED,
}

export enum Symbol {
	EMPTY = '▫️',
	RED = '🔴',
	YELLOW = '🟡',
}

export interface Player {
	user: User;
	turn: boolean;
	symbol: Symbol.RED | Symbol.YELLOW;
}
export interface GameInstance {
	delete(): boolean;
	players: Player[];
	board: Symbol[][];
	embed: MessageEmbed;
	hrDiff: [number, number];
	possibilities: number;
}

export default class ConnectFourCommand extends Command {
	private readonly columns = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];
	private instances: Collection<Snowflake, GameInstance> = new Collection();

	public constructor() {
		super('connectfour', {
			aliases: ['connectfour', 'cf', 'conectequatro', 'connect4'],
			description: {
				content: () =>
					`Reaja com o número lugar onde quer colocar seu ${Symbol.RED} ou ${Symbol.YELLOW}\n\nO objetivo do jogo é conseguir deixar 4 bolinhas da mesma cor em linha sem o oponente te interromper. Pode ser diagonal, horizontal e vertical.`,
				usage: () => '',
				examples: () => [''],
			},
			category: 'fun',
			ratelimit: 3,
		});
	}

	private getInstance = (user: User): GameInstance | undefined => {
		return this.instances.find(i => i.players.map((p: Player) => p.user.id).includes(user.id));
	};

	private createPlayer(user: User, second: boolean = false): Player {
		const player: Player = {
			user,
			turn: second ? false : true,
			symbol: second ? Symbol.RED : Symbol.YELLOW,
		};
		return player;
	}

	private createBoard(): GameInstance['board'] {
		const board: GameInstance['board'] = [];
		for (let i = 0; i < 6; i++) {
			board[i] = [];
			for (let j = 0; j < 7; j++) {
				board[i].push(Symbol.EMPTY);
			}
		}
		return board;
	}

	private updateEmbed(msg: Message, round: number = 0, finished: boolean = false): Promise<void> {
		const instance = this.getInstance(msg.author)!;
		instance.embed.setAuthor(`${Symbol.YELLOW} Connect 4 ${Symbol.RED}`).setColor(COLORS.EMBED).setDescription(stripIndents`
			${instance.players
				.map((p: Player) => {
					if (p.turn) return `${p.symbol}: ${p.user}${finished ? '' : ' **<--️ turn**'}`;
					else return `${p.symbol}: ${p.user}`;
				})
				.join('\n')}
			${finished ? '' : '\nColoque a bolinha e tente conectar 4 antes do seu oponente...\n'}
			${instance.board.map(line => line.map(col => col).join('')).join('\n')}
			${this.columns.slice(0, 7).join('')}`);
		if (round > 0) {
			instance.embed.setTitle(`Round ${round}`);
		}
		if (instance.possibilities !== 0) {
			instance.embed.setFooter(`${instance.possibilities} possibilities in ${instance.hrDiff[0] > 0 ? `${instance.hrDiff[0]}s ` : ''}${instance.hrDiff[1] / 1000000}ms`);
		}
		instance.possibilities = 0;
		instance.hrDiff = [0, 0];

		return Promise.resolve();
	}

	isValidLocation(board: string[][], reaction: string): { row: number; col: number } | null {
		for (let i = board.length - 1; i >= 0; i--) {
			const col = this.columns.indexOf(reaction);
			if (board[i][col] === Symbol.EMPTY) {
				return { row: i, col };
			}
		}

		return null;
	}

	allValidMoves(board: Symbol[][]): { row: number; col: number }[] {
		const validMoves = [];
		for (let i = 0; i < this.columns.length; i++) {
			if (this.isValidLocation(board, this.columns[i])) validMoves.push(this.isValidLocation(board, this.columns[i])!);
		}

		return validMoves;
	}

	bestMove(player: Player, depth: number): string {
		const instance = this.getInstance(player.user)!;
		let board = instance.board.map(e => e);
		let bestScore: number = -Infinity;
		let moves: { score: number; row: number; col: number }[] = [];
		let bestMove: { row: number; col: number } = { row: 0, col: 0 };

		const validMoves = this.allValidMoves(board);

		for (const { row, col } of validMoves) {
			let oldSymbol: Symbol = board[row][col];
			board[row][col] = Symbol.RED;
			let score = this.minimax(board, depth, Symbol.YELLOW, player);

			board[row][col] = oldSymbol;
			moves.push({ score, row, col });
			if (score > bestScore) {
				bestScore = score;
				bestMove = { row, col };
			}
		}

		if (moves.filter(m => m.score === bestScore).length === moves.length && moves[0].score === 0) {
			const rand = Math.floor(Math.random() * moves.filter(m => m.score === bestScore).length);
			bestMove = { row: moves[rand].row, col: moves[rand].col };
		}
		return this.columns[bestMove.col];
	}

	minimax(board: Symbol[][], depth: number, playing: Symbol, player: Player): number {
		if (this.check(player.user, board) != null || depth === 0) {
			this.getInstance(player.user)!.possibilities++;
			const mark = this.check(player.user, board)?.mark!;
			if (mark === Symbol.YELLOW) return Scores.YELLOW;
			else if (mark === Symbol.RED) return Scores.RED;
			else return Scores.TIE;
		}

		if (playing == Symbol.RED) {
			let bestScore: number = -Infinity;
			const validMoves = this.allValidMoves(board);
			for (const { row, col } of validMoves) {
				const oldSymbol: Symbol = board[row][col];
				board[row][col] = Symbol.RED;
				let score = this.minimax(board, depth - 1, Symbol.YELLOW, player);
				board[row][col] = oldSymbol;
				if (score > bestScore) {
					bestScore = score;
				}
			}
			return bestScore;
		} else if (playing == Symbol.YELLOW) {
			let bestScore: number = Infinity;
			const validMoves = this.allValidMoves(board);
			for (const { row, col } of validMoves) {
				const oldSymbol: Symbol = board[row][col];
				board[row][col] = Symbol.YELLOW;
				let score = this.minimax(board, depth - 1, Symbol.RED, player);
				board[row][col] = oldSymbol;
				if (score < bestScore) {
					bestScore = score;
				}
			}
			return bestScore;
		}
		return 0;
	}

	private drop(player: Player, reaction: string): void {
		const instance = this.getInstance(player.user)!;

		for (let i = instance.board.length - 1; i >= 0; i--) {
			const col = this.columns.indexOf(reaction);
			if (instance.board[i][col] === Symbol.EMPTY) {
				instance.board[i][col] = player.symbol;
				break;
			}
		}

		instance.players.forEach((p: Player) => (p.turn = !p.turn));
	}

	private check(user: User, b: string[][]): { user: User | null; mark: string } | null {
		const instance = this.getInstance(user)!;

		const conditions = [
			[b[5][3], b[4][4], b[3][5], b[2][6]],
			[b[5][2], b[4][3], b[3][4], b[2][5]],
			[b[4][3], b[3][4], b[2][5], b[1][6]],
			[b[5][1], b[4][2], b[3][3], b[2][4]],
			[b[4][2], b[3][3], b[2][4], b[1][5]],
			[b[3][3], b[2][4], b[1][5], b[0][6]],
			[b[5][0], b[4][1], b[3][2], b[2][3]],
			[b[4][1], b[3][2], b[2][3], b[1][4]],
			[b[3][2], b[2][3], b[1][4], b[0][5]],
			[b[4][0], b[3][1], b[2][2], b[1][3]],
			[b[0][2], b[0][3], b[0][4], b[0][5]],
			[b[0][3], b[0][4], b[0][5], b[0][6]],
			[b[1][2], b[1][3], b[1][4], b[1][5]],
			[b[1][3], b[1][4], b[1][5], b[1][6]],
			[b[2][2], b[2][3], b[2][4], b[2][5]],
			[b[2][3], b[2][4], b[2][5], b[2][6]],
			[b[3][2], b[3][3], b[3][4], b[3][5]],
			[b[3][3], b[3][4], b[3][5], b[3][6]],
			[b[4][0], b[4][1], b[4][2], b[4][3]],
			[b[4][1], b[4][2], b[4][3], b[4][4]],
			[b[4][2], b[4][3], b[4][4], b[4][5]],
			[b[4][3], b[4][4], b[4][5], b[4][6]],
			[b[5][0], b[5][1], b[5][2], b[5][3]],
			[b[5][1], b[5][2], b[5][3], b[5][4]],
			[b[5][2], b[5][3], b[5][4], b[5][5]],
			[b[5][3], b[5][4], b[5][5], b[5][6]],
			[b[1][0], b[2][0], b[3][0], b[4][0]],
			[b[2][0], b[3][0], b[4][0], b[5][0]],
			[b[1][1], b[2][1], b[3][1], b[4][1]],
			[b[2][1], b[3][1], b[4][1], b[5][1]],
			[b[1][2], b[2][2], b[3][2], b[4][2]],
			[b[2][2], b[3][2], b[4][2], b[5][2]],
			[b[1][3], b[2][3], b[3][3], b[4][3]],
			[b[2][3], b[3][3], b[4][3], b[5][3]],
			[b[1][4], b[2][4], b[3][4], b[4][4]],
			[b[2][4], b[3][4], b[4][4], b[5][4]],
			[b[0][5], b[1][5], b[2][5], b[3][5]],
			[b[1][5], b[2][5], b[3][5], b[4][5]],
			[b[2][5], b[3][5], b[4][5], b[5][5]],
			[b[0][6], b[1][6], b[2][6], b[3][6]],
			[b[1][6], b[2][6], b[3][6], b[4][6]],
			[b[2][6], b[3][6], b[4][6], b[5][6]],
			[b[2][0], b[3][1], b[4][2], b[5][3]],
			[b[2][1], b[3][2], b[4][3], b[5][4]],
			[b[1][0], b[2][1], b[3][2], b[4][3]],
			[b[2][2], b[3][3], b[4][4], b[5][5]],
			[b[1][1], b[2][2], b[3][3], b[4][4]],
			[b[2][3], b[3][4], b[4][5], b[5][6]],
			[b[1][2], b[2][3], b[3][4], b[4][5]],
			[b[1][3], b[2][4], b[3][5], b[4][6]],
			[b[0][2], b[1][3], b[2][4], b[3][5]],
			[b[0][3], b[1][4], b[2][5], b[3][6]],
			[b[0][0], b[1][1], b[2][2], b[3][3]],
			[b[0][1], b[1][2], b[2][3], b[3][4]],
			[b[3][1], b[2][2], b[1][3], b[0][4]],
			[b[3][0], b[2][1], b[1][2], b[0][3]],
			[b[0][0], b[0][1], b[0][2], b[0][3]],
			[b[0][1], b[0][2], b[0][3], b[0][4]],
			[b[1][0], b[1][1], b[1][2], b[1][3]],
			[b[1][1], b[1][2], b[1][3], b[1][4]],
			[b[2][0], b[2][1], b[2][2], b[2][3]],
			[b[2][1], b[2][2], b[2][3], b[2][4]],
			[b[3][0], b[3][1], b[3][2], b[3][3]],
			[b[3][1], b[3][2], b[3][3], b[3][4]],
			[b[0][0], b[1][0], b[2][0], b[3][0]],
			[b[0][1], b[1][1], b[2][1], b[3][1]],
			[b[0][2], b[1][2], b[2][2], b[3][2]],
			[b[0][3], b[1][3], b[2][3], b[3][3]],
			[b[0][4], b[1][4], b[2][4], b[3][4]],
		];

		for (const win of conditions) {
			if (win[0] === Symbol.EMPTY) continue;
			if (win[0] === win[1] && win[0] === win[2] && win[0] === win[3]) {
				return {
					user: instance.players.find((p: Player) => p.symbol === win[0])?.user!,
					mark: win[0],
				};
			}
		}

		let tie: number = 0;
		for (let i = 0; i < b.length; i++) {
			for (let j = 0; j < b[i].length; j++) {
				if (b[i][j] === Symbol.EMPTY) tie++;
			}
		}

		if (tie === 0) return { user: null, mark: 'TIE' };
		return null;
	}

	public *args(msg: Message) {
		this.instances.set(msg.author.id, {
			delete: () => this.instances.delete(msg.author.id),
			players: [this.createPlayer(msg.author)],
			embed: new MessageEmbed(),
			board: this.createBoard(),
			hrDiff: [0, 0],
			possibilities: 0,
		});

		yield {
			type: async (msg: Message) => {
				const instance = this.instances.get(msg.author.id)!;
				const embed = new MessageEmbed().setColor(COLORS.EMBED).setTitle(`${Symbol.YELLOW} Connect 4 ${Symbol.RED}`).setDescription(stripIndents`
					Esperando alguém se juntar...
					
					Clique no ⚔️ para jogar contra ${msg.author}
	
					Ou clique no 🤖 para jogar contra o bot (${this.client.user})
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

					const reaction = await instanceMessage?.awaitReactions(filter, { maxEmojis: 1, time: 300000, errors: ['time'] });

					let user: User;

					if (reaction.first()?.emoji.name === '🤖') {
						user = this.client.user!;
					} else if (reaction.first()?.emoji.name === '⚔️') {
						user = reaction.first()?.users.cache.find((u: User) => !u.bot && u.id !== msg.author.id)!;
					}

					instance.players.push(this.createPlayer(user!, true));

					await instanceMessage.reactions.removeAll();

					if (Math.random() < 0.5) instance.players.forEach((p: Player) => (p.turn = !p.turn));

					msg.util?.send({
						embed: embed.setDescription(stripIndents`
						${msg.author} entrou no jogo como ${Symbol.YELLOW}
						${user!} entrou no jogo como ${Symbol.RED}

						${instance.players.filter((p: Player) => p.turn).map((p: Player) => `${p.symbol} começa jogando!`)}
						
						${this.client.emojis.cache.get('709533456866213930')} Carregando...
						`),
					});

					for (const emoji of this.columns) await instanceMessage.react(emoji);
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
					return Boolean(this.isValidLocation(instance.board, reaction.emoji.name)) && this.columns.includes(reaction.emoji.name) && user.id === instance.players.find((p: Player) => p.turn)?.user.id;
				};

				for (let i = 0; i < 45; i++) {
					try {
						await this.updateEmbed(msg, i + 1);
						await msg.util?.send({ embed: instance.embed })!;

						const player = instance.players.find((p: Player) => p.turn)!;

						let depth: number = Infinity;
						if (i < 14) depth = 6;
						else if (i < 28) depth = 7;

						let reaction: string;
						if (player.user.id === this.client.user!.id) {
							const hrStart = process.hrtime();
							reaction = this.bestMove(player, depth);
							instance.hrDiff = process.hrtime(hrStart);
						} else {
							const reacted = await reactionMessage?.awaitReactions(filter, { maxEmojis: 1, time: 300000, errors: ['time'] });
							reaction = reacted.first()!.emoji.name;
						}

						this.drop(player, reaction);

						if (this.check(msg.author, instance.board) != null) {
							return this.check(msg.author, instance.board)!.user ?? 'TIE';
						} else Flag.fail('...');
					} catch (error) {
						msg.util?.send({ embed: instance.embed.setDescription(`Jogadores demoraram muito para escolher...\n\nO jogo foi cancelado.`) }).then(msg => msg.reactions.removeAll());
						return Flag.cancel();
					}
				}
				return 'tie';
			},
		};

		return { winner };
	}

	public async exec(message: Message, { winner }: { winner: User | string }) {
		const instance = this.getInstance(message.author)!;

		await this.updateEmbed(message, -1, true);

		if (typeof winner === 'string')
			message.util
				?.send({
					embed: instance.embed.setColor('#38667d').addField(`\u200b`, 'Empate!').setFooter('').setTitle(''),
				})
				.then(msg => msg.reactions.removeAll());
		else
			message.util
				?.send({
					embed: instance.embed
						.setColor(winner.bot ? '#f01343' : '#06b814')
						.addField(`\u200b`, `**🎊 ${winner} venceu a partida!!! 🥳🎉**\nNão foi dessa vez, ${instance.players.find((p: Player) => p.user.id !== winner.id)?.user}...`)
						.setFooter('')
						.setTitle(''),
				})
				.then(msg => msg.reactions.removeAll());

		instance.delete();
	}
}
