import { Command } from 'discord-akairo';
import { Message, Permissions, Role, Emoji, MessageEmbed } from 'discord.js';
import { Argument } from 'discord-akairo';
import * as emojis from 'node-emoji';
import { stripIndents } from 'common-tags';
import { PrefixSupplier } from 'discord-akairo';
import { graphQLClient, GRAPHQL } from '../../util/graphQL';
import { ReactionRolesInsertInput, ReactionRoles } from '../../util/graphQLTypes';
import { COLORS } from '../../util/constants';
import { Flag } from 'discord-akairo';

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;

export default class ReactionRoleAddCommand extends Command {
	constructor() {
		super('reactionrole-add', {
			description: {
				content: () => 'Add roles for an existing reaction-role message.',
				usage: () => 'add <ID> @Role <Emoji>',
			},
			channel: 'guild',
			category: 'reactionrole',
			clientPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.EMBED_LINKS],
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			ratelimit: 2,
		});
	}

	public *args() {
		const embed = new MessageEmbed().setColor(COLORS.EMBED);

		const roleReactionMessage = yield {
			type: 'message',
			prompt: {
				start: (msg: Message) => stripIndents`
                Which message should I use?
                
                You can use an existing message or type \`${(this.handler.prefix as PrefixSupplier)(msg)}reactionrole create\` to setup a new one.`,
				retry: stripIndents`
                Are you sure this is the correct ID? That message doesn't seem to exist.
                
                Steps to get a message ID: \`User Settings\` > \`Appearance\` enable \`Developer Mode\` > then right click the message and \`Copy ID\``,
			},
		};

		const emoji = yield {
			type: Argument.union('emoji', async (_, content) => {
				let possibleEmojis = content.split(' ');
				for (let emj of possibleEmojis) {
					if (emojis.hasEmoji(emj)) {
						return emojis.find(emj);
					} else {
						if (EMOJI_REGEX.test(emj)) [, emj] = EMOJI_REGEX.exec(emj)!;
						if (!isNaN((emj as unknown) as number)) return this.client.emojis.cache.get(emj);
						return this.client.emojis.cache.find(e => e.name === emj);
					}
				}
			}),
			prompt: {
				start: 'Which emoji should users react with?',
				retry: 'Which emoji should users react with?',
			},
		};

		const role = yield {
			type: (msg: Message, content: string | null) => {
				if (!content) return null;
				const role = this.client.util.resolveRole(content, msg.guild!.roles.cache);
				if (!role) return null;
				if (!role.editable) return Flag.fail(role);
				return role;
			},
			prompt: {
				start: stripIndents`And which role will users get when they react with ${emoji.emoji ? emoji.emoji : emoji}?

                    You can type the role's name, ID or mention it.`,
				retry: (msg: Message, { failure }: { failure: { value: Role } }) => {
					const failedRole = failure.value;
					const me = msg.guild!.member(this.client.user!)!;
					if (failedRole.managed) embed.setDescription(`${failedRole} is automatically managed by an integration. It cannot be manually assigned to members or deleted.`);
					if (me.roles.highest.comparePositionTo(failedRole) < 0) {
						embed.setDescription(
							msg
								.guild!.roles.cache.sort((a, b) => b.position - a.position)
								.map(role => {
									if (role.id === failedRole.id) return `**${role} <-- your role**`;
									if (role.id === me.roles.highest.id) return `**${role} <-- my highest**`;
									if (
										(me.roles.highest.comparePositionTo(role) < 2 && me.roles.highest.comparePositionTo(role) > -2) ||
										(failedRole.comparePositionTo(role) < 2 && failedRole.comparePositionTo(role) > -2)
									)
										return `${role}`;
									if (failedRole.comparePositionTo(role) === -2 || failedRole.comparePositionTo(role) === 2 || me.roles.highest.comparePositionTo(role) === 2) return '[...]';
									return '\u200b';
								})
								.filter(zws => zws !== '\u200b')
								.join('\n')
						);
						return { content: "The role you're trying to give is higher than mine. Move it or choose another.", embed: embed };
					}
					return { embed: embed };
				},
			},
		};

		return { roleReactionMessage, role, emoji };
	}

	public async exec(msg: Message, { roleReactionMessage, role, emoji }: { roleReactionMessage: Message; role: Role; emoji: Emoji | any }) {
		let roles: {} = JSON.parse(`{"${emoji.emoji ? emoji.emoji : emoji.name}": "${role.id}"}`);

		const { data } = await graphQLClient.mutate<any, ReactionRolesInsertInput>({
			mutation: GRAPHQL.QUERY.REACTIONROLES,
			variables: {
				guild: roleReactionMessage.guild!.id,
				channel: roleReactionMessage.channel.id,
				message: roleReactionMessage.id,
			},
		});

		let reactionRoles: ReactionRoles[];
		reactionRoles = data.reactionRoles;

		if (!reactionRoles.length) {
			await graphQLClient.mutate<any, ReactionRolesInsertInput>({
				mutation: GRAPHQL.MUTATION.INSERT_REACTION_ROLES,
				variables: {
					guild: roleReactionMessage.guild!.id,
					channel: roleReactionMessage.channel.id,
					message: roleReactionMessage.id,
					roles,
				},
			});
		} else {
			roles = { ...reactionRoles[0].roles, ...roles };
			await graphQLClient.mutate<any, ReactionRolesInsertInput>({
				mutation: GRAPHQL.MUTATION.UPDATE_REACTION_ROLES,
				variables: {
					id: reactionRoles[0].id,
					roles,
				},
			});
		}
		this.client.commandHandler.handleDirectCommand(msg, roleReactionMessage.id, this.client.commandHandler.modules.get('reactionrole-fix')!);
	}
}
