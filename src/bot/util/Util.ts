import { ClientUtil } from 'discord-akairo';
import { Guild } from 'discord.js';
import CyborgClient from '../client/CyborgClient';
import { SETTINGS } from './Constants';
import * as locale from '../util/locale';

export default class CyborgUtil extends ClientUtil {
	static LOCALE(language: ('EN' | 'PTBR') | Guild) {
		if (language instanceof Guild) {
			let lang = (language.client as CyborgClient).settings.get(language, SETTINGS.LANGUAGE, process.env.DEFAULT_LANG);
			return ((locale as unknown) as locale.Msgs)[lang.replace(/-/g, '')];
		}
		return locale[language];
	}
}
