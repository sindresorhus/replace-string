import test from 'ava';
import replaceString from '.';

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
		'My friend has a 🦄. I want a 🦄 too!'
	);

	t.is(
		replaceString('foo bar baz foo baz', 'foo', '🦄'),
		'🦄 bar baz 🦄 baz'
	);

	t.is(
		replaceString('foo bar baz foo baz', 'foo', '🦄', {fromIndex: 5}),
		'foo bar baz 🦄 baz'
	);
	t.is(replaceString('foo', 3, 3, {fromIndex: 100}), 'foo');
	t.is(replaceString('foo', 'foo', 'bar', {fromIndex: -100}), 'bar');
	t.is(replaceString('foo foo foo foo foo', 'foo', 'bar', {fromIndex: 1}), 'foo bar bar bar bar');
	t.is(replaceString('bar foo', 'foo', 'bar', {fromIndex: 5}), 'bar foo');
});

test('function replacement', t => {
	const initNeedle = 'foo';
	const countIndices = [];
	const matchIndices = [];

	t.is(
		replaceString('foo bar baz foo baz', initNeedle, (needle, count, input, matchIndex) => {
			t.is(needle, initNeedle);
			countIndices.push(count);
			matchIndices.push(matchIndex);
			t.is(typeof input, 'string');
			return `${needle}2`;
		}),
		'foo2 bar baz foo2 baz'
	);

	t.deepEqual(countIndices, [1, 2]);
	t.deepEqual(matchIndices, [0, 12]);
});

test('function replacement with fromIndex', t => {
	const initNeedle = 'foo';
	const countIndices = [];
	const matchIndices = [];

	t.is(
		replaceString('foo bar baz foo baz', initNeedle, (needle, count, input, matchIndex) => {
			t.is(needle, initNeedle);
			countIndices.push(count);
			matchIndices.push(matchIndex);
			t.is(typeof input, 'string');
			return `${needle}2`;
		}, {fromIndex: 5}),
		'foo bar baz foo2 baz'
	);

	t.deepEqual(countIndices, [1]);
	t.deepEqual(matchIndices, [12]);
});
