import {exit} from 'node:process'
import {GasPlugin} from 'esbuild-gas-plugin'
import {build, type Plugin} from 'esbuild'

build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  minify: false,
  outfile: './dist/index.js',
  plugins: [GasPlugin as unknown as Plugin],
  // eslint-disable-next-line unicorn/prefer-top-level-await
}).catch((error: unknown) => {
  console.error(error)
  exit(1)
})
