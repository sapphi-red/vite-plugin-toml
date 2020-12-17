import { Plugin, Transform } from 'vite'
import toml from 'toml'

export const ViteToml = (): Plugin => {
  const transform: Transform = {
    test: ({ path }) => path.endsWith('.toml'),
    transform: ({ code }) => {
      const parsed = toml.parse(code)
      const escapedString = JSON.stringify(parsed).replace(/`/g, '\\`')
      const newCode = `export default JSON.parse(\`${escapedString}\`)`
      return { code: newCode }
    }
  }

  return {
    transforms: [transform]
  }
}
