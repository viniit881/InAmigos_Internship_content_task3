/**
 * Bundle Framer code components (inlines remote deps) for Vite/React
 */
import * as esbuild from 'esbuild'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src', 'framer', 'bundled')
const framerStub = join(root, 'src', 'framer', 'framer-runtime.ts')

const components = [
  {
    name: 'AnimatedLiquidBackground',
    url: 'https://framer.com/m/AnimatedLiquidBackground-Prod-vIhm.js@ghH1aHLmGZ0iE7qXDFVk',
  },
  {
    name: 'DragableCarousel',
    url: 'https://framer.com/m/DragableCarousel-ADAPEh.js@fXOJxTG2NAtXIGjIOPmn',
  },
  {
    name: 'LiquidImage',
    url: 'https://framer.com/m/LiquidImage-DMcO.js@BzHG0pe3fwejvzhuvfLr',
  },
]

const httpPlugin = {
  name: 'http-resolver',
  setup(build) {
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: 'http-url',
    }))

    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
      const res = await fetch(args.path, {
        headers: { 'User-Agent': 'SummitCoreFitness-FramerBundler/1.0' },
      })
      if (!res.ok) throw new Error(`Fetch failed ${args.path}: ${res.status}`)
      let contents = await res.text()
      // Framer entry files re-export from framerusercontent — follow one level
      const reExport = contents.match(
        /export\s+\{[^}]*\}\s+from\s+["'](https:\/\/framerusercontent\.com[^"']+)["']/
      )
      if (reExport) {
        const inner = await fetch(reExport[1])
        contents = await inner.text()
      }
      return { contents, loader: 'js' }
    })
  },
}

const shared = {
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.ts': 'ts' },
  plugins: [httpPlugin],
  external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', 'gsap'],
  alias: {
    framer: framerStub,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}

await mkdir(outDir, { recursive: true })

for (const { name, url } of components) {
  console.log(`Bundling ${name}…`)
  try {
    await esbuild.build({
      ...shared,
      entryPoints: [url],
      outfile: join(outDir, `${name}.js`),
      logLevel: 'warning',
    })
    console.log(`  ✓ ${name}`)
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message)
  }
}

console.log('Done.')
