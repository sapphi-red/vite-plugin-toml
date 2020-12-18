import { Plugin, Transform } from 'vite'
import toml from 'toml'

export const ViteToml = (): Plugin => {
  const transform: Transform = {
    test: ({ path }) => path.endsWith('.toml'),
    transform: ({ code }) => {
      const parsed = toml.parse(code)
      const string = JSON.stringify(parsed)
      const quotedString = JSON.stringify(string)
      const newCode = `export default JSON.parse(${quotedString})`
      return { code: newCode }
    }
  }

  return {
    transforms: [transform]
  }
}
