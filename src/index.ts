import type { Plugin, TransformHook } from 'rollup'
import { parseTOML, getStaticTOMLValue } from 'toml-eslint-parser'
import { dataToEsm } from '@rollup/pluginutils'

export interface ViteTomlOptions {
  namedExports?: boolean
}

export const ViteToml = ({
  namedExports = false
}: ViteTomlOptions = {}): Plugin => {
  const transform: TransformHook = function (code, id) {
    if (!id.endsWith('.toml')) {
      return null
    }

    const parsed = parseTOML(code)
    const value = getStaticTOMLValue(parsed)
    const newCode = dataToEsm(value, {
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
