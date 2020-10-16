import { stripIndents } from 'common-tags';
import { Flag } from 'discord-akairo';
import { Command } from 'discord-akairo';
import { User } from 'discord.js';
import { MessageReaction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Snowflake } from 'discord.js';
import { Collection } from 'discord.js';
import { TextChannel } from 'discord.js';
import { Message } from 'discord.js';
import { COLORS } from '../../util/constants';

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
	channel: TextChannel;
	board: string[][];
	embed: MessageEmbed;
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
		let key = 0;
		for (let i = 0; i < 6; i++) {
			board[i] = [];
			for (let j = 0; j < 7; j++) {
				board[i].push(Symbol.EMPTY);
			}
		}
		return board;
	}

	private updateEmbed(msg: Message): void {
		const instance = this.getInstance(msg.author)!;
		instance.embed.setAuthor(`${Symbol.YELLOW} Connect 4 ${Symbol.RED}`).setColor(COLORS.EMBED).setDescription(stripIndents`
        ${instance.players
			.map((p: Player) => {
				if (p.turn) return `**${p.symbol}: ${p.user} <--️ turn**`;
				else return `${p.symbol}: ${p.user}...`;
			})
			.join('\n')}
        
        ${instance.board.map(line => line.map(col => col).join('')).join('\n')}
            ${this.columns.join('')}
            `);
	}

	private drop(reaction: MessageReaction): void {
		const instance = this.getInstance(reaction.users.cache.filter(u => !u.bot).first()!)!;
		const player = instance.players.find((p: Player) => p.turn)!;

		for (let i = instance.board.length - 1; i >= 0; i--) {
			const col = this.columns.indexOf(reaction.emoji.name);
			if (instance.board[i][col] === Symbol.EMPTY) {
				instance.board[i][col] = player.symbol;
				break;
			}
		}

		reaction.users.remove(player.user);
		instance.players.forEach((p: Player) => (p.turn = !p.turn));
	}

	private check4(one: string, two: string, three: string, four: string): string | null {
		const set = new Set([one, two, three, four]);
		return set.size === 1 ? Array.from(set.values())[0] : null;
	}

	private check(user: User): User | null {
		const instance = this.getInstance(user)!;
		const b = instance.board;
		const ayy =
			// first line
			this.check4(b[0][0], b[0][1], b[0][2], b[0][3]) ||
			this.check4(b[0][1], b[0][2], b[0][3], b[0][4]) ||
			this.check4(b[0][2], b[0][3], b[0][4], b[0][5]) ||
			this.check4(b[0][3], b[0][4], b[0][5], b[0][6]) ||
			// second line
			this.check4(b[1][0], b[1][1], b[1][2], b[1][3]) ||
			this.check4(b[1][1], b[1][2], b[1][3], b[1][4]) ||
			this.check4(b[1][2], b[1][3], b[1][4], b[1][5]) ||
			this.check4(b[1][3], b[1][4], b[1][5], b[1][6]) ||
			// third line
			this.check4(b[2][0], b[2][1], b[2][2], b[2][3]) ||
			this.check4(b[2][1], b[2][2], b[2][3], b[2][4]) ||
			this.check4(b[2][2], b[2][3], b[2][4], b[2][5]) ||
			this.check4(b[2][3], b[2][4], b[2][5], b[2][6]) ||
			// fourth line
			this.check4(b[3][0], b[3][1], b[3][2], b[3][3]) ||
			this.check4(b[3][1], b[3][2], b[3][3], b[3][4]) ||
			this.check4(b[3][2], b[3][3], b[3][4], b[3][5]) ||
			this.check4(b[3][3], b[3][4], b[3][5], b[3][6]) ||
			// fifth line
			this.check4(b[4][0], b[4][1], b[4][2], b[4][3]) ||
			this.check4(b[4][1], b[4][2], b[4][3], b[4][4]) ||
			this.check4(b[4][2], b[4][3], b[4][4], b[4][5]) ||
			this.check4(b[4][3], b[4][4], b[4][5], b[4][6]) ||
			// sixth line
			this.check4(b[5][0], b[5][1], b[5][2], b[5][3]) ||
			this.check4(b[5][1], b[5][2], b[5][3], b[5][4]) ||
			this.check4(b[5][2], b[5][3], b[5][4], b[5][5]) ||
			this.check4(b[5][3], b[5][4], b[5][5], b[5][6]) ||
			// first column
			this.check4(b[0][0], b[1][0], b[2][0], b[3][0]) ||
			this.check4(b[1][0], b[2][0], b[3][0], b[4][0]) ||
			this.check4(b[2][0], b[3][0], b[4][0], b[5][0]) ||
			// second column
			this.check4(b[0][1], b[1][1], b[2][1], b[3][1]) ||
			this.check4(b[1][1], b[2][1], b[3][1], b[4][1]) ||
			this.check4(b[2][1], b[3][1], b[4][1], b[5][1]) ||
			// third column
			this.check4(b[0][2], b[1][2], b[2][2], b[3][2]) ||
			this.check4(b[1][2], b[2][2], b[3][2], b[4][2]) ||
			this.check4(b[2][2], b[3][2], b[4][2], b[5][2]) ||
			// fourth column
			this.check4(b[0][3], b[1][3], b[2][3], b[3][3]) ||
			this.check4(b[1][3], b[2][3], b[3][3], b[4][3]) ||
			this.check4(b[2][3], b[3][3], b[4][3], b[5][3]) ||
			// fifth column
			this.check4(b[0][4], b[1][4], b[2][4], b[3][4]) ||
			this.check4(b[1][4], b[2][4], b[3][4], b[4][4]) ||
			this.check4(b[2][4], b[3][4], b[4][4], b[5][4]) ||
			// sixth column
			this.check4(b[0][5], b[1][5], b[2][5], b[3][5]) ||
			this.check4(b[1][5], b[2][5], b[3][5], b[4][5]) ||
			this.check4(b[2][5], b[3][5], b[4][5], b[5][5]) ||
			// seventh column
			this.check4(b[0][6], b[1][6], b[2][6], b[3][6]) ||
			this.check4(b[1][6], b[2][6], b[3][6], b[4][6]) ||
			this.check4(b[2][6], b[3][6], b[4][6], b[5][6]) ||
			// diagonals
			this.check4(b[2][0], b[3][1], b[4][2], b[5][3]) ||
			this.check4(b[2][1], b[3][2], b[4][3], b[5][4]) ||
			this.check4(b[1][0], b[2][1], b[3][2], b[4][3]) ||
			this.check4(b[2][2], b[3][3], b[4][4], b[5][5]) ||
			this.check4(b[1][1], b[2][2], b[3][3], b[4][4]) ||
			this.check4(b[0][0], b[1][1], b[2][2], b[3][3]) ||
			this.check4(b[2][3], b[3][4], b[4][5], b[5][6]) ||
			this.check4(b[1][2], b[2][3], b[3][4], b[4][5]) ||
			this.check4(b[0][1], b[1][2], b[2][3], b[3][4]) ||
			this.check4(b[1][3], b[2][4], b[3][5], b[4][6]) ||
			this.check4(b[0][2], b[1][3], b[2][4], b[3][5]) ||
			this.check4(b[0][3], b[1][4], b[2][5], b[3][6]) ||
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
				const embed = new MessageEmbed()
					.setColor(COLORS.EMBED)
					.setTitle(`${Symbol.YELLOW} Connect 4 ${Symbol.RED}`)
					.setDescription(`Esperando alguém se juntar...\n\nClique no ⚔️ para jogar contra ${msg.author}`);

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
						${msg.author} entrou no jogo como ${Symbol.RED}
						${user} entrou no jogo como ${Symbol.YELLOW}
						
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
					return instance.board[0][this.columns.indexOf(reaction.emoji.name)] === Symbol.EMPTY && this.columns.includes(reaction.emoji.name) && user.id === instance.players.find((p: Player) => p.turn)?.user.id;
				};

				for (let i = 0; i < 54; i++) {
					try {
						this.updateEmbed(msg);
						await msg.util?.send({ embed: instance.embed })!;
						const reaction = await reactionMessage?.awaitReactions(filter, { maxEmojis: 1, time: 30000, errors: ['time'] });
						this.drop(reaction.first()!);

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
				return 'empate';
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

		if (typeof winner === 'string') message.util?.send({ embed: instance.embed.setColor('#38667d').addField(`\u200b`, 'Empate!') });
		else message.util?.send({ embed: instance.embed.setColor('#06b814').addField(`\u200b`, `${winner} ganhou de ${instance.players.find((p: Player) => p.user.id !== winner.id)?.user}! 🥳🥳`) });

		instance.delete();
	}
}
