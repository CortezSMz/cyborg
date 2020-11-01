import { stripIndents } from 'common-tags';
import { Messages } from '../constants';
import moment = require('moment');

export default {
	COMMAND_HANDLER: {
		PROMPT: {
			MODIFY_START: str => {
				if (typeof str === 'string') return `${str}\n\nDigite \`cancelar\` para cancelar o comando.`;
				if (typeof str === 'object')
					return (str = {
						...str,
						content: `${str.content ? str.content : ''}\n\nDigite \`cancelar\` para cancelar o comando.`,
					});
				return '';
			},
			MODIFY_RETRY: str => {
				if (typeof str === 'string') return `${str}\n\nDigite \`cancelar\` para cancelar o comando.`;
				if (typeof str === 'object')
					return (str = {
						...str,
						content: `${str.content ? str.content : ''}\n\nDigite \`cancelar\` para cancelar o comando.`,
					});
				return '';
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
				USER: author => stripIndents`Não posso deixar você fazer isso, ${author}.
                Você precisa de **$(perm)** para usar **$(prefix)$(cmd)**`,
			},
		},
	},

	COMMANDS: {
		ALIASES: {
			'CONFIG-CHECK': ['check'],
			CONFIG: ['config'],
			LANGUAGE: ['language', 'lang'],
			PREFIX: ['prefix'],
			BLACKJACK: ['blackjack'],
			CONNECTFOUR: ['connectfour', 'cf', 'conectequatro', 'connect4'],
			JACKBLACK: ['jackblack'],
			TICTACTOE: ['tictactoe', 'ttt', 'jogodavelha', 'velha'],
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
			'TAG-LIST': ['tags'],
			TAG: ['tag'],
			TWITCH: ['twitch'],
			EMBED: ['embed'],
			HELP: ['help', 'h', 'ajuda'],
			PING: ['ping'],
			'REMINDME-ADD': ['reminder', 'remindme', 'remind'],
			RUNE: ['rune', 'futhark'],
			STATS: ['stats'],
		},

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

		FUN: {
			BLACKJACK: {
				DESCRIPTION: {
					CONTENT: (prefix, user) => stripIndents`
					Digite \`p\` para \`puxar\` ou \`f\` para \`ficar\`.
	
					Digite \`${prefix}blackjack join @${user}\` para se juntar a um jogo.
	
					\`Valete\`, \`Rainha\` e \`Rei\` = \`10\`       \`Ás\` = \`11\` ou \`1\``,
					EXAMPLES: ['join @Cosmzs'],
				},
				PLAYERSTATUS: {
					DRAWING: 'Puxando cartas...',
					LOST: 'Perdeu...',
					STANDING: 'Esperando...',
					TIE: 'Empatou!',
					WON: 'Venceu!!',
				},
				PROMPT: {
					CONTENT: 'Digite `p` para `puxar` ou `f` para `ficar`.',
					PLAYS: [
						['puxar', 'p'],
						['ficar', 'f', 'parar'],
					],
				},
				ENDED: 'O jogo acabou.',
				WAITING: 'Esperando todo mundo finalizar...',
				TIED: 'empatou',
				WON: 'ganhou',
				THE_GAME: 'o jogo!',
			},

			CONNECTFOUR: {},
			SLOTS: {},
			TICTACTOE: {},
		},

		EMBED: {
			DESCRIPTION: {
				CONTENT: 'Ferramenta para criar embeds.',
			},
			EDIT: {
				DESCRIPTION: {
					CONTENT: 'Edita um embed',
				},
			},
			SEND: {
				DESCRIPTION: {
					CONTENT: 'Envia um embed',
				},
				PROMPT: {
					START: 'Qual embed você quer enviar?',
					RETRY: 'Qual embed você quer enviar?',
				},
			},
		},

		CONFIG: {
			DESCRIPTION: {
				CONTENT: stripIndents`Métodos disponíveis:
                    • checar
                    • set \`<opção> <...argumentos>\`
                    • del \`<opção>\`
                    • alternar \`<opção>\`
                    • limpar
                Opções disponíveis:
                    • memberlog \`<#channel>\`
                    • autorole \`<@role>\`
                Opções alternáveis:
                    • rolestate
                Required: \`<>\` | Optional: \`[]\`
            `,
				USAGE: '<método> <...argumentos>',
			},
			TOGGLE: {
				DESCRIPTION: {
					CONTENT: 'Alterna uma opção nas configurações.',
					USAGE: '<método> <...argumentos>',
				},
				REPLY: prefix => stripIndents`
                Quando você implora tanto eu não consigo deixar de te ajudar~
                Use \`${prefix}help config\` para mais informações.
            `,
				ROLE_STATE: {
					DESCRIPTION: {
						CONTENT: 'Ativa ou desativa lembrança de cargos no servidor.',
					},
					REPLY_DEACTIVATED: 'removeu todos os dados!',
					REPLY_ACTIVATED: 'gravou todos os dados!',
				},
			},

			SET: {
				DESCRIPTION: {
					CONTENT: 'Adiciona uma opção nas configurações.',
					USAGE: '<método> <...argumentos>',
				},
				REPLY: prefix => stripIndents`
                Quando você implora tanto eu não consigo deixar de te ajudar~
                Use \`${prefix}help config\` para mais informações.
            `,
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: 'Configura o canal de registo de membros no servidor.',
						USAGE: '<canal>',
						EXAMPLES: ['#entrou-saiu', 'entrou-saiu', '731705121464909824'],
					},
					REPLY: channel => `configurou o registro de membros no canal **${channel}**`,
				},
				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: 'Configura o cargo automático no servidor.',
						USAGE: '<cargo>',
						EXAMPLES: ['@cargo', '706400473669697546'],
					},
					REPLY: role => `novos membros ganharão o cargo **${role}** role`,
				},
			},

			DELETE: {
				DESCRIPTION: {
					CONTENT: 'Deleta uma opção nas configurações.',
					USAGE: '<método> <...argumentos>',
				},
				REPLY: prefix => stripIndents`
                Quando você implora tanto eu não consigo deixar de te ajudar~
                Use \`${prefix}help config\` para mais informações.
            `,
				MEMBER_LOG: {
					DESCRIPTION: {
						CONTENT: 'Deleta o canal de registro de membros no servidor.',
					},
					REPLY: 'deletou o canal de registro de membros.',
				},
				AUTO_ROLE: {
					DESCRIPTION: {
						CONTENT: 'Deleta o cargo automático no servidor.',
					},
					REPLY: 'deletou cargo automático.',
				},
			},

			CLEAR: {
				DESCRIPTION: {
					CONTENT: 'Limpa as configurações do bot no servidor.',
				},
				REPLY: 'limpou as configurações do bot no servidor.',
			},

			CHECK: {
				DESCRIPTION: {
					CONTENT: 'Checa as configurações do bot no servidor.',
				},
			},
		},

		REACTIONROLE: {
			CREATE: {
				DESCRIPTION: 'Cria uma mensagem de **Cargos por Reações** no canal.',
				PROMPT: {
					START_TITLE: author => stripIndents`
					${author}, qual título você quer que a mensagem tenha?

					Dica: pode ser uma frase pequena descrevendo a categoria dos cargos.
					ex: \`CARGOS COLORIDOS\``,
					RETRY_TITLE: author => stripIndents`
					${author}, qual título você quer que a mensagem tenha?

					Dica: pode ser uma frase pequena descrevendo a categoria dos cargos.
					ex: \`CARGOS COLORIDOS\``,
				},
			},
		},

		OWNER: {
			RELOAD: {
				PROMPT: {
					START: author => `${author}, qual módulo você gostaria de recarregar?`,
					RETRY: author => `${author}, por favor, diga um módulo válido!`,
				},
			},

			BLACKLIST: {
				DESCRIPTION: 'Proíbe/Permite um usuário de usar a Cyborg.',
				PROMPT: {
					START: author => `${author}, quem você gostaria de proíbir/permitir?`,
				},
				REPLY: user => `${user}, percebeu o quão poderosa a Cyborg é? Você tem bons olhos~`,
				REPLY_2: user => `${user}, você não é dígno dos poderes de Cyborg~`,
			},

			EVAL: {
				DESCRIPTION: 'Você não pode usar esse comando, por que perderia meu tempo explicando.',
				PROMPT: {
					START: author => `${author}, o que você gostaria de evaluar?`,
				},
			},
		},

		INFO: {
			CHANNEL: {
				DESCRIPTION: {
					CONTENT: 'Mostra informações de um canal.',
					USAGE: '[canal]',
					EXAMPLES: ['#geral', 'geral', '222197033908436994'],
				},
				EMBED: {
					DESCRIPTION: channel => `Informações sobre **${channel.name}** (ID: ${channel.id})`,
					FIELD_INFO: {
						NAME: 'Informações',
						VALUE: channel => stripIndents`
                        • Tipo: ${channel.type}
                        • Tópico: ${channel.topic || 'None'}
                        • NSFW: ${Boolean(channel.nsfw)}
                        • Data de criação: ${moment.utc(channel.createdAt).format('DD/MM/YYYY hh:mm:ss')}
                    `,
					},
				},
			},

			EMOJI: {
				DESCRIPTION: {
					CONTENT: 'Mostra informações sobre um emoji.',
				},
				PROMPT: {
					START: author => `${author}, qual emoji você gostaria de ver informações sobre?`,
					RETRY: author => `${author}, você precisa mandar um emoji válido!`,
				},
				EMBED: {
					DESCRIPTION: {
						GUILDEMOJI: emoji => `Informações sobre ${emoji.name} (ID: ${emoji.id})`,
						EMOJI: emoji => `Informações sobre ${emoji.emoji}`,
					},
					FIELD_INFO: {
						NAME: 'Informações',
						VALUE: {
							GUILDEMOJI: emoji => stripIndents`
                            • Identificador: \`<${emoji.identifier}>\`
                            • Data de criação: ${moment.utc(emoji.createdAt ?? 0).format('DD/MM/YYYY hh:mm:ss')}
                            • URL: ${emoji.url}
                            `,
							EMOJI: emoji => stripIndents`
                            • Nome: \`${emoji.key}\`
                            • Crú: \`${emoji.emoji}\`
                            • Unicode: $(unicode)
                            `,
						},
					},
				},
			},

			ROLE: {
				DESCRIPTION: 'Mostra informações sobre um cargo.',
			},

			SERVER: {
				DESCRIPTION: 'Mostra informações sobre o servidor.',
			},

			USER: {
				DESCRIPTION: 'Mostra informações sobre um usuário.',
			},
		},

		TAGS: {
			DESCRIPTION: {
				CONTENT: stripIndents`Métodos disponíveis:
				• mostrar \`<tag>\`
				• add \`[--hoist/--pin] [--template] <tag> <conteúdo>\`
				• apelido \`<--add/--del> <tag> <apelidodatag>\`
				• del \`<tag>\`
				• editar \`[--hoist/--unhoist] [--template] <tag> <conteúdo>\`
				• cru \`[--file] <tag>\`
				• info \`<tag>\`
				• procurar \`<tag>\`
				• listar \`[member]\`
				• baixar \`[member]\`

			   Obrigatório: \`<>\` | Opcional: \`[]\`

			   Para usos adicionais dos \`<...argumentos>\`, veja os exemplos abaixo.
		   `,
				USAGE: '<método> <...argumentos>',
				EXAMPLES: [
					'mostrar Teste',
					'add Teste Teste',
					'add --hoist/--pin "Teste 2" Teste2',
					'add --template Teste1 ${guild}',
					'apelido --add Teste1 Teste2',
					'apelido --del "Teste 2" "Teste 3"',
					'del Teste',
					'editar Teste Novo conteúdo pra tag',
					'editar "Teste 1" Outro novo conteúdo pra tag',
					'editar Teste --hoist',
					'editar Teste --unhoist Outro novo conteúdo pra tag',
					'editar Teste --template',
					'cru Teste',
					'cru --file Teste',
					'info Teste',
					'procurar Teste',
					'listar @Cosmzs',
					'baixar @Cosmzs',
				],
			},

			ADD: {
				DESCRIPTION: 'Adiciona uma nova tag, usável por todos no servidor (Markdown pode ser usado).',
				PROMPT: {
					START: author => `${author}, como a tag deveria se chamar?`,
					RETRY: (author, val) => `${author}, já existe uma tag com o nome **${val}**, use outro.`,
				},
				PROMPT_2: {
					START: author => `${author}, qual o conteúdo dessa tag?`,
				},
				TOO_LONG: 'mensagens tem um limite de 2000 caracteres!',
				REPLY: name => `pode deixar! A tag com nome **${name}** foi adicionada.`,
			},

			ALIAS: {
				DESCRIPTION: 'Adiciona um apelido a uma tag.',
				PROMPT: {
					START: author => `${author}, qual tag você quer apelidar?`,
					RETRY: (author, val) => `${author}, não existe nenhuma tag com o nome **${val}**.`,
				},
				PROMPT_2: {
					START: author => `${author}, qual apelido você quer adicionar nessa tag?`,
					RETRY: (author, val) => `${author}, já existe uma tag com o nome **${val}**.`,
				},
				PROMPT_3: {
					START: author => `${author}, qual apelido você quer remover dessa tag?`,
					RETRY: (author, val) => `${author}, já existe uma tag com o nome **${val}**.`,
				},
				TOO_LONG: 'mensagens tem um limite de 2000 caracteres!',
				REPLY: (first, second, add) => `apelido ${second.substring(0, 1900)} ${add ? 'adicionado a' : 'deletado da'} tag ${first}.`,
			},

			DELETE: {
				DESCRIPTION: 'Deleta uma tag.',
				PROMPT: {
					START: author => `${author}, qual tag você quer deletar?`,
					RETRY: (author, val) => `${author}, não existe nenhuma tag com o nome **${val}**.`,
				},
				OWN_TAG: 'você só pode deletar suas próprias tags.',
				REPLY: tag => `deletou a tag **${tag}** com sucesso.`,
			},

			DOWNLOAD: {
				DESCRIPTION: 'Baixa todas tags de alguém.',
				REPLY: '~',
			},

			EDIT: {
				DESCRIPTION: 'Edita uma tag (Markdown pode ser usado).',
				PROMPT: {
					START: author => `${author}, qual tag você quer editar?`,
					RETRY: (author, val) => `${author}, não existe nenhuma tag com o nome **${val}**.`,
				},
				PROMPT_2: {
					START: author => `${author}, what should the new content be?`,
				},
				OWN_TAG: 'losers are only allowed to edit their own tags! Hah hah hah!',
				TOO_LONG: 'you must still have water behind your ears to not realize that messages have a limit of 2000 characters!',
				REPLY: (tag, hoist, template) => {
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
					RETRY: (author, val) => `${author}, não existe nenhuma tag com o nome **${val}**.`,
				},
			},

			LIST: {
				DESCRIPTION: 'Lists all server tags.',
				NO_TAGS: member => (member ? `**${member}** não tem nenhuma tag.` : 'você não tem nenhuma tag.'),
				GUILD_NO_TAGS: guild => `**${guild}** não tem nenhuma tag. Por que não adicionar algumas?`,
			},

			SEARCH: {
				DESCRIPTION: 'Procura uma tag.',
				PROMPT: {
					START: author => `${author}, o que você quer procurar?`,
				},
				NO_RESULT: query => `Nenhum resultado com a pesquisa **${query}**.`,
				TOO_BIG: 'o resultado é muito grande para mostrar, pense numa pesquisa mais específica e tente de novo!',
			},

			SHOW: {
				DESCRIPTION: 'Mostra uma tag.',
				PROMPT: {
					START: author => `${author}, qual tag você quer ver?`,
				},
			},

			SOURCE: {
				DESCRIPTION: 'Mostra uma tag crua (Com markdown).',
				PROMPT: {
					START: author => `${author}, qual tag você quer ver o conteúdo crú?`,
					RETRY: (author, val) => `${author}, não existe nenhuma tag com o nome **${val}**.`,
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
					START: author => `${author}, o que você deseja transcrever?`,
					RETRY: author => `${author}, o que você deseja transcrever?`,
				},
			},
			INFO: {},

			HELP: {
				DESCRIPTION: {
					CONTENT: prefix => stripIndents`Mostra uma lista de comandos disponíveis, ou detalha informações para um comando específico.
					Use \`${prefix}ajuda --perm\` para esconder comandos que você não tem permissão para usar.
					Use \`${prefix}ajuda --dm\` para esconder comandos que você não pode usar em DM's.
                    `,
					USAGE: '[comando]',
				},
				REPLY: (prefix, msg) => stripIndents`**Lista de comandos disponíveis.**
                    Para informações adicionais sobre um comando, use \`${prefix}ajuda <comando>\`
                    Use \`${prefix}ajuda --perm\` para esconder comandos que você não tem permissão para usar.
                    ${!msg.guild ? `Use \`${prefix}ajuda --dm\` para esconder comandos que você não pode usar em DM's.` : ''}
                `,
				EMBED: {
					FIELD_COMMANDS: 'Comandos',
					FIELD_DESCRIPTION: 'Descrição',
					FIELD_ALIASES: 'Apelidos',
					FIELD_EXAMPLES: 'Exemplos',
				},
			},

			LANGUAGE: {
				DESCRIPTION: 'Mostra ou altera o idioma utilizada pela Cyborg neste servidor.',
				REPLY: language => `O idioma atual deste servidor é: \`${language}\``,
				REPLY_2: language => `o idioma foi resetado para \`${language}\``,
				REPLY_3: language => `o idioma foi configurado para \`${language}\``,
			},

			PING: {
				DESCRIPTION: 'Confere o ping do bot em relação aos servidores do Discord.',
				RESPONSES: [
					{
						response: 'Você tinha 0.01% de chance de tirar essa resposta.',
						chance: 0.0001,
					},
					{ response: 'Perdi... Você é muito bom no ping pong! :ping_pong:', chance: 0.1 },
					{
						response: stripIndents`:ping_pong: Pong! \`$(ping)ms\`
                            Heartbeat: \`$(heartbeat)ms\``,
						chance: 0.95,
					},
				],
			},

			PREFIX: {
				DESCRIPTION: 'Mostra ou altera o prefixo do bot no servidor.',
				REPLY: prefix => `Prefixo atual para este servidor é: \`${prefix}\``,
				REPLY_2: prefix => `o prefixo foi resetado para \`${prefix}\``,
				REPLY_3: prefix => `o prefixo foi configurado para \`${prefix}\``,
			},

			REMINDME: {
				DESCRIPTION: stripIndents`
				Te lembra de alguma coisa depois de um período de tempo.

				**Formatos válidos são:**
				\`\`\`css
				╔═══════╦═════════╦══════════╦══════╗
				║ anos  ║ meses   ║ semanas  ║ dias ║
				║ ano   ║ mes     ║ semana   ║ dia  ║
				║ a     ║         ║          ║ d    ║
				╠═══════╬═════════╬══════════╬══════╝
				║ horas ║ minutos ║ segundos ║
				║ hora  ║ minuto  ║ segundo  ║
				║ hrs   ║ mins    ║ segs     ║
				║ hr    ║ min     ║ seg      ║
				║ h     ║ m       ║ s        ║
				╚═══════╩═════════╩══════════╝
				\`\`\`\
				**$(prefix)reminder listar**
				Mostra seus 10 reminders mais recentes.
				**$(prefix)reminder del <ID>**
				Deleta um único reminder pelo ID.
				**$(prefix)reminder limpar**
				Limpa todos os seus reminders.
				`,
				ADD: {
					TOO_LONG: 'mensagens tem um limite de 2000 caracteres!',
					PROMPT_TIME: {
						START: author => `${author}, daqui a quanto tempo você quer que eu te lembre?`,
						RETRY: author => stripIndents`
						${author}, daqui a quanto tempo você quer que eu te lembre?
						
						Use \`$(prefix)ajuda remindme\` para mais formatos de tempo válidos.`,
					},
					PROMPT_TEXT: {
						START: author => `${author}, o que você quer que eu te lembre?`,
					},
				},
				LIST: {
					NOT_FOUND: 'Você não tem nenhum reminder configurado.',
					TITLE: 'reminders',
					FOOTER_1: `Total de $(qtd) reminder$(s)`,
					FOOTER_2: `Mostrando últimos 10 de $(qtd) reminders`,
				},
				CLEAR: {
					NOT_FOUND: 'Você não tem nenhum reminder para limpar.',
					AWAIT_MESSAGE: stripIndents`
					Você tem certeza que quer limpar $(qtd) reminder$(s)?

					Digite **s**im para confirmar.`,
					TIMEOUT: 'Você demorou muito para responder. Acho que não quer limpar os seus reminders.',
					REPLY: 'Limpou todos os seus $(qtd) reminder$(s).',
				},
				DEL: {
					PROMPT: {
						START: author => `${author}, qual o ID do reminder que você quer deletar?`,
						RETRY: author => stripIndents`
						${author}, qual o ID do reminder que você quer deletar?
						
						Use \`$(prefix)remindme list\` para conferir os seus reminders.`,
					},
					ERROR: stripIndents`
					Não consegui encontrar esse reminder, você tem certeza que digitou o ID correto?
					
					Use \`$(prefix)remindme list\` para conferir os seus reminders.`,
					REPLY: 'Deletou reminder `$(key)` com sucesso.',
				},
			},

			STATS: {
				DESCRIPTION: 'Mostra estatísticas do bot.',
			},
		},
	},
} as Messages;
