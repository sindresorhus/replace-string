# replace-string [![Build Status](https://travis-ci.org/sindresorhus/replace-string.svg?branch=master)](https://travis-ci.org/sindresorhus/replace-string)

> Replace all substring matches in a string

Similar to `String#replace()`, but supports replacing multiple matches. You could achieve something similar by putting the string in a `RegExp` constructor with the global flag and passing it to `String#replace()`, but you would then have to first escape the string anyways.


## Install

```
$ npm install --save replace-string
```


## Usage

```js
const replaceString = require('replace-string');

const input = 'My friend has a 🐑. I want a 🐑 too!';

replaceString(input, '🐑', '🦄');
//=> 'My friend has a 🦄. I want a 🦄 too!'
```


## API

### replaceString(input, needle, replacement, [options])

Returns a new string with all `needle` matches replaced with `replacement`.

#### input

Type: `string`

String to work on.

#### needle

Type: `string`

String to match in `input`.

#### replacement

Type: `string` `Function`

Replacement for `needle` matches.

If a function, it receives the following arguments; the `needle`, the match count, and the `input`:

```js
replaceString('Foo 🐑 Bar', '🐑', (needle, matchCount, input) => `${needle}❤️`);
//=> 'Foo 🐑❤️ Bar'
```

#### options

Type: `Object`

##### fromIndex

Type: `number`<br>
Default: `0`

Index at which to start replacing.


## Related

- [execall](https://github.com/sindresorhus/execall) - Find multiple `RegExp` matches in a string


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
