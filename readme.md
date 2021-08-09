# replace-string

> Replace all substring matches in a string

Similar to `String#replace()`, but supports replacing multiple matches. You could achieve something similar by putting the string in a `RegExp` constructor with the global flag and passing it to `String#replace()`, but you would then have to first escape the string anyways.

*With [Node.js 16](https://medium.com/@nodejs/node-js-v15-0-0-is-here-deb00750f278), this package is partly moot as there is now a [`String#replaceAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) method. However, it does not have a `caseInsensitive` option.*

## Install

```
$ npm install replace-string
```

## Usage

```js
import replaceString from 'replace-string';

const string = 'My friend has a 🐑. I want a 🐑 too!';

replaceString(string, '🐑', '🦄');
//=> 'My friend has a 🦄. I want a 🦄 too!'
```

## API

### replaceString(string, needle, replacement, options?)

Returns a new string with all `needle` matches replaced with `replacement`.

#### string

Type: `string`

The string to work on.

#### needle

Type: `string`

The string to match in `input`.

#### replacement

Type: `string | Function`

The replacement for `needle` matches.

If a function, it receives the matched substring, the match count, the original input, and the index in which the match happened (as measured from the original input):

```js
import replaceString from 'replace-string';

replaceString('Foo 🐑 Bar', '🐑', (matchedSubstring, matchCount, input, matchIndex) => `${matchedSubstring}❤️`);
//=> 'Foo 🐑❤️ Bar'
```

#### options

Type: `object`

##### fromIndex

Type: `number`\
Default: `0`

Index at which to start replacing.

##### caseInsensitive

Type: `boolean`\
Default: `false`

Whether or not substring matching should be case-insensitive.

## Related

- [execall](https://github.com/sindresorhus/execall) - Find multiple `RegExp` matches in a string
