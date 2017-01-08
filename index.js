'use strict';
module.exports = (input, needle, replacement, opts) => {
	opts = Object.assign({}, opts);

	if (typeof input !== 'string') {
		throw new TypeError(`Expected input to be a string, got ${typeof input}`);
	}

	if (!(typeof needle === 'string' && needle.length > 0) ||
		!(typeof replacement === 'string' || typeof replacement === 'function')) {
		return input;
	}

	let ret = '';
	let matchCount = 0;
	let prevIndex = opts.fromIndex > 0 ? opts.fromIndex : 0;

	if (prevIndex > input.length) {
		return input;
	}

	while (true) { // eslint-disable-line no-constant-condition
		const index = input.indexOf(needle, prevIndex);

		if (index === -1) {
			break;
		}

		matchCount++;
		const replaceStr = typeof replacement === 'string' ? replacement : replacement(needle, matchCount, input);
		ret += (prevIndex === opts.fromIndex) ? input.slice(0, index) + replaceStr : input.slice(prevIndex, index) + replaceStr;
		prevIndex = index + needle.length;
	}

	return ret + input.slice(prevIndex);
};
