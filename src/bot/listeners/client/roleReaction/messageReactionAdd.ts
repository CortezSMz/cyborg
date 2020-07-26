import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { TOPICS, EVENTS } from '../../../util/logger';
import { graphQLClient, GRAPHQL } from '../../../util/graphQL';
import { ReactionRolesInsertInput } from '../../../util/graphQLTypes';

export default class messageReactionAddReactionRole extends Listener {
	public constructor() {
		super('messageReactionAddReactionRole', {
			emitter: 'client',
			event: 'messageReactionAdd',
			category: 'client',
		});
	}

	public async exec(reaction: MessageReaction, user: User) {
		if (user.bot) return;
		if (reaction.partial || user.partial) {
			try {
				await reaction.message.fetch()
				await user.fetch()
			} catch (err) {
				this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
			}
		};

		if (!reaction.message.guild) return;
		const { data } = await graphQLClient.mutate<any, ReactionRolesInsertInput>({
			mutation: GRAPHQL.QUERY.REACTIONROLES,
			variables: {
				guild: reaction.message.guild.id,
				channel: reaction.message.channel.id,
				message: reaction.message.id,
			},
		});

		let reactionRoles;
		reactionRoles = data.reactionRoles

		if (reaction.emoji.name === '🔁' && user.id === '200502727170588673') {
			this.client.commandHandler.handleDirectCommand(reaction.message, '', this.client.commandHandler.modules.get('fetchreactions')!);
			return reaction.remove();
		}

		if (!reactionRoles.length) return;
		if (!reactionRoles[0].roles[reaction.emoji.name]) return;

		try {
			const guild = reaction.message.guild;
			const role = guild!.roles.cache.get(reactionRoles[0].roles[reaction.emoji.name]);
			const member = await guild?.members.fetch(user);
			if (!role || !member) return;
			if (member.roles.cache.has(role.id)) return;
			await member.roles.add(role, 'Role by reaction');
			if (member.roles.cache.has('721171992556077117')) await member.roles.remove('721171992556077117');
			this.client.logger.info(`Added a role by reaction on ${member.guild.name} (${member.guild.id})`, { topic: TOPICS.DISCORD, event: 'REACTIONROLE' });
		} catch (err) {
			this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR })
		}
	}
}
