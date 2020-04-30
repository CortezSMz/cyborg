import * as moment from 'moment';

const SEPERATORS = [' ', '.', ',', '-'];
const REGEX = /^(-?(?:\d+)?\.?\d+) *([a-z]+)?$/;

function tokenize(str: string) {
	const units = [];
	let buf = '';
	let letter = false;
	for (const char of str) {
		if (SEPERATORS.includes(char)) {
			buf += char;
		} else if (isNaN(parseInt(char, 10))) {
			buf += char;
			letter = true;
		} else {
			if (letter) {
				units.push(buf.trim());
				buf = '';
			}
			letter = false;
			buf += char;
		}
	}
	if (buf.length) {
		units.push(buf.trim());
	}
	return units;
}

function convert(num: number, type: string) {
	switch (type) {
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
			return moment.duration({ year: num }).asMilliseconds();
		case 'months':
		case 'month':
		case 'mts':
		case 'mt':
			return moment.duration({ month: num }).asMilliseconds();
		case 'weeks':
		case 'week':
		case 'w':
			return moment.duration({ week: num }).asMilliseconds();
		case 'days':
		case 'day':
		case 'd':
			return moment.duration({ day: num }).asMilliseconds();
		case 'hours':
		case 'hour':
		case 'hrs':
		case 'hr':
		case 'h':
			return moment.duration({ hour: num }).asMilliseconds();
		case 'minutes':
		case 'minute':
		case 'mins':
		case 'min':
		case 'm':
			return moment.duration({ minute: num }).asMilliseconds();
		case 'seconds':
		case 'second':
		case 'secs':
		case 'sec':
		case 's':
			return moment.duration({ second: num }).asMilliseconds();
	}
	return num;
}

function pluralize(ms: number, msAbs: number, n: number, long: string, short: string, l = false) {
	const plural = msAbs >= n * 1.5;
	return `${Math.round(ms / n)}${l ? ` ${long}${plural ? 's' : ''}` : short}`;
}

function ms(val: string, long?: boolean): number;
function ms(val: number, long?: boolean): string;
function ms(val: string | number, long = false) {
	let abs;
	let ms = 0;
	if (typeof val === 'string' && val.length) {
		if (val.length < 101) {
			const units = tokenize(val.toLowerCase());
			for (const unit of units) {
				const fmt = REGEX.exec(unit);
				if (fmt) {
					abs = parseFloat(fmt[1]);
					ms += convert(abs, fmt[2]);
				}
			}
			return ms;
		}
	}

	if (typeof val === 'number' && isFinite(val)) {
		abs = Math.abs(val);
		if (abs >= moment.duration({ day: 1 }).asMilliseconds()) return pluralize(val, abs, moment.duration({ day: 1 }).asMilliseconds(), 'day', 'd', long);
		if (abs >= moment.duration({ hour: 1 }).asMilliseconds()) return pluralize(val, abs, moment.duration({ hour: 1 }).asMilliseconds(), 'hour', 'h', long);
		if (abs >= moment.duration({ minute: 1 }).asMilliseconds()) return pluralize(val, abs, moment.duration({ minute: 1 }).asMilliseconds(), 'minute', 'm', long);
		if (abs >= moment.duration({ second: 1 }).asMilliseconds()) return pluralize(val, abs, moment.duration({ second: 1 }).asMilliseconds(), 'second', 's', long);
		return `${val}${long ? ' ' : ''}ms`;
	}

	throw new Error(`Value is an empty string or an invalid number. Value=${JSON.stringify(val)}`);
}

export { ms };
export default ms;
