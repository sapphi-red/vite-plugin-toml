import type { TransformHook } from 'rollup'
import type { Plugin } from 'vite'
import { parse } from '@ltd/j-toml'

export interface ViteTomlOptions {
  useBigInt?: boolean
}

export const ViteToml = ({
  useBigInt = true
}: ViteTomlOptions = {}): Plugin => {
  const transform: TransformHook = function (code, id) {
    if (!id.endsWith('.toml')) {
      return null
    }

    const parsed = parse(code, 1.0, '\n', useBigInt, undefined, id)
    const string = JSON.stringify(parsed)
    const quotedString = JSON.stringify(string)
    return `export default JSON.parse(${quotedString})`
  }

  return {
    name: 'toml',
    transform
  }
}
