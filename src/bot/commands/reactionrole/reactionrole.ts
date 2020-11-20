import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Permissions } from 'discord.js';
import { Flag } from 'discord-akairo';

export default class ReactionRoleCommand extends CyborgCommand {
	public constructor() {
		super('reactionrole', {
			description: {
				content: () => 'Manages roles by reactions.',
				usage: () => '<method> <...arguments>',
				examples: () => ['create', 'add', 'remove'],
			},
			channel: 'guild',
			category: 'reactionrole',
			clientPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public *args() {
		const method = yield {
			type: [
				['reactionrole-create', 'create'],
				['reactionrole-add', 'add'],
				['reactionrole-fix', 'fix'],
				['reactionrole-remove', 'remove', 'rmv', 'rm'],
			],
			otherwise: (msg: Message) => {
				this.client.commandHandler.handleDirectCommand(msg, 'reactionrole', this.client.commandHandler.modules.get('help')!);
			},
		};

		return Flag.continue(method);
	}
}
