require('dotenv').config();
import 'reflect-metadata';
import CyborgClient from './client/CyborgClient';
import { __rootdir__ } from './root';
import CyborgGuild from './structures/CyborgGuild';
import { EVENTS, TOPICS } from './util/logger';

CyborgGuild();
const client = new CyborgClient({ owner: process.env.OWNER, token: process.env.TOKEN, root: __rootdir__ });
client
	.on('error', (err) => {
		client.logger.error(err.message, { topic: TOPICS.DISCORD, event: EVENTS.ERROR }), console.log(err);
	})
	.on('warn', (info) => {
		client.logger.warn(info, { topic: TOPICS.DISCORD, event: EVENTS.WARN }), console.log(info);
	});

client.start();
