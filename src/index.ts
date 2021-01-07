import type { TransformHook } from 'rollup'
import type { Plugin } from 'vite'
import toml from 'toml'

export const ViteToml = (): Plugin => {
  const transform: TransformHook = function (code, id) {
    if (!id.endsWith('.toml')) {
      return null
    }

    const parsed = toml.parse(code)
    const string = JSON.stringify(parsed)
    const quotedString = JSON.stringify(string)
    return `export default JSON.parse(${quotedString})`
  }

  return {
    name: 'toml',
    transform
  }
}
