import {expectType} from 'tsd';
import replaceString from './index.js';

const input = 'My friend has a 🐑. I want a 🐑 too!';

expectType<string>(replaceString(input, '🐑', '🦄'));
expectType<string>(
	replaceString(input, '🐑', (needle, matchCount, input, matchIndex) => {
		expectType<string>(needle);
		expectType<number>(matchCount);
		expectType<string>(input);
		expectType<number>(matchIndex);

		return '🦄';
	}),
);
expectType<string>(replaceString(input, '🐑', '🦄', {fromIndex: 1}));
expectType<string>(replaceString(input, '🐑', '🦄', {caseInsensitive: true as boolean}));
expectType<string>(replaceString(input, '🐑', '🦄', {fromIndex: 1, caseInsensitive: true as boolean}));
