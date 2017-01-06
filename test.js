import test from 'ava';
import m from './';

test('main', t => {
	t.is(m('foo bar foo', 'bar', 'foo'), 'foo foo foo');
	t.is(m('', 'bar', 'foo'), '');
	t.is(m('foo', '', 'foo'), 'foo');
	t.is(m('foo', 'bar', ''), 'foo');
	t.is(m('foo'), 'foo');
	t.is(m('foo', 'bar'), 'foo');
	t.is(m('foo', 3, 3), 'foo');

	t.is(
		m('My friend has a 🐑. I want a 🐑 too!', '🐑', '🦄'),
		'My friend has a 🦄. I want a 🦄 too!'
	);

	t.is(
		m('foo bar baz foo baz', 'foo', '🦄'),
		'🦄 bar baz 🦄 baz'
	);

	t.is(
		m('foo bar baz foo baz', 'foo', '🦄', {fromIndex: 5}),
		'foo bar baz 🦄 baz'
	);
	t.is(m('foo', 3, 3, {fromIndex: 100}), 'foo');
	t.is(m('foo', 'foo', 'bar', {fromIndex: -100}), 'bar');
	t.is(m('foo foo foo foo foo', 'foo', 'bar', {fromIndex: 1}), 'foo bar bar bar bar');
});

test('function replacement', t => {
	const initNeedle = 'foo';
	const indices = [];

	t.is(
		m('foo bar baz foo baz', initNeedle, (needle, count, input) => {
			t.is(needle, initNeedle);
			indices.push(count);
			t.is(typeof input, 'string');
			return `${needle}2`;
		}),
		'foo2 bar baz foo2 baz'
	);

	t.deepEqual(indices, [1, 2]);
});

test('function replacement with fromIndex', t => {
	const initNeedle = 'foo';
	const indices = [];

	t.is(
		m('foo bar baz foo baz', initNeedle, (needle, count, input) => {
			t.is(needle, initNeedle);
			indices.push(count);
			t.is(typeof input, 'string');
			return `${needle}2`;
		}, {fromIndex: 5}),
		'foo bar baz foo2 baz'
	);

	t.deepEqual(indices, [1]);
});
