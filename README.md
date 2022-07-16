# vite-plugin-toml

[![npm version](https://badge.fury.io/js/vite-plugin-toml.svg)](https://badge.fury.io/js/vite-plugin-toml) ![automatic deploy](https://github.com/sapphi-red/vite-plugin-toml/workflows/automatic%20deploy/badge.svg) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Toml file plugin for rollup/vite.

> The name starts with `vite-plugin-`, but this is a historical reason.
> This plugin **does** support rollup too.

Uses [`toml-eslint-parser` package](https://www.npmjs.com/package/toml-eslint-parser) for parsing.
Supports Toml 1.0.0.

## Install

```shell
npm i -D vite-plugin-toml # yarn add -D vite-plugin-toml
```

Add plugin in `vite.config.js`.

```js
import { ViteToml } from 'vite-plugin-toml'

export default {
  plugins: [ViteToml()]
}
```

### Options

- `namedExports` (default: `false`)

Enable named exports.

### Typescript

I recommend using [typescript-plugin-toml](https://github.com/sapphi-red/typescript-plugin-toml).

Alternatively, add this global declaration.

```ts
declare module '*.toml' {
  const value: unknown
  export default value
}
```

## Example

`test.toml`

```toml
key = 'value'
```

`index.ts`

```ts
import test from './test.toml'

console.log(test.key) // 'value'
```
