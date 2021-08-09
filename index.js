export default function replaceString(string, needle, replacement, options = {}) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected input to be a string, got ${typeof string}`);
	}

	if (
		!(typeof needle === 'string' && needle.length > 0)
			|| !(typeof replacement === 'string' || typeof replacement === 'function')
	) {
		return string;
	}

	let result = '';
	let matchCount = 0;
	let previousIndex = options.fromIndex > 0 ? options.fromIndex : 0;

	if (previousIndex > string.length) {
		return string;
	}

	while (true) { // eslint-disable-line no-constant-condition
		const index = options.caseInsensitive
			? string.toLowerCase().indexOf(needle.toLowerCase(), previousIndex)
			: string.indexOf(needle, previousIndex);

		if (index === -1) {
			break;
		}

		matchCount++;

		const replaceString_ = typeof replacement === 'string' ? replacement : replacement(
			// If `caseInsensitive`` is enabled, the matched substring may be different from the needle.
			string.slice(index, index + needle.length),
			matchCount,
			string,
			index,
		);

		// Get the initial part of the string on the first iteration.
		const beginSlice = matchCount === 1 ? 0 : previousIndex;

		result += string.slice(beginSlice, index) + replaceString_;

		previousIndex = index + needle.length;
	}

	if (matchCount === 0) {
		return string;
	}

	return result + string.slice(previousIndex);
}
