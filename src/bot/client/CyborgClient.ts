import { AkairoClient, CommandHandler, Flag, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { Message, Util, Collection } from 'discord.js';
import { join } from 'path';
import { Logger } from 'winston';
import TwitchScheduler from '../structures/TwitchScheduler';
import RemindmeScheduler from '../structures/RemindmeScheduler';
import HasuraProvider from '../structures/SettingsProvider';
import { LOCALE, PRODUCTION, SETTINGS, CYBORG } from '../util/constants';
import { GRAPHQL, graphQLClient } from '../util/graphQL';
import { Tags, TagsInsertInput } from '../util/graphQLTypes';
import { EVENTS, logger, TOPICS } from '../util/logger';
import ms from '../util/timeParser';

declare module 'discord-akairo' {
	interface AkairoClient {
		logger: Logger;
		settings: HasuraProvider;
		commandHandler: CommandHandler;
		config: CyborgOptions;
		remindmeScheduler: RemindmeScheduler;
		twitchScheduler: TwitchScheduler;
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
				modifyStart: (message: Message, str) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
				modifyRetry: (message: Message, str) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
				cancelWord: (message: Message) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.CANCEL_WORD,
				stopWord: (message: Message) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.STOP_WORD,
				timeout: (message: Message) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.TIMEOUT,
				ended: (message: Message) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.ENDED,
				cancel: (message: Message) => LOCALE(message.guild!).COMMAND_HANDLER.PROMPT.CANCEL,
				retries: 3,
				time: 30000,
			},
			otherwise: '',
		},
	});

	public inhibitorHandler = new InhibitorHandler(this, { directory: join(__dirname, '..', 'inhibitors') });

	public listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'listeners') });

	public config: CyborgOptions;

	public remindmeScheduler = new RemindmeScheduler(this);

	public twitchScheduler = new TwitchScheduler(this);

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
				messageCacheMaxSize: 1000,
				//disableMentions: 'everyone',
				partials: ['MESSAGE', 'REACTION'],
				// ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] },
			},
		);

		this.root = config.root;

		this.commandHandler.resolver.addType('duration', (_, str): number | null => {
			if (!str) return null;
			const time = ms(str);
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
			const [tag] = tags.filter((t) => t.name === phrase || t.aliases.includes(phrase));

			return tag || Flag.fail(phrase);
		});

		this.commandHandler.resolver.addType('existingTag', async (message, phrase) => {
			if (!message.guild) return Flag.fail(phrase);
			if (!phrase) return Flag.fail(phrase);
			const phraseArr = phrase.split(',');
			phraseArr.forEach((s) => Util.cleanContent(s.trim().toLowerCase(), message));
			const { data } = await graphQLClient.query<any, TagsInsertInput>({
				query: GRAPHQL.QUERY.TAGS_TYPE,
				variables: {
					guild: message.guild.id,
				},
			});
			let tags: Tags[];
			if (PRODUCTION) tags = data.tags;
			else tags = data.tagsStaging;
			const [tag] = tags.filter((t) => phraseArr.some((p) => p === t.name || t.aliases.includes(p)));

			return tag ? Flag.fail(tag.name) : phrase;
		});

		this.config = config;

		process.on('unhandledRejection', (err: any) => {
			this.logger.error(err, { topic: TOPICS.UNHANDLED_REJECTION });
		});
	}

	private async _init() {
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

	public async start() {
		await this._init();
		return this.login(this.config.token);
	}
}
