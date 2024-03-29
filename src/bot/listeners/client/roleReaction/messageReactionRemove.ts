import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { TOPICS, EVENTS } from '../../../util/Logger';
import { graphQLClient, GRAPHQL } from '../../../util/graphQL';
import { ReactionRolesInsertInput } from '../../../util/graphQLTypes';
import { PRODUCTION } from '../../../util/Constants';

export default class messageReactionRemoveReactionRole extends Listener {
	public constructor() {
		super('messageReactionRemoveReactionRole', {
			emitter: 'client',
			event: 'messageReactionRemove',
			category: 'client',
		});
	}

	public async exec(reaction: MessageReaction, user: User) {
		try {
			if (user.bot) return;
			if (reaction.partial || user.partial) {
				await reaction.message.fetch();
				await user.fetch();
			}

			const { data } = await graphQLClient.mutate<any, ReactionRolesInsertInput>({
				mutation: GRAPHQL.QUERY.REACTIONROLES,
				variables: {
					guild: reaction.message.guild?.id,
					channel: reaction.message.channel.id,
					message: reaction.message.id,
				},
			});

			let reactionRoles;
			if (PRODUCTION) reactionRoles = data.reactionRoles;
			else reactionRoles = data.reactionRolesStaging;

			if (!reactionRoles.length) return;
			if (!reactionRoles[0].roles[reaction.emoji.name]) return;

			const guild = reaction.message.guild;
			const role = guild!.roles.cache.get(reactionRoles[0].roles[reaction.emoji.name]);
			const member = await guild?.members.fetch(user);
			if (!role || !member) return;
			if (!member.roles.cache.has(role.id)) return;
			await member.roles.remove(role, 'Role by reaction');
			this.client.logger.info(`Removed a role by reaction on ${member.guild.name} (${member.guild.id})`, { topic: TOPICS.DISCORD, event: 'REACTIONROLE' });
		} catch (err) {
			this.client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR });
		}
	}
}
