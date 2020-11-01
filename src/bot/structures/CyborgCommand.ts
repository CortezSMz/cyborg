import { Command, CommandOptions } from 'discord-akairo';
import CyborgUtil from '../util/Util';

const languages = ['EN', 'PTBR'];

export default class CyborgCommand extends Command {
	public uses: number;
	constructor(id: string, { aliases, ...options }: CommandOptions = {}) {
		if (!aliases) aliases = [];
		for (const lang of languages) {
			const als = CyborgUtil.LOCALE(lang as any).COMMANDS.ALIASES[id.toUpperCase().replace(/-/g, '')];
			if (als)
				for (const alias of als) {
					if (!aliases.includes(alias)) aliases.push(alias);
				}
		}
		super(id, { aliases, ...options });
		this.uses = 0;
	}
}
