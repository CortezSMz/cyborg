import { Guild } from 'discord.js';
import CyborgClient from '../client/CyborgClient';

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

export const isPremium = (guild: Guild) => {
	return (guild?.client as CyborgClient)?.settings.get(guild, SETTINGS.PREMIUM, false) ?? false;
};

export interface Messages {
	COMMAND_HANDLER: {
		PROMPT: {
			MODIFY_START: Function;
			MODIFY_RETRY: Function;
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
				USER: Function;
			};
		};
	};

	COMMANDS: {
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
				REPLY: Function;
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
				REPLY: Function;
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: string;
						USAGE: string;
						EXAMPLES: string[];
					};
					REPLY: Function;
				};

				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: string;
						USAGE: string;
						EXAMPLES: string[];
					};
					REPLY: Function;
				};
			};

			DELETE: {
				DESCRIPTION: {
					CONTENT: string;
					USAGE: string;
				};
				REPLY: Function;
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

		REACTIONROLE: {
			CREATE: {
				DESCRIPTION: string;
				PROMPT: {
					START_TITLE: Function;
					RETRY_TITLE: Function;
				};
			};
		};

		OWNER: {
			RELOAD: {
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
			};

			BLACKLIST: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
				};
				REPLY: Function;
				REPLY_2: Function;
			};

			EVAL: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
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
					DESCRIPTION: Function;
					FIELD_INFO: {
						NAME: string;
						VALUE: Function;
					};
				};
			};

			EMOJI: {
				DESCRIPTION: {
					CONTENT: string;
				};
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
				EMBED: {
					DESCRIPTION: {
						GUILDEMOJI: Function;
						EMOJI: Function;
					};
					FIELD_INFO: {
						NAME: string;
						VALUE: {
							GUILDEMOJI: Function;
							EMOJI: Function;
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
			DESCRIPTION: string;

			ADD: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
				PROMPT_2: {
					START: Function;
				};
				TOO_LONG: string;
				REPLY: Function;
			};

			ALIAS: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
				PROMPT_2: {
					START: Function;
					RETRY: Function;
				};
				PROMPT_3: {
					START: Function;
					RETRY: Function;
				};
				TOO_LONG: string;
				REPLY: Function;
			};

			DELETE: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
				OWN_TAG: string;
				REPLY: Function;
			};

			DOWNLOAD: {
				DESCRIPTION: string;
				REPLY: string;
			};

			EDIT: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
				PROMPT_2: {
					START: Function;
				};
				OWN_TAG: string;
				TOO_LONG: string;
				REPLY: Function;
			};

			INFO: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
					RETRY: Function;
				};
			};

			LIST: {
				DESCRIPTION: string;
				NO_TAGS: Function;
				GUILD_NO_TAGS: Function;
			};

			SEARCH: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
				};
				NO_RESULT: Function;
				TOO_BIG: string;
			};

			SHOW: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
				};
			};

			SOURCE: {
				DESCRIPTION: string;
				PROMPT: {
					START: Function;
					RETRY: Function;
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
					START: Function;
					RETRY: Function;
				};
			};

			HELP: {
				DESCRIPTION: {
					CONTENT: Function;
					USAGE: string;
				};
				REPLY: Function;
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
				REPLY: Function;
				REPLY_2: Function;
				REPLY_3: Function;
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
				REPLY: Function;
				REPLY_2: Function;
				REPLY_3: Function;
			};

			REMINDME: {
				DESCRIPTION: string;
				ADD: {
					TOO_LONG: string;
					PROMPT_TIME: {
						START: Function;
						RETRY: Function;
					};
					PROMPT_TEXT: {
						START: Function;
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
						START: Function;
						RETRY: Function;
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
