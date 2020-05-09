import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { TOPICS, EVENTS } from '../../../util/logger';

export default class messageReactionRemoveReactionRole extends Listener {
    public constructor() {
        super('messageReactionRemoveReactionRole', {
            emitter: 'client',
            event: 'messageReactionRemove',
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
        //reaction.users.remove(this.client.user!);
        //console.log(`${user.tag} removed ${reaction.emoji.name} on ${reaction.message.channel.type == 'dm' ? 'DM' : `${reaction.message.channel}`}`);
    }
}
