import { stripIndents } from 'common-tags';
import { Messages } from '../Constants';
import moment = require('moment');

export default {
	COMMAND_HANDLER: {
		PROMPT: {
			MODIFY_START: str => {
				if (typeof str === 'string') return `${str}\n\nType \`cancel\` to cancel the command.`;
				if (typeof str === 'object')
					return (str = {
						...str,
						content: `${str.content ? str.content : ''}\n\nType \`cancel\` to cancel the command.`,
					});
				return '';
			},
			MODIFY_RETRY: str => {
				if (typeof str === 'string') return `${str}\n\nType \`cancel\` to cancel the command.`;
				if (typeof str === 'object')
					return (str = {
						...str,
						content: `${str.content ? str.content : ''}\n\nType \`cancel\` to cancel the command.`,
					});
				return '';
			},
			CANCEL_WORD: 'cancel',
			STOP_WORD: 'stop',
			TIMEOUT: 'Guess you took too long, the command has been cancelled.',
			ENDED: 'More than 3 tries. The command has been cancelled.',
			CANCEL: 'The command has been cancelled.',
		},
	},

	LISTENERS: {
		CLIENT: {},
		COMMAND_HANDLER: {
			MISSING_PERMISSIONS: {
				CLIENT: stripIndents`Humpf. I can't help you if you don't let me.
                I need **$(perm)** to run **$(prefix)$(cmd)**`,
				USER: author => stripIndents`I won't let you do that, ${author}.
                You need **$(perm)** to use **$(prefix)$(cmd)**`,
			},
		},
	},

	COMMANDS: {
		ALIASES: {
			CONFIGCHECK: ['check'],
			CONFIG: ['config'],
			LANGUAGE: ['language', 'lang'],
			PREFIX: ['prefix'],
			BLACKJACK: ['blackjack'],
			CONNECTFOUR: ['connectfour', 'connect4', 'cf', 'c4'],
			JACKBLACK: ['jackblack'],
			TICTACTOE: ['tictactoe', 'ttt'],
			CHANNEL: ['channel', 'channel-info'],
			EMOJI: ['emoji', 'emoji-info'],
			ROLE: ['role', 'role-info'],
			GUILD: ['guild', 'server', 'server-info'],
			USER: ['user', 'member', 'user-info'],
			BLACKLIST: ['blacklist', 'unblacklist'],
			EVAL: ['eval'],
			PURGE: ['purge', 'prune'],
			RELOAD: ['reload'],
			TEST: ['test'],
			REACTIONROLE: ['reactionrole', 'rr'],
			TAGLIST: ['tags'],
			TAG: ['tag'],
			TWITCH: ['twitch'],
			EMBED: ['embed'],
			HELP: ['help', 'h', 'ajuda'],
			PING: ['ping'],
			REMINDMEADD: ['reminder', 'remindme', 'remind'],
			RUNE: ['rune', 'futhark'],
			STATS: ['stats'],
		},

		CATEGORIES: {
			FUN: 'Fun',
			CONFIG: 'Config',
			INFO: 'Info',
			OWNER: 'Owner',
			REACTIONROLE: 'Reaction Roles',
			TAG: 'Tags',
			UTIL: 'Util',
			TWITCH: 'Twitch',
		},

		FUN: {
			BLACKJACK: {
				DESCRIPTION: {
					CONTENT: (prefix, user) => stripIndents`
					Type \`h\` to \`hit\` or type \`s\` to \`stand\`.
	
					Type \`${prefix}blackjack join @${user}\` to join a on-going game.
	
					\`Jack\`, \`Queen\` and \`King\` = \`10\`       \`Ace\` = \`11\` or \`1\``,
					EXAMPLES: ['join @Cosmzs'],
				},
				PLAYERSTATUS: {
					DRAWING: 'Drawing...',
					LOST: 'Lost...',
					STANDING: 'Waiting...',
					TIE: 'Tie!',
					WON: 'Won!!',
				},
				PROMPT: {
					CONTENT: 'Type `h` to `hit` or `s` to `stand`.',
					PLAYS: [
						['hit', 'h', 'draw', 'd'],
						['stand', 's', 'stay', 'leave', 'l', 'stop'],
					],
				},
				ENDED: 'The game has ended.',
				WAITING: 'Waiting for everyone to finish drawing cards...',
				TIED: 'tied',
				WON: 'won',
				THE_GAME: 'the game!',
			},

			CONNECTFOUR: {},
			SLOTS: {},
			TICTACTOE: {},
		},

		EMBED: {
			DESCRIPTION: {
				CONTENT: 'Tool to create embeds.',
			},
			EDIT: {
				DESCRIPTION: {
					CONTENT: 'Edits and embed',
				},
			},
			SEND: {
				DESCRIPTION: {
					CONTENT: 'To send and embed',
				},
				PROMPT: {
					START: 'What embed do you want to send?',
					RETRY: 'What embed do you want to send?',
				},
			},
		},

		CONFIG: {
			DESCRIPTION: {
				CONTENT: stripIndents`Avaible methods:
                    • set \`<key> <...arguments>\`
                    • del \`<key>\`
                    • clear
                    • toggle \`<key>\`
                Available keys:
                    • memberlog \`<#channel>\`
                Toggle keys:
                    • rolestate
                Required: \`<>\` | Optional: \`[]\`
            `,
				USAGE: '<method> <...arguments>',
			},
			TOGGLE: {
				DESCRIPTION: {
					CONTENT: 'Toggles a value in the config.',
					USAGE: '<method> <...arguments>',
				},
				REPLY: prefix => stripIndents`
                When you beg me so much I just can't not help you~
                Check \`${prefix}help config\` for more information.
            `,
				ROLE_STATE: {
					DESCRIPTION: {
						CONTENT: 'Toggle role state on the server.',
					},
					REPLY_DEACTIVATED: 'successfully removed all the records!',
					REPLY_ACTIVATED: 'successfully inserted all records!',
				},
			},

			SET: {
				DESCRIPTION: {
					CONTENT: 'Deletes the restriction roles of the guild.',
					USAGE: '<method> <...arguments>',
				},
				REPLY: prefix => stripIndents`
                When you beg me so much I just can't not help you~
                Check \`${prefix}help config\` for more information.
            `,
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: 'Sets member log on the server.',
						USAGE: '<channel>',
						EXAMPLES: ['#memberlog', 'member-log', '731705121464909824'],
					},
					REPLY: channel => `set member log channel to **${channel}**`,
				},
				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: 'Sets automatic roles on the server.',
						USAGE: '<role>',
						EXAMPLES: ['@role', '706400473669697546'],
					},
					REPLY: role => `new members will get the **${role}** role`,
				},
			},

			DELETE: {
				DESCRIPTION: {
					CONTENT: 'Deletes a value to the config.',
					USAGE: '<method> <...arguments>',
				},
				REPLY: prefix => stripIndents`
                When you beg me so much I just can't not help you~
                Check \`${prefix}help config\` for more information.
            `,
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: 'Deletes member log on the server.',
					},
					REPLY: 'deleted member log channel.',
				},
				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: 'Deletes automatics role on the server.',
					},
					REPLY: 'deleted automatic role.',
				},
			},

			CLEAR: {
				DESCRIPTION: {
					CONTENT: 'Clears the guild config.',
				},
				REPLY: 'cleared the guild config.',
			},

			CHECK: {
				DESCRIPTION: {
					CONTENT: 'Checks the guild config.',
				},
			},
		},

		REACTIONROLE: {
			CREATE: {
				DESCRIPTION: 'Create a **roles by reactions** message on the channel.',
				PROMPT: {
					START_TITLE: author => stripIndents`
					${author}, what would you like the title of the embed to be?

					Tip: could be a small phrase describing the roles on this embed.
					e.g. \`COLORFUL ROLES\``,
					RETRY_TITLE: author => stripIndents`
					${author}, what would you like the title of the embed to be?

					Tip: could be a small phrase describing the roles on this embed.
					e.g. \`COLOR ROLES\``,
				},
			},
		},

		OWNER: {
			RELOAD: {
				PROMPT: {
					START: author => `${author}, what module would you like to reload?`,
					RETRY: author => `${author}, please provide a valid module!`,
				},
			},

			BLACKLIST: {
				DESCRIPTION: 'Prohibit/Allow a user from using Cyborg.',
				PROMPT: {
					START: author => `${author}, who would you like to blacklist/unblacklist?`,
				},
				REPLY: user => `${user}, have you realized Cyborg's greatness? You've got good eyes~`,
				REPLY_2: user => `${user}, you are not worthy of Cyborg's luck~`,
			},

			EVAL: {
				DESCRIPTION: "You can't use this anyway, so why explain.",
				PROMPT: {
					START: author => `${author}, what would you like to evaluate?`,
				},
			},
		},

		INFO: {
			CHANNEL: {
				DESCRIPTION: {
					CONTENT: 'Get information about a channel.',
					USAGE: '[channel]',
					EXAMPLES: ['#general', 'general', '222197033908436994'],
				},
				EMBED: {
					DESCRIPTION: channel => `Info about **${channel.name}** (ID: ${channel.id})`,
					FIELD_INFO: {
						NAME: 'Info',
						VALUE: channel => stripIndents`
                        • Type: ${channel.type}
                        • Topic ${channel.topic || 'None'}
                        • NSFW: ${Boolean(channel.nsfw)}
                        • Creation Date: ${moment.utc(channel.createdAt).format('YYYY/MM/DD hh:mm:ss')}
                    `,
					},
				},
			},

			EMOJI: {
				DESCRIPTION: {
					CONTENT: 'Get information about an emoji.',
				},
				PROMPT: {
					START: author => `${author}, what emoji would you like information about?`,
					RETRY: author => `${author}, please provide a valid emoji!`,
				},
				EMBED: {
					DESCRIPTION: {
						GUILDEMOJI: emoji => `Info about ${emoji.name} (ID: ${emoji.id})`,
						EMOJI: emoji => `Info about ${emoji.emoji}`,
					},
					FIELD_INFO: {
						NAME: 'Info',
						VALUE: {
							GUILDEMOJI: emoji => stripIndents`
                            • Identifier: \`<${emoji.identifier}>\`
                            • Creation Date: ${moment.utc(emoji.createdAt ?? 0).format('YYYY/MM/DD hh:mm:ss')}
                            • URL: ${emoji.url}
                            `,
							EMOJI: emoji => stripIndents`
                            • Name: \`${emoji.key}\`
                            • Raw: \`${emoji.emoji}\`
                            • Unicode: $(unicode)
                            `,
						},
					},
				},
			},

			ROLE: {
				DESCRIPTION: 'Get information about a role.',
			},

			SERVER: {
				DESCRIPTION: 'Get information on the server.',
			},

			USER: {
				DESCRIPTION: 'Get information about a member.',
			},
		},

		TAGS: {
			DESCRIPTION: {
				CONTENT: stripIndents`Available methods:
				• show \`<tag>\`
				• add \`[--hoist/--pin] [--template] <tag> <content>\`
				• alias \`<--add/--del> <tag> <tagalias>\`
				• del \`<tag>\`
				• edit \`[--hoist/--unhoist] [--template] <tag> <content>\`
				• source \`[--file] <tag>\`
				• info \`<tag>\`
				• search \`<tag>\`
				• list \`[member]\`
				• download \`[member]\`

			   Required: \`<>\` | Optional: \`[]\`

			   For additional \`<...arguments>\` usage refer to the examples below.
		   `,
				USAGE: '<method> <...arguments>',
				EXAMPLES: [
					'show Test',
					'add Test Test',
					'add --hoist/--pin "Test 2" Test2',
					'add --template Test1 ${guild}',
					'alias --add Test1 Test2',
					'alias --del "Test 2" "Test 3"',
					'del Test',
					'edit Test Some new content',
					'edit "Test 1" Some more new content',
					'edit Test --hoist',
					'edit Test --unhoist Some more new content',
					'edit Test --template',
					'source Test',
					'source --file Test',
					'info Test',
					'search Test',
					'list @Cosmzs',
					'download @Cosmzs',
				],
			},

			ADD: {
				DESCRIPTION: 'Adds a tag, usable for everyone on the server (Markdown can be used).',
				PROMPT: {
					START: author => `${author}, what should the tag be named?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** already exists.`,
				},
				PROMPT_2: {
					START: author => `${author}, what should the content of the tag be?`,
				},
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: name => `leave it to me! A tag with the name **${name}** has been added.`,
			},

			ALIAS: {
				DESCRIPTION: 'Alias a tag.',
				PROMPT: {
					START: author => `${author}, what tag do you want to alias?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** does not exists.`,
				},
				PROMPT_2: {
					START: author => `${author}, what alias do you want to apply to this tag?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** already exists.`,
				},
				PROMPT_3: {
					START: author => `${author}, what alias do you want to remove to this tag?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** already exists.`,
				},
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: (first, second, add) => `alias ${second.substring(0, 1900)} ${add ? 'added to' : 'deleted from'} tag ${first}.`,
			},

			DELETE: {
				DESCRIPTION: 'Deletes a tag.',
				PROMPT: {
					START: author => `${author}, what tag do you want to delete?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** does not exists.`,
				},
				OWN_TAG: 'you can only delete your own tags.',
				REPLY: tag => `successfully deleted **${tag}**.`,
			},

			DOWNLOAD: {
				DESCRIPTION: 'Downloads a/all tag(s).',
				REPLY: 'Haiiiii~',
			},

			EDIT: {
				DESCRIPTION: 'Edit a tag (Markdown can be used).',
				PROMPT: {
					START: author => `${author}, what tag do you want to edit?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** does not exists.`,
				},
				PROMPT_2: {
					START: author => `${author}, what should the new content be?`,
				},
				OWN_TAG: 'losers are only allowed to edit their own tags! Hah hah hah!',
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: (tag, hoist, template) => {
					console.log(tag, hoist, template);
					if (hoist && template) {
						return `successfully edited **${tag}** to be hoisted and templated.`;
					}

					if (hoist) {
						return `successfully edited **${tag}** to be hoisted.`;
					}

					if (template) {
						return `successfully edited **${tag}** to be templated.`;
					}

					return `successfully edited **${tag}**.`;
				},
			},

			INFO: {
				DESCRIPTION: 'Displays information about a tag.',
				PROMPT: {
					START: author => `${author}, what tag do you want information on?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** does not exists.`,
				},
			},

			LIST: {
				DESCRIPTION: 'Lists all server tags.',
				NO_TAGS: member => (member ? `**${member}** doesn't have any tags.` : "you don't have any tags."),
				GUILD_NO_TAGS: guild => `**${guild}** doesn't have any tags. Why not add some?`,
			},

			SEARCH: {
				DESCRIPTION: 'Searches a tag.',
				PROMPT: {
					START: author => `${author}, what do you want to search for?`,
				},
				NO_RESULT: query => `No results found with query ${query}.`,
				TOO_BIG: 'the output is way too big to display, make your search more specific and try again!',
			},

			SHOW: {
				DESCRIPTION: 'Displays a tag.',
				PROMPT: {
					START: author => `${author}, what tag do you want to see?`,
				},
			},

			SOURCE: {
				DESCRIPTION: 'Displays a tags source (Highlighted with Markdown).',
				PROMPT: {
					START: author => `${author}, what tag do you want to see the source of?`,
					RETRY: (author, val) => `${author}, a tag with the name **${val}** does not exists.`,
				},
			},
		},

		TWITCH: {
			ONLINE_MESSAGE: '@everyone $(streamer) is live!',
			OFFLINE_MESSAGE: 'This stream has ended, stay tuned for the next ones!',
			DELETED_MESSAGE: stripIndents`Looks like the last notification for \`$(streamer)\` was deleted, I'll send it again in a minute If the stream is still online.
            If you want me to stop notifying this streamer you should use \`$(prefix)twitch rmv $(streamer)\``,
			ONLINE_EMBED: {
				FIELD_CATEGORY: {
					CATEGORY: 'Category',
					GAME: 'Game',
				},
				FIELD_VIEWERS: 'Viewers',
				FOOTER: 'Live for $(duration)',
			},
			OFFLINE_EMBED: {
				DESCRIPTION: stripIndents`
                **Streamed:** $(strmd)
                **Started at:** $(strtd)
                **Ended at:** $(endd)
                **Total time:** $(ttt)
                `,
				FOOTER: '$(streamer) was live',
			},
		},

		UTIL: {
			RUNE: {
				DESCRIPTION: {
					CONTENT: 'Transcribe text to Futhark Runes',
					USAGE: '<text to transcribe>',
					EXAMPLES: ['Cosmzs', 'Nice and beautiful text', 'space:single Nice and beautiful text', 'dot:cross Nice and beautiful text', 'dot:double space:cross Nice and beautiful text'],
				},
				PROMPT: {
					START: author => `${author}, what do you want to transcribe?`,
					RETRY: author => `${author}, what do you want to transcribe?`,
				},
			},
			INFO: {},

			HELP: {
				DESCRIPTION: {
					CONTENT: prefix => stripIndents`Displays a list of available commands, or detailed information for a specified command.
					Use \`${prefix}help --perm\` to hide commands you don't have permission to use.
					Use \`${prefix}help --dm\` to hide commands you cant use on DM's.
                    `,
					USAGE: '[command]',
				},
				REPLY: (prefix, msg) => stripIndents`**A list of available commands.**
                    For additional info on a command, type \`${prefix}help <command>\`
                    Use \`${prefix}help --perm\` to hide commands you don't have permission to use.
                    ${!msg.guild ? `Use \`${prefix}help --dm\` to hide commands you cant use on DM's.` : ''}
                `,
				EMBED: {
					FIELD_COMMANDS: 'Commands',
					FIELD_DESCRIPTION: 'Description',
					FIELD_ALIASES: 'Aliases',
					FIELD_EXAMPLES: 'Examples',
				},
			},

			LANGUAGE: {
				DESCRIPTION: 'Displays or changes the language that the bot uses on this guild.',
				REPLY: language => `The current language for this guild is: \`${language}\``,
				REPLY_2: language => `the language has been reset to \`${language}\``,
				REPLY_3: language => `the language has been set to \`${language}\``,
			},

			PING: {
				DESCRIPTION: "Checks the bot's ping to the Discord servers.",
				RESPONSES: [
					{
						response: 'You had 0.01% chance of getting this answer.',
						chance: 0.0001,
					},
					{ response: "Lost... You're really good playing ping pong! :ping_pong:", chance: 0.1 },
					{
						response: stripIndents`:ping_pong: Pong! \`$(ping)ms\`
                            Heartbeat: \`$(heartbeat)ms\``,
						chance: 0.899,
					},
				],
			},

			PREFIX: {
				DESCRIPTION: 'Displays or changes the prefix of the guild.',
				REPLY: prefix => `The current prefix for this guild is: \`${prefix}\``,
				REPLY_2: prefix => `the prefix has been reset to \`${prefix}\``,
				REPLY_3: prefix => `the prefix has been set to \`${prefix}\``,
			},

			REMINDME: {
				DESCRIPTION: stripIndents`
				Reminds you of something after a certain amount of time.

				**Valid time formats are:**
				\`\`\`css
				╔═══════╦═════════╦═════════╦══════╗
				║ years ║ months  ║ weeks   ║ days ║
				║ year  ║ month   ║ week    ║ day  ║
				║ yrs   ║ mts     ║ w       ║ d    ║
				║ yr    ║ mt      ║         ║      ║
				╠═══════╬═════════╬═════════╬══════╝
				║ hours ║ minutes ║ seconds ║
				║ hour  ║ minute  ║ second  ║
				║ hrs   ║ mins    ║ secs    ║
				║ hr    ║ min     ║ sec     ║
				║ h     ║ m       ║ s       ║
				╚═══════╩═════════╩═════════╝
				\`\`\`\
				**$(prefix)reminder list**
				Shows 10 latest currently running reminders.
				**$(prefix)reminder del <ID>**
				Delete a single reminder by ID.
				**$(prefix)reminder clear**
				Clears all reminders you have set.
				`,
				ADD: {
					TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
					PROMPT_TIME: {
						START: author => `${author}, when do you want me to remind you?`,
						RETRY: author => stripIndents`
						${author}, when do you want me do remind you?
						
						Check \`$(prefix)help remindme\` for more information on valid time formats.`,
					},
					PROMPT_TEXT: {
						START: author => `${author}, what should I remind you of?`,
					},
				},
				LIST: {
					NOT_FOUND: "You don't have any running reminders.",
					TITLE: 'reminders',
					FOOTER_1: `Total of $(qtd) reminder$(s)`,
					FOOTER_2: `Showing latest 10 of $(qtd) reminders`,
				},
				CLEAR: {
					NOT_FOUND: `You don't have anything to clear.`,
					AWAIT_MESSAGE: stripIndents`
					Are you sure you want to clear $(qtd) reminder$(s)?

					Type **y**es to confirm.`,
					TIMEOUT: `You took too long to respond. I guess you don't want to clear your reminders.`,
					REPLY: `Successfully cleared $(qtd) reminder$(s).`,
				},
				DEL: {
					PROMPT: {
						START: author => `${author}, whats the ID of the reminder you want to delete?`,
						RETRY: author => stripIndents`
						${author}, whats the ID of the reminder you want to delete?
						
						Check \`$(prefix)remindme list\` if you're not sure of the ID.`,
					},
					ERROR: stripIndents`
					Could not find that reminder, are you sure you typed the correct ID?
					
					Check \`$(prefix)remindme list\` if you're not sure of the ID.`,
					REPLY: 'Successfully deleted reminder `$(key)`.',
				},
			},

			STATS: {
				DESCRIPTION: 'Displays statistics about the bot.',
			},
		},
	},
} as Messages;
