import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message } from 'discord.js';
import { LOCALE, SETTINGS } from '../../util/constants';

export default class TagCommand extends Command {
	public constructor() {
		super('tag', {
			aliases: ['tag'],
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.TAGS.DESCRIPTION,
				usage: () => '<method> <...arguments>',
				examples: () => [
					'show Test',
					'add Test Test',
					'add --hoist/--pin "Test 2" Test2',
					'add --template Test1 ${guild}',
					'alias --add Test1 Test2',
					'alias --del "Test 2" "Test 3"',
					'del Test',
					'edit Test Some new content',
					'edit "Test 1" Some more new content',
					'edit Test --hoist',
					'edit Test --unhoist Some more new content',
					'edit Test --template',
					'source Test',
					'source --file Test',
					'info Test',
					'search Test',
					'list @Cosmzs',
					'download @Cosmzs',
				],
			},
			category: 'tag',
			channel: 'guild',
			ratelimit: 2,
		});
	}

	public *args() {
		const method = yield {
			type: [
				['tag-show', 'show'],
				['tag-add', 'add'],
				['tag-alias', 'alias'],
				['tag-delete', 'del', 'delete', 'remove', 'rm'],
				['tag-edit', 'edit'],
				['tag-source', 'source'],
				['tag-info', 'info'],
				['tag-search', 'search'],
				['tag-list', 'list'],
				['tag-download', 'download', 'dl'],
			],
			otherwise: (msg: Message) => {
				this.client.commandHandler.handleDirectCommand(msg, 'tag', this.client.commandHandler.modules.get('help')!);
			},
		};

		return Flag.continue(method);
	}
}
