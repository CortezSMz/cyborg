import { Command, Flag } from 'discord-akairo';
import { Message } from 'discord.js';

export default class TagCommand extends Command {
	public constructor() {
		super('tag', {
			aliases: ['tag'],
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.DESCRIPTION.CONTENT,
				usage: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.DESCRIPTION.USAGE,
				examples: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.TAGS.DESCRIPTION.EXAMPLES,
			},
			category: 'tag',
			channel: 'guild',
			ratelimit: 2,
		});
	}

	public *args() {
		const method = yield {
			type: [
				['tag-show', 'show', 'mostrar'],
				['tag-add', 'add', 'adicionar'],
				['tag-alias', 'alias', 'apelido'],
				['tag-delete', 'del', 'delete', 'remove', 'rm', 'deletar', 'remover'],
				['tag-edit', 'edit', 'editar'],
				['tag-source', 'source', 'cru', 'crú'],
				['tag-info', 'info', 'informações', 'informação'],
				['tag-search', 'search', 'procurar', 'procura'],
				['tag-list', 'list', 'listar', 'lista'],
				['tag-download', 'download', 'dl', 'baixar'],
			],
			otherwise: (msg: Message) => {
				this.client.commandHandler.handleDirectCommand(msg, 'tag', this.client.commandHandler.modules.get('help')!);
			},
		};

		return Flag.continue(method);
	}
}
