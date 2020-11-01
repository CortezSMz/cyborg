import { Command, CommandOptions } from 'discord-akairo';
import { Guild } from 'discord.js';
import CyborgClient from '../client/CyborgClient';
import { Messages, SETTINGS } from '../util/constants';
import * as locale from '../util/locale';

const languages = ['PTBR', 'EN'];

const LOCALE = (language: ('EN' | 'PTBR') | Guild): Messages => {
	if (language instanceof Guild) {
		let lang = (language.client as CyborgClient).settings.get(language, SETTINGS.LANGUAGE, process.env.DEFAULT_LANG);
		return ((locale as unknown) as locale.Msgs)[lang.replace(/-/g, '')];
	}
	return locale[language];
};

export default class CyborgCommand extends Command {
	constructor(id: string, { aliases, ...options }: CommandOptions = {}) {
		if (!aliases) aliases = [];
		for (const lang of languages) {
			for (const alias of LOCALE(lang as any).COMMANDS.ALIASES[id.toUpperCase()]) {
				if (!aliases.includes(alias)) aliases.push(alias);
			}
		}
		super(id, { aliases, ...options });
	}
}
