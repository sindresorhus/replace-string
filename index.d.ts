export type ReplacementFunction = (
	matchedSubstring: string,
	matchCount: number,
	input: string,
	matchIndex: number
) => string;

export interface Options {
	/**
	Index at which to start replacing.

	@default 0
	*/
	readonly fromIndex?: number;

	/**
	Whether or not substring matching should be case-insensitive.

	@default false
	*/
	readonly caseInsensitive?: boolean;
}

/**
Replace all substring matches in a string.

@param input - The string to work on.
@param needle - The string to match in `input`.
@param replacement - The replacement for `needle` matches.
@returns A new string with all `needle` matches replaced with `replacement`.

@example
```
import replaceString from 'replace-string';

const string = 'My friend has a 🐑. I want a 🐑 too!';

replaceString(string, '🐑', '🦄');
//=> 'My friend has a 🦄. I want a 🦄 too!'

replaceString('Foo 🐑 Bar', '🐑', (matchedSubstring, matchCount, input, matchIndex) => `${matchedSubstring}❤️`);
//=> 'Foo 🐑❤️ Bar'
```
*/
export default function replaceString(
	input: string,
	needle: string,
	replacement: string | ReplacementFunction,
	options?: Options
): string;
