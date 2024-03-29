import { stripIndents } from 'common-tags';
import CyborgCommand from '../../structures/CyborgCommand';
import { Message, Util } from 'discord.js';
import * as util from 'util';

const NL = '!!NL!!';
const NL_PATTERN = new RegExp(NL, 'g');

export default class EvalCommand extends CyborgCommand {
	public hrStart: [number, number] | undefined;

	public lastMessage: any;

	public lastResult = null;

	private readonly _sensitivePattern = null;

	public constructor() {
		super('eval', {
			description: {
				content: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.OWNER.EVAL.DESCRIPTION,
				usage: () => '<code>',
				examples: () => null,
			},
			category: 'owner',
			ownerOnly: true,
			ratelimit: 2,
			args: [
				{
					id: 'code',
					match: 'content',
					type: 'string',
					prompt: {
						start: (message: Message) => this.client.LOCALE(message.guild!).COMMANDS.OWNER.EVAL.PROMPT.START(message.author),
					},
				},
			],
		});
	}

	public async exec(message: Message, { code }: { code: string }) {
		// @ts-expect-error
		const { client, lastResult } = this;
		// @ts-expect-error
		const doReply = async (val: string | Error) => {
			if (val instanceof Error) {
				message.util?.send(`Callback error: \`${val}\``);
			} else {
				const result = this._result(val, process.hrtime(this.hrStart));
				for (const res of result) message.util?.send(res);
			}
		};
		/* eslint-enable */

		let hrDiff;
		try {
			const hrStart = process.hrtime();
			this.lastResult = eval(code); // eslint-disable-line
			hrDiff = process.hrtime(hrStart);
		} catch (error) {
			return message.util?.send(`Error while evaluating: \`${error}\``);
		}

		this.hrStart = process.hrtime();
		const result = this._result(this.lastResult ?? '', hrDiff, code);
		// @ts-ignore
		if (Array.isArray(result)) return result.map(async res => message.util?.send(res));
		return message.util?.send(result);
	}

	private _result(result: string, hrDiff: [number, number], input: string | null = null) {
		const inspected = util
			.inspect(result, { depth: 0 })
			.replace(NL_PATTERN, '\n')
			.replace(this.sensitivePattern ?? '', '--snip--');
		const split = inspected.split('\n');
		const last = inspected.length - 1;
		const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0];
		const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'" ? split[split.length - 1] : inspected[last];
		const prepend = `\`\`\`javascript\n${prependPart}\n`;
		const append = `\n${appendPart}\n\`\`\``;
		if (input) {
			return Util.splitMessage(
				stripIndents`
				*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`,
				{ maxLength: 1900, prepend, append }
			);
		}

		return Util.splitMessage(
			stripIndents`
			*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
			\`\`\`javascript
			${inspected}
			\`\`\`
		`,
			{ maxLength: 1900, prepend, append }
		);
	}

	private get sensitivePattern() {
		if (!this._sensitivePattern) {
			const token = this.client.token?.split('').join('[^]{0,2}');
			const revToken = this.client.token?.split('').reverse().join('[^]{0,2}');
			Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(`${token}|${revToken}`, 'g') });
		}
		return this._sensitivePattern;
	}
}
