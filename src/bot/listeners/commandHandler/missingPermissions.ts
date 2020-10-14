import { Listener, Command } from 'discord-akairo';
import { stripIndents } from 'common-tags';
import { Message } from 'discord.js';
import { SETTINGS } from '../../util/constants';
import { TOPICS, EVENTS } from '../../util/logger';

interface Permissions {
	[key: string]: string;
}

const PERMISSIONS: Permissions = {
	1: 'Create Invite',
	2: 'Kick Members',
	4: 'Ban Members',
	8: 'Administrator',
	16: 'Manage Channels',
	32: 'Manage Server',
	64: 'Add Reactions',
	128: 'View Audit Log',
	256: 'Priority Speaker',
	512: 'Video',
	1024: 'Read Text Channels & See Voice Channels',
	2048: 'Send Messages',
	4096: 'Send TTS Messages',
	8192: 'Manage Messages',
	16384: 'Embed Links',
	32768: 'Attach Files',
	65536: 'Read Message History',
	131072: 'Mention @everyone, @here, and All Roles',
	262144: 'Use External Emojis',
	524288: 'View Guild Insights',
	1048576: 'Connect',
	2097152: 'Speak',
	4194304: 'Mute Members',
	8388608: 'Deafen Members',
	16777216: 'Move Members',
	33554432: 'Use Voice Activity',
	67108864: 'Change Nickname',
	134217728: 'Manage Nicknames',
	268435456: 'Manage Roles',
	536870912: 'Manage Webhooks',
	1073741824: 'Manage Emojis',
};

export default class CommandErrorListener extends Listener {
	constructor() {
		super('missingPermissions', {
			emitter: 'commandHandler',
			event: 'missingPermissions',
			category: 'commandHandler',
		});
	}

	public exec(message: Message, command: Command, type: string, missing: any) {
		if (typeof missing === 'string') return message.util?.send(missing);

		missing = missing[0] || missing;

		const prefix = this.client.settings.get(message.guild!, SETTINGS.PREFIX, process.env.COMMAND_PREFIX);

		switch (type) {
			case 'client':
				this.client.logger.info(`Client is missing ${PERMISSIONS[missing]} for the command ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}`, {
					topic: TOPICS.DISCORD_AKAIRO,
					event: EVENTS.COMMAND_ERROR,
				});
				return message.util?.send(
					this.client
						.LOCALE(message.guild!)
						.LISTENERS.COMMAND_HANDLER.MISSING_PERMISSIONS.CLIENT.replace('$(perm)', PERMISSIONS[missing])
						.replace('$(prefix)', prefix)
						.replace('$(cmd)', command.id.replace(/-/g, ' '))
				);

			case 'user':
				return message.util?.send(
					this.client
						.LOCALE(message.guild!)
						.LISTENERS.COMMAND_HANDLER.MISSING_PERMISSIONS.USER(message.author)
						.replace('$(perm)', PERMISSIONS[missing])
						.replace('$(prefix)', prefix)
						.replace('$(cmd)', command.id.replace(/-/g, ' '))
				);
		}
	}
}
