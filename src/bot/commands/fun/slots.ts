import { Flag, Command } from 'discord-akairo';
import { MessageReaction, Message, User, Collection, MessageEmbed, Snowflake, Permissions } from 'discord.js';
import { COLORS } from '../../util/constants';

export enum SlotsIcons {
	SPINING = '<a:SPINING:765334104870617088>',
	DIAMOND = '💠',
	BELL = '🔔',
	CHERRY = '🍒',
	LEMON = '🍋',
	GRAPE = '🍇',
}

export interface GameInstance {
	delete(): boolean;
	embed: MessageEmbed;
	result: Array<SlotsIcons>;
}

export default class SlotsCommand extends Command {
	private instances: Collection<Snowflake, GameInstance> = new Collection();
	public constructor() {
		super('slots', {
			aliases: ['slotmachine', 'slots'],
			clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
			category: 'fun',
			ratelimit: 2,
		});
	}

	private randomEnumValue = (enumeration: any, filter: string): SlotsIcons => {
		const values = Object.keys(enumeration)
			.map((key: any) => enumeration[key])
			.filter((value: any) => typeof enumeration[value] !== 'number' && value !== filter);
		return values[Math.floor(Math.random() * values.length)] as SlotsIcons;
	};

	public *args(msg: Message) {
		this.instances.set(msg.author.id, {
			delete: () => this.instances.delete(msg.author.id),
			embed: new MessageEmbed(),
			result: [SlotsIcons.SPINING, SlotsIcons.SPINING, SlotsIcons.SPINING],
		});

		const lever = yield {
			type: async (msg: Message, phrase: string) => {
				const instance = this.instances.get(msg.author.id)!;
				const filter = (reaction: MessageReaction, user: User) => {
					return reaction.emoji.name === '🕹️' && user.id === msg.author.id;
				};
				instance.embed = new MessageEmbed()
					.setAuthor('Slot Machine', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/slot-machine_1f3b0.png')
					.setColor(COLORS.EMBED)
					.setDescription('> ' + instance.result.join(' '));
				let reactionMessage: Message;
				try {
					reactionMessage = await msg.util?.send({ embed: instance.embed })!;
					await reactionMessage?.react('🕹️');
					const reaction = await reactionMessage?.awaitReactions(filter, { maxEmojis: 1, time: 30000, errors: ['time'] });
					await reactionMessage!.reactions.removeAll();
					return reaction?.first() || Flag.cancel();
				} catch (error) {
					await reactionMessage!.reactions.removeAll();
					return Flag.cancel();
				}
			},
		};

		return true;
	}

	public async exec(message: Message) {
		const instance = this.instances.get(message.author.id)!;

		for (let i = 0; i < instance?.result.length; i++) {
			instance.result[i] = this.randomEnumValue(SlotsIcons, SlotsIcons.SPINING);
			await message.util?.send({ embed: instance.embed.setDescription('> ' + instance.result.join(' ')) });
			await new Promise(res => setTimeout(res, Math.floor(Math.random() * (2500 - 1000) + 1000)));
		}

		instance.delete();
	}
}
