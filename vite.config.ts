// vite.config.ts
import { defineConfig } from 'vite'
import path from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import zip from 'vite-plugin-zip-pack'
import manifest from './manifest.config.js'
import { name, version } from './package.json'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
;
  return {
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src')}`,
      },
    },
    define: {
      __DEV__: isDevelopment,
      __REMINDER_INTERVAL__: isDevelopment ? 0.1667 : 60,
    },
    plugins: [
      crx({ manifest }),
      zip({ outDir: 'release', outFileName: `crx-${name}-${version}.zip` }),
    ],
    server: {
      cors: {
        origin: [
          /chrome-extension:\/\//,
        ],
      },
    },
  }
})
