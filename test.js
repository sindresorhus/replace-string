import test from 'ava';
import m from './';

test('main', t => {
	t.is(m('foo bar foo', {needle: 'bar', replacement: 'foo'}), 'foo foo foo');
	t.is(m('', {needle: 'bar', replacement: 'foo'}), '');
	t.is(m('foo', {needle: '', replacement: 'foo'}), 'foo');
	t.is(m('foo', {needle: 'bar', replacement: ''}), 'foo');
	t.is(m('foo'), 'foo');
	t.is(m('foo', {needle: 'bar'}), 'foo');
	t.is(m('foo', {needle: 3, replacement: 3}), 'foo');

	t.is(
		m('My friend has a 🐑. I want a 🐑 too!', {needle: '🐑', replacement: '🦄'}),
		'My friend has a 🦄. I want a 🦄 too!'
	);

	t.is(
		m('foo bar baz foo baz', {needle: 'foo', replacement: '🦄'}),
		'🦄 bar baz 🦄 baz'
	);

	t.is(
		m('foo bar baz foo baz', {needle: 'foo', replacement: '🦄', fromIndex: 5}),
		'foo bar baz 🦄 baz'
	);
	t.is(m('foo', {needle: 3, replacement: 3, fromIndex: 100}), 'foo');
	t.is(m('foo', {needle: 'foo', replacement: 'bar', fromIndex: -100}), 'bar');
	t.is(m('foo foo foo foo foo', {needle: 'foo', replacement: 'bar', fromIndex: 1}), 'foo bar bar bar bar');
});

test('function replacement', t => {
	const initNeedle = 'foo';
	const indices = [];
	const opts = {
		needle: 'foo',
		replacement: (needle, count, input) => {
			t.is(needle, initNeedle);
			indices.push(count);
			t.is(typeof input, 'string');
			return `${needle}2`;
		}
	};

	t.is(m('foo bar baz foo baz', opts), 'foo2 bar baz foo2 baz');
	t.deepEqual(indices, [1, 2]);
});

test('function replacement with fromIndex', t => {
	const initNeedle = 'foo';
	const indices = [];
	const opts = {
		needle: 'foo',
		fromIndex: 5,
		replacement: (needle, count, input) => {
			t.is(needle, initNeedle);
			indices.push(count);
			t.is(typeof input, 'string');
			return `${needle}2`;
		}
	};

	t.is(m('foo bar baz foo baz', opts), 'foo bar baz foo2 baz');
	t.deepEqual(indices, [1]);
});
