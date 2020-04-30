import ms from '../../util/timeParser';
import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../util/constants';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { RemindmesInsertInput } from '../../util/graphQLTypes';

export default class RemindmeCommand extends Command {
	public constructor() {
		super('remindme-del', {
			category: 'util',
			description: {
				content: MESSAGES.COMMANDS.UTIL.REMINDME.DESCRIPTION,
				usage: '<when> <text>',
				examples: [
					"1s i'm lonely",
					'15m call mom',
					'1h drink water',
					'1d do the dishes',
					'1w do the thing',
					'9mt 👶',
					'1y FeelsBirthdayMan',
					'5y3mt2w3d12h30m what am I doing with my life?',
				],
			},
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
			channel: 'guild',
			args: [
				{
					id: 'time',
					type: (_, str): number | null => {
						if (!str) return null;
						const time = ms(str);
						if (time && time >= 1000 && !isNaN(time)) return time;
						return null;
					},
					prompt: {
						start: (message: Message) => MESSAGES.COMMANDS.UTIL.REMINDME.PROMPT_TIME.START(message.author),
						retry: (message: Message) =>
							MESSAGES.COMMANDS.UTIL.REMINDME.PROMPT_TIME.RETRY(
								message.author,
								(this.handler.prefix as PrefixSupplier)(message)
							),
					},
				},
				{
					id: 'text',
					match: 'rest',
					type: 'string',
					prompt: {
						start: (message: Message) => MESSAGES.COMMANDS.UTIL.REMINDME.PROMPT_TEXT.START(message.author),
					},
				},
				{
					id: 'list',
					match: 'flag',
					flag: ['list', '--list'],
				},
			],
		});
	}

	public async exec(message: Message, { time, text, list }: { time: number; text: string; list: boolean }) {
		if (list) {
			const { data } = await graphQLClient.query<any, RemindmesInsertInput>({
				query: GRAPHQL.QUERY.REMINDMES_AUTHOR,
				variables: {
					author: message.author.id,
				},
			});
		}

		this.client.remindmeScheduler.add(
			{
				channel: message.channel.id,
				guild: message.guild!.id,
				message: message.id,
				author: message.author.id,
				text,
				createdAt: new Date().toISOString(),
			},
			time
		);
	}
}
