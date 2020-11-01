import { User, TextChannel, GuildEmoji, MessageEmbed, Guild, Message } from 'discord.js';
import CyborgClient from '../client/CyborgClient';
import * as emojis from 'node-emoji';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export enum COLORS {
	BAN = 16718080,
	UNBAN = 8450847,
	SOFTBAN = 16745216,
	KICK = 16745216,
	MUTE = 16763904,
	EMBED = 11453937,
	EMOJI = 16776960,
	REACTION = 16776960,
	TAG = 16776960,
	WARN = 16776960,
	MEMBER_JOIN = 8450847,
	MEMBER_LEFT = 16745216,
}

export enum SETTINGS {
	PREFIX = 'PREFIX',
	LANGUAGE = 'LANGUAGE',
	PREMIUM = 'PREMIUM',
	ROLE_STATE = 'ROLE_STATE',
	BLACKLIST = 'BLACKLIST',
	EMOTE_VOTE = 'EMOTE_VOTE',
	MEMBER_LOG = 'MEMBER_LOG',
	AUTO_ROLE = 'AUTO_ROLE',
}

export interface Settings {
	PREFIX: string;
	LANGUAGE: string;
	PREMIUM: boolean;
	ROLE_STATE: boolean;
	BLACKLIST: string[];
	AUTO_ROLE: string;
	MEMBER_LOG: {
		CHANNEL: string;
		MESSAGE: {
			CONTENT: string;
		};
	};
	EMOTE_VOTE: {
		[key: string]: number | string;
	};
}

export interface Messages {
	COMMAND_HANDLER: {
		PROMPT: {
			MODIFY_START(
				str: string | { content: string; embed: MessageEmbed }
			):
				| string
				| {
						content: string;
						embed: MessageEmbed;
				  };
			MODIFY_RETRY(
				str: string | { content: string; embed: MessageEmbed }
			):
				| string
				| {
						content: string;
						embed: MessageEmbed;
				  };
			CANCEL_WORD: string;
			STOP_WORD: string;
			TIMEOUT: string;
			ENDED: string;
			CANCEL: string;
		};
	};

	LISTENERS: {
		CLIENT: {};

		COMMAND_HANDLER: {
			MISSING_PERMISSIONS: {
				CLIENT: string;
				USER(user: User): string;
			};
		};
	};

	COMMANDS: {
		CATEGORIES: {
			[category: string]: string;
			FUN: string;
			CONFIG: string;
			INFO: string;
			OWNER: string;
			REACTIONROLE: string;
			TAG: string;
			UTIL: string;
			TWITCH: string;
		};

		ALIASES: {
			[key: string]: string[];
			'CONFIG-CHECK': string[];
			CONFIG: string[];
			LANGUAGE: string[];
			PREFIX: string[];
			BLACKJACK: string[];
			CONNECTFOUR: string[];
			JACKBLACK: string[];
			TICTACTOE: string[];
			CHANNEL: string[];
			EMOJI: string[];
			ROLE: string[];
			GUILD: string[];
			USER: string[];
			BLACKLIST: string[];
			EVAL: string[];
			PURGE: string[];
			RELOAD: string[];
			TEST: string[];
			REACTIONROLE: string[];
			'TAG-LIST': string[];
			TAG: string[];
			TWITCH: string[];
			EMBED: string[];
			HELP: string[];
			PING: string[];
			'REMINDME-ADD': string[];
			RUNE: string[];
			STATS: string[];
		};

		FUN: {
			BLACKJACK: {
				DESCRIPTION: {
					CONTENT(prefix: string | string[] | Promise<string | string[]>, user: string): string;
					EXAMPLES: string[];
				};
				PLAYERSTATUS: {
					STANDING: string;
					DRAWING: string;
					WON: string;
					LOST: string;
					TIE: string;
				};
				PROMPT: {
					PLAYS: string[][];
					CONTENT: string;
				};
				ENDED: string;
				WAITING: string;
				TIED: string;
				WON: string;
				THE_GAME: string;
			};
			CONNECTFOUR: {};
			SLOTS: {};
			TICTACTOE: {};
		};

		EMBED: {
			DESCRIPTION: {
				CONTENT: string;
			};
			EDIT: {
				DESCRIPTION: {
					CONTENT: string;
				};
			};
			SEND: {
				DESCRIPTION: {
					CONTENT: string;
				};
				PROMPT: {
					START: string;
					RETRY: string;
				};
			};
		};

		CONFIG: {
			DESCRIPTION: {
				CONTENT: string;
				USAGE: string;
			};
			TOGGLE: {
				DESCRIPTION: {
					CONTENT: string;
					USAGE: string;
				};
				REPLY(prefix: string | string[] | Promise<string | string[]>): string;
				ROLE_STATE: {
					DESCRIPTION: {
						CONTENT: string;
					};
					REPLY_DEACTIVATED: string;
					REPLY_ACTIVATED: string;
				};
			};

			SET: {
				DESCRIPTION: {
					CONTENT: string;
					USAGE: string;
				};
				REPLY(prefix: string | string[] | Promise<string | string[]>): string;
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: string;
						USAGE: string;
						EXAMPLES: string[];
					};
					REPLY(channel: string): string;
				};

				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: string;
						USAGE: string;
						EXAMPLES: string[];
					};
					REPLY(channel: string): string;
				};
			};

			DELETE: {
				DESCRIPTION: {
					CONTENT: string;
					USAGE: string;
				};
				REPLY(prefix: string | string[] | Promise<string | string[]>): string;
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: string;
					};
					REPLY: string;
				};

				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: string;
					};
					REPLY: string;
				};
			};

			CLEAR: {
				DESCRIPTION: {
					CONTENT: string;
				};
				REPLY: string;
			};

			CHECK: {
				DESCRIPTION: {
					CONTENT: string;
				};
			};
		};

		REACTIONROLE: {
			CREATE: {
				DESCRIPTION: string;
				PROMPT: {
					START_TITLE(author: User): string;
					RETRY_TITLE(author: User): string;
				};
			};
		};

		OWNER: {
			RELOAD: {
				PROMPT: {
					START(author: User): string;
					RETRY(author: User): string;
				};
			};

			BLACKLIST: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
				};
				REPLY(user: string): string;
				REPLY_2(user: string): string;
			};

			EVAL: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
				};
			};
		};

		INFO: {
			CHANNEL: {
				DESCRIPTION: {
					CONTENT: string;
					USAGE: string;
					EXAMPLES: string[];
				};
				EMBED: {
					DESCRIPTION(channel: TextChannel): string;
					FIELD_INFO: {
						NAME: string;
						VALUE(channel: TextChannel): string;
					};
				};
			};

			EMOJI: {
				DESCRIPTION: {
					CONTENT: string;
				};
				PROMPT: {
					START(author: User): string;
					RETRY(author: User): string;
				};
				EMBED: {
					DESCRIPTION: {
						GUILDEMOJI(emoji: GuildEmoji): string;
						EMOJI(emoji: emojis.Emoji): string;
					};
					FIELD_INFO: {
						NAME: string;
						VALUE: {
							GUILDEMOJI(emoji: GuildEmoji): string;
							EMOJI(emoji: emojis.Emoji): string;
						};
					};
				};
			};

			ROLE: {
				DESCRIPTION: string;
			};

			SERVER: {
				DESCRIPTION: string;
			};

			USER: {
				DESCRIPTION: string;
			};
		};

		TAGS: {
			DESCRIPTION: {
				CONTENT: string;
				USAGE: string;
				EXAMPLES: string[];
			};

			ADD: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User | null): string;
					RETRY(author: User | null, val: string): string;
				};
				PROMPT_2: {
					START(author: User | null): string;
				};
				TOO_LONG: string;
				REPLY(name: string): string;
			};

			ALIAS: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
				PROMPT_2: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
				PROMPT_3: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
				TOO_LONG: string;
				REPLY(first: string, second: string, add: boolean): string;
			};

			DELETE: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
				OWN_TAG: string;
				REPLY(tag: string): string;
			};

			DOWNLOAD: {
				DESCRIPTION: string;
				REPLY: string;
			};

			EDIT: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
				PROMPT_2: {
					START(author: User): string;
				};
				OWN_TAG: string;
				TOO_LONG: string;
				REPLY(tag: string, hoist: boolean, template: boolean): string;
			};

			INFO: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
			};

			LIST: {
				DESCRIPTION: string;
				NO_TAGS(member?: string): string;
				GUILD_NO_TAGS(guild: string): string;
			};

			SEARCH: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
				};
				NO_RESULT(query: string): string;
				TOO_BIG: string;
			};

			SHOW: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
				};
			};

			SOURCE: {
				DESCRIPTION: string;
				PROMPT: {
					START(author: User): string;
					RETRY(author: User, val: string): string;
				};
			};
		};

		TWITCH: {
			ONLINE_MESSAGE: string;
			OFFLINE_MESSAGE: string;
			DELETED_MESSAGE: string;
			ONLINE_EMBED: {
				FIELD_CATEGORY: {
					CATEGORY: string;
					GAME: string;
				};
				FIELD_VIEWERS: string;
				FOOTER: string;
			};
			OFFLINE_EMBED: {
				DESCRIPTION: string;
				FOOTER: string;
			};
		};

		UTIL: {
			RUNE: {
				DESCRIPTION: {
					CONTENT: string;
					USAGE: string;
					EXAMPLES: string[];
				};

				PROMPT: {
					START(author: User): string;
					RETRY(author: User): string;
				};
			};

			HELP: {
				DESCRIPTION: {
					CONTENT(prefix: string | string[] | Promise<string | string[]>): string;
					USAGE: string;
				};
				REPLY(prefix: string | string[] | Promise<string | string[]>, msg: Message): string;
				EMBED: {
					FIELD_COMMANDS: string;
					FIELD_DESCRIPTION: string;
					FIELD_ALIASES: string;
					FIELD_EXAMPLES: string;
				};
			};

			INFO: {};

			LANGUAGE: {
				DESCRIPTION: string;
				REPLY(language: string): string;
				REPLY_2(language: string): string;
				REPLY_3(language: string): string;
			};

			PING: {
				DESCRIPTION: string;
				RESPONSES: {
					chance: number;
					response: string;
				}[];
			};

			PREFIX: {
				DESCRIPTION: string;
				REPLY(prefix: string | string[] | Promise<string | string[]>): string;
				REPLY_2(prefix: string): string;
				REPLY_3(prefix: string): string;
			};

			REMINDME: {
				DESCRIPTION: string;
				ADD: {
					TOO_LONG: string;
					PROMPT_TIME: {
						START(author: User): string;
						RETRY(author: User): string;
					};
					PROMPT_TEXT: {
						START(author: User): string;
					};
				};
				LIST: {
					NOT_FOUND: string;
					TITLE: string;
					FOOTER_1: string;
					FOOTER_2: string;
				};
				CLEAR: {
					NOT_FOUND: string;
					AWAIT_MESSAGE: string;
					TIMEOUT: string;
					REPLY: string;
				};
				DEL: {
					PROMPT: {
						START(author: User): string;
						RETRY(author: User): string;
					};
					ERROR: string;
					REPLY: string;
				};
			};

			STATS: {
				DESCRIPTION: string;
			};
		};
	};
}

export const CYBORG = {
	COMMAND_HANDLER: {
		LOADED: 'Command handler loaded',
	},

	INHIBITOR_HANDLER: {
		LOADED: 'Inhibitor handler loaded',
	},

	LISTENER_HANDLER: {
		LOADED: 'Listener handler loaded',
	},

	SETTINGS: {
		INIT: 'Bot settings initialized',
	},

	TWITCH_SCHEDULER: {
		INIT: 'Twitch scheduler initialized',
	},

	REMINDME_SCHEDULER: {
		INIT: 'Remindme scheduler initialized',
	},

	MUTE_SCHEDULER: {
		INIT: 'Mute scheduler initialized',
	},

	LOCKDOWN_SCHEDULER: {
		INIT: 'Lockdown scheduler initialized',
	},

	EVENTS: {
		GUILD_MEMBER_ADD: {
			ROLE_STATE: 'Automatic role state',
		},

		READY: {
			LOG: (tag: string, id: string) => `${tag} (${id}) is online!`,
			ACTIVITY: (username: string) => `@${username} help`,
		},

		SHARD_DISCONNECT: {
			LOG: (code: any) => `Shard diconnected: (${code})`,
		},

		SHARD_RECONNECT: {
			LOG: 'Shard reconnecting.',
		},

		SHARD_RESUME: {
			LOG: 'Shard resumed.',
		},
	},
};

export const PROMETHEUS = {
	MESSAGE_COUNTER: 'cyborg_messages_total',
	COMMAND_COUNTER: 'cyborg_commands_total',

	HELP: {
		MESSAGE_COUNTER: 'Total number of messages Cyborg has seen.',
		COMMAND_COUNTER: 'Total number of commands used.',
	},
};
