import { Command } from 'discord-akairo';
import { Message, Permissions, Role, MessageEmbed } from 'discord.js';
import { LOCALE, SETTINGS, COLORS } from '../../../util/constants';
import { stripIndents } from 'common-tags';
import { Flag } from 'discord-akairo';

export default class SetConfigMemberLogCommand extends Command {
	public constructor() {
		super('config-set-autorole', {
			description: {
				content: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.AUTO_ROLE.DESCRIPTION.CONTENT,
				usage: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.AUTO_ROLE.DESCRIPTION.USAGE,
				examples: (message: Message) => LOCALE(message.guild!).COMMANDS.CONFIG.SET.AUTO_ROLE.DESCRIPTION.EXAMPLES
			},
			category: 'config',
			channel: 'guild',
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			clientPermissions: [Permissions.FLAGS.MANAGE_ROLES],
			ratelimit: 2,
			args: [
				{
					id: 'role',
					type: (msg: Message, content: string | null) => {
						if (!content) return null;
						const role = this.client.util.resolveRole(content, msg.guild!.roles.cache);
						if (!role) return null;
						if (!role.editable) return Flag.fail(role);
						return role;
					},
					prompt: {
						start: stripIndents`Which role you want users to get when they join your server?
		
							You can type the role's name, ID or mention it.`,
						retry: (msg: Message, { failure }: { failure: { value: Role } }) => {
							const embed = new MessageEmbed()
								.setColor(COLORS.EMBED)
							const failedRole = failure.value;
							const me = msg.guild!.member(this.client.user!)!;
							if (failedRole.managed) embed.setDescription(`${failedRole} is automatically managed by an integration. It cannot be manually assigned to members or deleted.`);
							if (me.roles.highest.comparePositionTo(failedRole) < 0) {
								embed.setDescription(
									msg.guild!.roles.cache
										.sort((a, b) => b.position - a.position)
										.map(role => {
											console.log(role.name, failedRole.comparePositionTo(role), me.roles.highest.comparePositionTo(role))
											if (role.id === failedRole.id) return `**${role} <-- your role**`
											if (role.id === me.roles.highest.id) return `**${role} <-- my highest**`
											if (me.roles.highest.comparePositionTo(role) < 2 && me.roles.highest.comparePositionTo(role) > -2
												|| failedRole.comparePositionTo(role) < 2 && failedRole.comparePositionTo(role) > -2) return `${role}`
											if (failedRole.comparePositionTo(role) === -2
												|| failedRole.comparePositionTo(role) === 2
												|| me.roles.highest.comparePositionTo(role) === 2) return '[...]'
											return '\u200b'
										}).filter(zws => zws !== '\u200b').join('\n')

								);
								return {
									content: stripIndents`
									Because of how permission works, the role you want to give cannot be higher than my highest role.
									Please, move it or choose another.`,
									embed: embed
								}
							}
							return { embed: embed }

						}
					}
				},
			],
		});
	}

	public async exec(message: Message, { role }: { role: Role }) {
		const guild = message.guild!;
		this.client.settings.set(guild, SETTINGS.AUTO_ROLE, role.id);
		return message.util?.reply(LOCALE(guild).COMMANDS.CONFIG.SET.AUTO_ROLE.REPLY(role.name));
	}
}
