import { stripIndents } from 'common-tags';
import { Command, Flag } from 'discord-akairo';
import { Collection, Message, MessageEmbed, MessageReaction, Snowflake, TextChannel, User, Permissions } from 'discord.js';
import { COLORS } from '../../util/constants';

export enum Symbol {
	O = '⭕',
	X = '❌',
}

export interface Player {
	user: User;
	turn: boolean;
	symbol: Symbol.O | Symbol.X;
}

export interface GameInstance {
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
			aliases: ['ttt', 'velha', 'tictactoe', 'jogodavelha'],
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

	private updateEmbed(msg: Message) {
		const instance = this.getInstance(msg.author)!;
		instance.embed.setAuthor('Jogo da Velha').setColor(COLORS.EMBED).setDescription(stripIndents`
				${instance.players
					.map((p: Player) => {
						if (p.turn) return `**${p.symbol}: ${p.user} <-- \✏️**`;
						else return `${p.symbol}: ${p.user}...`;
					})
					.join('\n')}

				${instance.board.map(sq => sq.map(s => s).join('')).join('\n')}
				`);
	}

	private turn(reaction: MessageReaction): void {
		const instance = this.getInstance(reaction.users.cache.filter(u => !u.bot).first()!)!;
		const player = instance.players.find((p: Player) => p.turn)!;

		instance.board = instance.board.map(square => square.map(s => (s === reaction.emoji.name ? player.symbol : s))!)!;
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

		return instance.players.find((p: Player) => p.symbol === ayy)?.user || null;
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
				const embed = new MessageEmbed().setColor(COLORS.EMBED).setTitle('Jogo da Velha').setDescription(`Esperando alguém se juntar...\n\nClique no ⚔️ para jogar contra ${msg.author}`);

				const filter = (reaction: MessageReaction, user: User) => {
					return reaction.emoji.name === '⚔️' && user.id !== msg.author.id && !user.bot;
				};

				try {
					let instanceMessage: Message = await msg.util?.send({ embed })!;
					await instanceMessage.react('⚔️');

					const reaction = await instanceMessage?.awaitReactions(filter, { maxEmojis: 1, time: 30000, errors: ['time'] });
					const user = reaction.first()?.users.cache.find((u: User) => !u.bot && u.id !== msg.author.id);
					instance.players.push(this.createPlayer(user!, true));
					reaction.first()?.remove();
					msg.util?.send({
						embed: embed.setDescription(stripIndents`
						${msg.author} entrou no jogo como ${Symbol.X}
						${user} entrou no jogo como ${Symbol.O}
						
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
					return instance.board.some(l => l.some(c => c.includes(reaction.emoji.name))) && this.emojis.includes(reaction.emoji.name) && user.id === instance.players.find((p: Player) => p.turn)?.user.id;
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
						msg.util?.send({ embed: instance.embed.setDescription(`Jogadores demoraram muito para escolher...\n\nO jogo foi cancelado.`) });
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
		const instance = this.getInstance(message.author)!;

		if (typeof winner === 'string') message.util?.send({ embed: instance.embed.setColor('#38667d').addField(`\u200b`, 'Deu velha!') });
		else message.util?.send({ embed: instance.embed.setColor('#06b814').addField(`\u200b`, `${winner} ganhou de ${instance.players.find((p: Player) => p.user.id !== winner.id)?.user}! 🥳🥳`) });

		instance.delete();
	}
}
