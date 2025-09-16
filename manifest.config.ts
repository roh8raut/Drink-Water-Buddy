import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/drink-water.png',
  },
  web_accessible_resources: [
    {
      "resources": ["public/sound.wav", "public/walking.json"],
      "matches": ["<all_urls>"]
    }
  ],
  action: {
    default_icon: {
      48: 'public/drink-water.png',
    },
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [{
    js: ['src/content/main.ts'],
    matches: ['https://*/*'],
  }],
  background: {
    "service_worker": "src/background.ts",
    type: "module",
  },
  permissions: ["storage", "tabs", "alarms"]
})
