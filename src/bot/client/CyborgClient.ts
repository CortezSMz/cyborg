import { AkairoClient, CommandHandler, Flag, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { Message, Util, Intents, Guild } from 'discord.js';
import { join } from 'path';
import { Logger } from 'winston';
import TwitchScheduler from '../structures/TwitchScheduler';
import RemindmeScheduler from '../structures/RemindmeScheduler';
import HasuraProvider from '../structures/SettingsProvider';
import { PRODUCTION, SETTINGS, CYBORG, Messages } from '../util/Constants';
import { GRAPHQL, graphQLClient } from '../util/graphQL';
import { Tags, TagsInsertInput } from '../util/graphQLTypes';
import { EVENTS, logger, TOPICS } from '../util/Logger';
import ms from '../util/TimeParser';
import CyborgUtil from '../util/Util';

declare module '../util/locale' {
	interface Msgs {
		[key: string]: Messages;
	}
}

declare module 'discord-akairo' {
	interface AkairoClient {
		logger: Logger;
		settings: HasuraProvider;
		commandHandler: CommandHandler;
		config: CyborgOptions;
		remindmeScheduler: RemindmeScheduler;
		twitchScheduler: TwitchScheduler;
		LOCALE(language: ('EN' | 'PTBR') | Guild): Messages;
	}
}

interface CyborgOptions {
	owner?: string;
	token?: string;
	root: string;
}

export default class CyborgClient extends AkairoClient {
	public root: string;

	public logger = logger;

	public settings = new HasuraProvider();

	public config: CyborgOptions;

	public LOCALE: (language: ('EN' | 'PTBR') | Guild) => Messages;

	public inhibitorHandler = new InhibitorHandler(this, { directory: join(__dirname, '..', 'inhibitors') });

	public listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'listeners') });

	public remindmeScheduler = new RemindmeScheduler(this);

	public twitchScheduler = new TwitchScheduler(this);

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, '..', 'commands'),
		prefix: (message: Message): string => this.settings.get(message.guild!, SETTINGS.PREFIX, process.env.COMMAND_PREFIX),
		aliasReplacement: /-/g,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 3000,
		argumentDefaults: {
			prompt: {
				modifyStart: (message: Message, str) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
				modifyRetry: (message: Message, str) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
				cancelWord: (message: Message) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.CANCEL_WORD,
				stopWord: (message: Message) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.STOP_WORD,
				timeout: (message: Message) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.TIMEOUT,
				ended: (message: Message) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.ENDED,
				cancel: (message: Message) => this.LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.CANCEL,
				retries: 3,
				time: 30000,
			},
			otherwise: (_: Message, { failure }: { failure: { value: string } }) => failure.value,
		},
	});

	// @ts-ignore
	public setTimeout_(fn, delay) {
		const maxDelay = Math.pow(2, 31) - 1;
		if (delay > maxDelay) {
			const args = arguments;
			args[1] -= maxDelay;
			return setTimeout(function () {
				// @ts-ignore
				setTimeout_.apply(undefined, args);
			}, maxDelay);
		}
		// @ts-ignore
		return setTimeout.apply(undefined, arguments);
	}

	public constructor(config: CyborgOptions) {
		super(
			{ ownerID: config.owner },
			{
				//disableMentions: 'everyone',
				messageCacheMaxSize: 1000,
				partials: ['MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER'],
				ws: {
					intents: new Intents().add(Intents.NON_PRIVILEGED, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES),
				},
			}
		);

		this.LOCALE = CyborgUtil.LOCALE;

		this.root = config.root;

		this.commandHandler.resolver.addType('duration', (_, phrase): number | null => {
			if (!phrase) return null;
			const time = ms(phrase);
			if (time && time >= 1000 && time <= 224763304449000 && !isNaN(time)) return time;
			return null;
		});

		this.commandHandler.resolver.addType('tag', async (message, phrase) => {
			if (!message.guild) return Flag.fail(phrase);
			if (!phrase) return Flag.fail(phrase);
			phrase = Util.cleanContent(phrase.toLowerCase(), message);
			const { data } = await graphQLClient.query<any, TagsInsertInput>({
				query: GRAPHQL.QUERY.TAGS_TYPE,
				variables: {
					guild: message.guild.id,
				},
			});
			let tags: Tags[];
			if (PRODUCTION) tags = data.tags;
			else tags = data.tagsStaging;
			const [tag] = tags.filter(t => t.name === phrase || t.aliases.includes(phrase));

			return tag || Flag.fail(phrase);
		});

		this.commandHandler.resolver.addType('existingTag', async (message, phrase) => {
			if (!message.guild) return Flag.fail(phrase);
			if (!phrase) return Flag.fail(phrase);
			const phraseArr = phrase.split(',');
			phraseArr.forEach(s => Util.cleanContent(s.trim().toLowerCase(), message));
			const { data } = await graphQLClient.query<any, TagsInsertInput>({
				query: GRAPHQL.QUERY.TAGS_TYPE,
				variables: {
					guild: message.guild.id,
				},
			});
			let tags: Tags[];
			if (PRODUCTION) tags = data.tags;
			else tags = data.tagsStaging;
			const [tag] = tags.filter(t => phraseArr.some(p => p === t.name || t.aliases.includes(p)));

			return tag ? Flag.fail(tag.name) : phrase;
		});

		this.config = config;

		process.on('unhandledRejection', (err: any) => {
			this.logger.error(err, { topic: TOPICS.UNHANDLED_REJECTION });
		});
	}

	private async _init(): Promise<void> {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler,
		});

		this.commandHandler.loadAll();
		this.logger.info(CYBORG.COMMAND_HANDLER.LOADED, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.inhibitorHandler.loadAll();
		this.logger.info(CYBORG.INHIBITOR_HANDLER.LOADED, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.listenerHandler.loadAll();
		this.logger.info(CYBORG.LISTENER_HANDLER.LOADED, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		await this.settings.init();
		this.logger.info(CYBORG.SETTINGS.INIT, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
	}

	public async start(): Promise<string> {
		await this._init();
		return this.login(this.config.token);
	}
}
