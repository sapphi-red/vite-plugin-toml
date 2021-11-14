import type { TransformHook } from 'rollup'
import type { Plugin } from 'vite'
import { parse } from '@ltd/j-toml'
import { dataToEsm } from '@rollup/pluginutils'

export interface ViteTomlOptions {
  useBigInt?: boolean
  namedExports?: boolean
}

export const ViteToml = ({
  useBigInt = true,
  namedExports = false
}: ViteTomlOptions = {}): Plugin => {
  const transform: TransformHook = function (code, id) {
    if (!id.endsWith('.toml')) {
      return null
    }

    const parsed = parse(code, 1.0, '\n', useBigInt, undefined)
    const newCode = dataToEsm(parsed, {
      preferConst: true,
      compact: false,
      namedExports,
      indent: '  '
    })
    return newCode
  }

  return {
    name: 'toml',
    transform
  }
}
