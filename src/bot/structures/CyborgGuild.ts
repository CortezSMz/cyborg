import { Structures } from 'discord.js';
import CyborgClient from '../client/CyborgClient';
import Queue from './Queue';

export default () =>
	Structures.extend('Guild', (Guild) => {
		return class CyborgGuild extends Guild {
			public caseQueue = new Queue(this.client as CyborgClient);
		};
	});
