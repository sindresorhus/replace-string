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

	while (true) { // eslint-disable-line no-constant-condition
		const index = input.indexOf(needle, prevIndex);

		if (index === -1) {
			break;
		}

		matchCount++;
		const replaceStr = typeof replacement === 'string' ? replacement : replacement(needle, matchCount, input);
		// Retrieves the initial part of the input, in case of getting a fromIndex option
		ret += (prevIndex === opts.fromIndex) ? input.slice(0, index) + replaceStr : input.slice(prevIndex, index) + replaceStr;
		prevIndex = index + needle.length;
	}
	// If no match is found, returns the input unmodified
	return (matchCount === 0) ? input : ret + input.slice(prevIndex);
};
