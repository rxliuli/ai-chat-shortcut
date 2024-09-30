import { defineConfig, UserManifest } from 'wxt'
import path from 'path'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    name: 'AI Chat Shortcut',
    description:
      'AI Chat Shortcut is a Browser extension that allows users to quickly access various AI chat services directly from the address bar.',
    permissions: ['storage', 'tabs', 'scripting'],
    omnibox: {
      keyword: '@chat',
    },
    host_permissions: [
      'https://chatgpt.com/',
      'https://poe.com/',
      'https://gemini.google.com/',
      'https://gemini.google.com/app',
      'https://claude.ai/',
      'https://claude.ai/new',
    ],
  } as UserManifest,
  runner: {
    disabled: true,
  },
  vite: () => ({
    resolve: {
      alias: {
        $lib: path.resolve('./src/lib'),
      },
    },
  }),
})
