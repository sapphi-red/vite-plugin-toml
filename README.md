# vite-plugin-toml
[![npm version](https://badge.fury.io/js/vite-plugin-toml.svg)](https://badge.fury.io/js/vite-plugin-toml) ![automatic deploy](https://github.com/sapphi-red/vite-plugin-toml/workflows/automatic%20deploy/badge.svg) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)  

Toml file plugin for vite.

Uses [`toml` package](https://www.npmjs.com/package/toml) for parsing.

## Usage
```shell
npm i -D vite-plugin-toml # yarn add -D vite-plugin-toml
```

Add plugin in `vite.config.js`.
```js
import { ViteToml } from 'vite-plugin-toml'

export default {
  plugins: [
    ViteToml()
  ]
}
```
