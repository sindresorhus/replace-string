'use strict';

module.exports = (string, needle, replacement, options = {}) => {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected input to be a string, got ${typeof string}`);
	}

	if (!(typeof needle === 'string' && needle.length > 0) ||
		!(typeof replacement === 'string' || typeof replacement === 'function')) {
		return string;
	}

	let result = '';
	let matchCount = 0;
	let prevIndex = options.fromIndex > 0 ? options.fromIndex : 0;

	if (prevIndex > string.length) {
		return string;
	}

	while (true) { // eslint-disable-line no-constant-condition
		const index = options.caseInsensitive ?
			string.toLowerCase().indexOf(needle.toLowerCase(), prevIndex) :
			string.indexOf(needle, prevIndex);

		if (index === -1) {
			break;
		}

		matchCount++;

		const replaceStr = typeof replacement === 'string' ? replacement : replacement(
			// If `caseInsensitive`` is enabled, the matched substring may be different from the needle.
			string.slice(index, index + needle.length),
			matchCount,
			string,
			index
		);

		// Get the initial part of the string on the first iteration.
		const beginSlice = matchCount === 1 ? 0 : prevIndex;

		result += string.slice(beginSlice, index) + replaceStr;

		prevIndex = index + needle.length;
	}

	if (matchCount === 0) {
		return string;
	}

	return result + string.slice(prevIndex);
};
