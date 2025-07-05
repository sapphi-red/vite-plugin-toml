import { describe, test, expect } from 'vitest'
import { ViteToml, type ViteTomlOptions } from '../src/index'
import type { TransformPluginContext } from 'rollup'

const runTransformWithOptions = (
  options: ViteTomlOptions,
  code: string,
  id: string
) => {
  const plugin = ViteToml(options)
  if (typeof plugin.transform !== 'function') {
    throw new Error('Transform is not a function')
  }
  return plugin.transform.call({} as TransformPluginContext, code, id)
}
const runTransform = (code: string, id: string) => {
  return runTransformWithOptions({}, code, id)
}

describe('basic', () => {
  test('should transform .toml file (1)', () => {
    const result = runTransform(
      `
name = "test"
version = "1.0.0"
`,
      'test.toml'
    )
    expect(result).toMatchInlineSnapshot(`
        "export default {
          name: "test",
          version: "1.0.0"
        };"
      `)
  })

  test('should transform .toml file (2)', () => {
    const result = runTransform(
      `
[database]
host = "localhost"
port = 5432

[[users]]
name = "John"
age = 30
`,
      'test.toml'
    )
    expect(result).toMatchInlineSnapshot(`
        "export default {
          database: {
            host: "localhost",
            port: 5432
          },
          users: [
            {
              name: "John",
              age: 30
            }
          ]
        };"
      `)
  })

  test('should ignore non-toml files', () => {
    const jsContent = 'console.log("hello")'
    const result = runTransform(jsContent, 'test.js')
    expect(result).toBeNull()
  })
})

describe('options', () => {
  test('should handle namedExports option', () => {
    const tomlContent = `
title = "Test"
author = "Test Author"
`
    const result = runTransformWithOptions(
      { namedExports: true },
      tomlContent,
      'test.toml'
    )
    expect(result).toMatchInlineSnapshot(`
        "export const title = "Test";
        export const author = "Test Author";
        export default {
          title: title,
          author: author
        };
        "
      `)
  })
})
