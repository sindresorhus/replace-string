import test from 'ava';
import replaceString from './index.js';

test('main', t => {
	t.is(replaceString('foo bar foo', 'bar', 'foo'), 'foo foo foo');
	t.is(replaceString('', 'bar', 'foo'), '');
	t.is(replaceString('foo', '', 'foo'), 'foo');
	t.is(replaceString('foo', 'bar', ''), 'foo');
	t.is(replaceString('foo'), 'foo');
	t.is(replaceString('foo', 'bar'), 'foo');
	t.is(replaceString('foo', 3, 3), 'foo');

	t.is(
		replaceString('My friend has a 🐑. I want a 🐑 too!', '🐑', '🦄'),
		'My friend has a 🦄. I want a 🦄 too!',
	);

	t.is(
		replaceString('foo bar baz foo baz', 'foo', '🦄'),
		'🦄 bar baz 🦄 baz',
	);

	t.is(
		replaceString('foo bar baz foo baz', 'foo', '🦄', {fromIndex: 5}),
		'foo bar baz 🦄 baz',
	);
	t.is(replaceString('foo', 3, 3, {fromIndex: 100}), 'foo');
	t.is(replaceString('foo', 'foo', 'bar', {fromIndex: -100}), 'bar');
	t.is(replaceString('foo foo foo foo foo', 'foo', 'bar', {fromIndex: 1}), 'foo bar bar bar bar');
	t.is(replaceString('bar foo', 'foo', 'bar', {fromIndex: 5}), 'bar foo');

	t.is(replaceString('foo bar foo', 'Bar', 'Foo', {caseInsensitive: true}), 'foo Foo foo');
});

test('function replacement', t => {
	const needle = 'foo';
	const countIndices = [];
	const matchIndices = [];

	t.is(
		replaceString('foo bar baz foo baz', needle, (matchedSubstring, count, input, matchIndex) => {
			t.is(matchedSubstring, needle);
			countIndices.push(count);
			matchIndices.push(matchIndex);
			t.is(typeof input, 'string');
			return `${matchedSubstring}2`;
		}),
		'foo2 bar baz foo2 baz',
	);

	t.deepEqual(countIndices, [1, 2]);
	t.deepEqual(matchIndices, [0, 12]);
});

test('function replacement with `fromIndex` option', t => {
	const needle = 'foo';
	const countIndices = [];
	const matchIndices = [];

	t.is(
		replaceString('foo bar baz foo baz Foo', needle, (matchedSubstring, count, input, matchIndex) => {
			t.is(matchedSubstring, needle);
			countIndices.push(count);
			matchIndices.push(matchIndex);
			t.is(typeof input, 'string');
			return `${matchedSubstring}2`;
		}, {fromIndex: 5}),
		'foo bar baz foo2 baz Foo',
	);

	t.deepEqual(countIndices, [1]);
	t.deepEqual(matchIndices, [12]);
});

test('function replacement with `fromIndex` and `caseInsensitive` options', t => {
	const needle = 'fOO';
	const countIndices = [];
	const matchIndices = [];

	t.is(
		replaceString('fOO bar baz foo baz foo Foo fOo FoO', needle, (matchedSubstring, count, input, matchIndex) => {
			t.is(matchedSubstring.toLowerCase(), needle.toLowerCase());
			countIndices.push(count);
			matchIndices.push(matchIndex);
			t.is(typeof input, 'string');
			return `${matchedSubstring}2`;
		}, {fromIndex: 15, caseInsensitive: true}),
		'fOO bar baz foo baz foo2 Foo2 fOo2 FoO2',
	);

	t.deepEqual(countIndices, [1, 2, 3, 4]);
	t.deepEqual(matchIndices, [20, 24, 28, 32]); // Indexes are measured based on the original string
});
