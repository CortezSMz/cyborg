import { stripIndents } from 'common-tags';
import { User, TextChannel, GuildEmoji, MessageEmbed, Util, Message } from 'discord.js';
import { Messages } from '../constants';
import moment = require('moment');

const MESSAGES: Messages = {
	COMMAND_HANDLER: {
		PROMPT: {
			MODIFY_START: (str: string | { content: string; embed: MessageEmbed }) => {
				if (typeof str === 'string') return `${str}\n\nDigite \`cancelar\` para cancelar o comando.`;
				if (typeof str === 'object')
					return (str = {
						...str,
						content: `${str.content ? str.content : ''}\n\nDigite \`cancelar\` para cancelar o comando.`,
					});
			},
			MODIFY_RETRY: (str: string | { content: string; embed: MessageEmbed }) => {
				if (typeof str === 'string') return `${str}\n\nDigite \`cancelar\` para cancelar o comando.`;
				if (typeof str === 'object')
					return (str = {
						...str,
						content: `${str.content ? str.content : ''}\n\nDigite \`cancelar\` para cancelar o comando.`,
					});
			},
			CANCEL_WORD: 'cancelar',
			STOP_WORD: 'parar',
			TIMEOUT: 'Você demorou demais para responder, o comando foi cancelado.',
			ENDED: 'Mais de 3 tentativas e você não conseguiu... o comando foi cancelado.',
			CANCEL: 'Comando cancelado.',
		},
	},

	LISTENERS: {
		CLIENT: {},

		COMMAND_HANDLER: {
			MISSING_PERMISSIONS: {
				CLIENT: stripIndents`Humpf. Não posso te ajudar se você não deixar.
                Eu preciso de **$(perm)** pra usar **$(prefix)$(cmd)**`,
				USER: (author: User) => stripIndents`Não posso deixar você fazer isso, ${author}.
                Você precisa de **$(perm)** para usar **$(prefix)$(cmd)**`,
			},
		},
	},

	COMMANDS: {
		CATEGORIES: {
			FUN: 'Diversão',
			CONFIG: 'Configurações',
			INFO: 'Informações',
			OWNER: 'Dono',
			REACTIONROLE: 'Cargos por Reações',
			TAG: 'Tags',
			UTIL: 'Utilidades',
			TWITCH: 'Twitch',
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
                    • check
                    • set \`<key> <...arguments>\`
                    • del \`<key>\`
                    • toggle \`<key>\`
                    • clear
                Available keys:
                    • memberlog \`<#channel>\`
                    • autorole \`<@role>\`
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
				REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
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
				REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
                When you beg me so much I just can't not help you~
                Check \`${prefix}help config\` for more information.
            `,
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: 'Sets member log on the server.',
						USAGE: '<channel>',
						EXAMPLES: ['#memberlog', 'member-log', '731705121464909824'],
					},
					REPLY: (channel: string) => `set member log channel to **${channel}**`,
				},
				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: 'Sets automatic roles on the server.',
						USAGE: '<role>',
						EXAMPLES: ['@role', '706400473669697546'],
					},
					REPLY: (channel: string) => `new members will get the **${channel}** role`,
				},
			},

			DELETE: {
				DESCRIPTION: {
					CONTENT: 'Deletes a value to the config.',
					USAGE: '<method> <...arguments>',
				},
				REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
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
					START_TITLE: (author: User | null) => stripIndents`
					${author}, what would you like the title of the embed to be?

					Tip: could be a small phrase describing the roles on this embed.
					e.g. \`COLORFUL ROLES\``,
					RETRY_TITLE: (author: User | null) => stripIndents`
					${author}, what would you like the title of the embed to be?

					Tip: could be a small phrase describing the roles on this embed.
					e.g. \`COLOR ROLES\``,
				},
			},
		},

		OWNER: {
			RELOAD: {
				PROMPT: {
					START: (author: User | null) => `${author}, what module would you like to reload?`,
					RETRY: (author: User | null) => `${author}, please provide a valid module!`,
				},
			},

			BLACKLIST: {
				DESCRIPTION: 'Prohibit/Allow a user from using Cyborg.',
				PROMPT: {
					START: (author: User | null) => `${author}, who would you like to blacklist/unblacklist?`,
				},
				REPLY: (user: string) => `${user}, have you realized Cyborg's greatness? You've got good eyes~`,
				REPLY_2: (user: string) => `${user}, you are not worthy of Cyborg's luck~`,
			},

			EVAL: {
				DESCRIPTION: "You can't use this anyway, so why explain.",
				PROMPT: {
					START: (author: User | null) => `${author}, what would you like to evaluate?`,
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
					DESCRIPTION: (channel: TextChannel) => `Info about **${channel.name}** (ID: ${channel.id})`,
					FIELD_INFO: {
						NAME: 'Info',
						VALUE: (channel: TextChannel) => stripIndents`
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
					START: (author: User | null) => `${author}, what emoji would you like information about?`,
					RETRY: (author: User | null) => `${author}, please provide a valid emoji!`,
				},
				EMBED: {
					DESCRIPTION: {
						GUILDEMOJI: (emoji: GuildEmoji) => `Info about ${emoji.name} (ID: ${emoji.id})`,
						EMOJI: (emoji: any) => `Info about ${emoji.emoji}`,
					},
					FIELD_INFO: {
						NAME: 'Info',
						VALUE: {
							GUILDEMOJI: (emoji: GuildEmoji) => stripIndents`
                            • Identifier: \`<${emoji.identifier}>\`
                            • Creation Date: ${moment.utc(emoji.createdAt ?? 0).format('YYYY/MM/DD hh:mm:ss')}
                            • URL: ${emoji.url}
                            `,
							EMOJI: (emoji: any) => stripIndents`
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
			DESCRIPTION: stripIndents`Available methods:
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

			ADD: {
				DESCRIPTION: 'Adds a tag, usable for everyone on the server (Markdown can be used).',
				PROMPT: {
					START: (author: User | null) => `${author}, what should the tag be named?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** already exists.`,
				},
				PROMPT_2: {
					START: (author: User | null) => `${author}, what should the content of the tag be?`,
				},
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: (name: string) => `leave it to me! A tag with the name **${name}** has been added.`,
			},

			ALIAS: {
				DESCRIPTION: 'Alias a tag.',
				PROMPT: {
					START: (author: User | null) => `${author}, what tag do you want to alias?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** does not exists.`,
				},
				PROMPT_2: {
					START: (author: User | null) => `${author}, what alias do you want to apply to this tag?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** already exists.`,
				},
				PROMPT_3: {
					START: (author: User | null) => `${author}, what alias do you want to remove to this tag?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** already exists.`,
				},
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: (first: string, second: string, add: boolean) => `alias ${second.substring(0, 1900)} ${add ? 'added to' : 'deleted from'} tag ${first}.`,
			},

			DELETE: {
				DESCRIPTION: 'Deletes a tag.',
				PROMPT: {
					START: (author: User | null) => `${author}, what tag do you want to delete?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** does not exists.`,
				},
				OWN_TAG: 'you can only delete your own tags.',
				REPLY: (tag: string) => `successfully deleted **${tag}**.`,
			},

			DOWNLOAD: {
				DESCRIPTION: 'Downloads a/all tag(s).',
				REPLY: 'Haiiiii~',
			},

			EDIT: {
				DESCRIPTION: 'Edit a tag (Markdown can be used).',
				PROMPT: {
					START: (author: User | null) => `${author}, what tag do you want to edit?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** does not exists.`,
				},
				PROMPT_2: {
					START: (author: User | null) => `${author}, what should the new content be?`,
				},
				OWN_TAG: 'losers are only allowed to edit their own tags! Hah hah hah!',
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: (tag: string, hoist: boolean, template: boolean) => {
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
					START: (author: User | null) => `${author}, what tag do you want information on?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** does not exists.`,
				},
			},

			LIST: {
				DESCRIPTION: 'Lists all server tags.',
				NO_TAGS: (member?: string) => (member ? `**${member}** doesn't have any tags.` : "you don't have any tags."),
				GUILD_NO_TAGS: (guild: string) => `**${guild}** doesn't have any tags. Why not add some?`,
			},

			SEARCH: {
				DESCRIPTION: 'Searches a tag.',
				PROMPT: {
					START: (author: User | null) => `${author}, what do you want to search for?`,
				},
				NO_RESULT: (query: string) => `No results found with query ${query}.`,
				TOO_BIG: 'the output is way too big to display, make your search more specific and try again!',
			},

			SHOW: {
				DESCRIPTION: 'Displays a tag.',
				PROMPT: {
					START: (author: User | null) => `${author}, what tag do you want to see?`,
				},
			},

			SOURCE: {
				DESCRIPTION: 'Displays a tags source (Highlighted with Markdown).',
				PROMPT: {
					START: (author: User | null) => `${author}, what tag do you want to see the source of?`,
					RETRY: (author: User | null, val: string) => `${author}, a tag with the name **${val}** does not exists.`,
				},
			},
		},

		TWITCH: {
			ONLINE_MESSAGE: '@everyone $(streamer) está ao vivo!',
			OFFLINE_MESSAGE: 'Essa stream acabou, fique esperto para as próximas!',
			DELETED_MESSAGE: stripIndents`Parece que a última notificação de \`$(streamer)\` foi deletada, vou enviar novamente em alguns minutos se eu ver que ele ainda está online.
            Se você quiser que eu pare de notificar esse streamer use \`$(prefix)twitch rmv $(streamer)\``,
			ONLINE_EMBED: {
				FIELD_CATEGORY: {
					CATEGORY: 'Categoria',
					GAME: 'Jogo',
				},
				FIELD_VIEWERS: 'Viewers',
				FOOTER: 'Ao vivo a $(duration)',
			},
			OFFLINE_EMBED: {
				DESCRIPTION: stripIndents`
                **Streamou:** $(strmd)
                **Começou:** $(strtd)
                **Terminou:** $(endd)
                **Duração total:** $(ttt)
                `,
				FOOTER: '$(streamer) esteve ao vivo',
			},
		},

		UTIL: {
			RUNE: {
				DESCRIPTION: {
					CONTENT: 'Transcreve texto para Runas Futhark',
					USAGE: '<texto>',
					EXAMPLES: ['Cosmzs', 'Texto bonito e legal', 'espaço:unico Texto bonito e legal', 'ponto:cruz Texto bonito e legal', 'ponto:duplo espaço:cruz Texto bonito e legal'],
				},
				PROMPT: {
					START: (author: User) => `${author}, o que você deseja transcrever?`,
					RETRY: (author: User) => `${author}, o que você deseja transcrever?`,
				},
			},
			INFO: {},

			HELP: {
				DESCRIPTION: {
					CONTENT: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`Displays a list of available commands, or detailed information for a specified command.
					Use \`${prefix}help --perm\` to hide commands you don't have permission to use.
					Use \`${prefix}help --dm\` to hide commands you cant use on DM's.
                    `,
					USAGE: '[command]',
				},
				REPLY: (prefix: string | string[] | Promise<string | string[]>, msg: Message) => stripIndents`**A list of available commands.**
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
				REPLY: (language: string) => `The current language for this guild is: \`${language}\``,
				REPLY_2: (language: string) => `the language has been reset to \`${language}\``,
				REPLY_3: (language: string) => `the language has been set to \`${language}\``,
			},

			PING: {
				DESCRIPTION: 'Confere o ping do bot em relação aos servidores do Discord.',
				RESPONSES: [
					{
						response: 'Você tinha 0.01% de chance de tirar essa resposta.',
						chance: 0.0001,
					},
					{ response: 'Não.', chance: 0.1 },
					{
						response: stripIndents`:ping_pong: Pong! \`$(ping)ms\`
                            Heartbeat: \`$(heartbeat)ms\``,
						chance: 0.95,
					},
				],
			},

			PREFIX: {
				DESCRIPTION: 'Displays or changes the prefix of the guild.',
				REPLY: (prefix: string | string[] | Promise<string | string[]>) => `The current prefix for this guild is: \`${prefix}\``,
				REPLY_2: (prefix: string) => `the prefix has been reset to \`${prefix}\``,
				REPLY_3: (prefix: string) => `the prefix has been set to \`${prefix}\``,
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
						START: (author: User | null) => `${author}, when do you want me to remind you?`,
						RETRY: (author: User | null) => stripIndents`
						${author}, when do you want me do remind you?
						
						Check \`$(prefix)help remindme\` for more information on valid time formats.`,
					},
					PROMPT_TEXT: {
						START: (author: User | null) => `${author}, what should I remind you of?`,
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
						START: (author: User | null) => `${author}, whats the ID of the reminder you want to delete?`,
						RETRY: (author: User | null) => stripIndents`
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
};

export default { MESSAGES };
