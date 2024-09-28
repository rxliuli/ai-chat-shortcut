import { defineConfig } from 'wxt'
import path from 'path'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    name: 'AI Chat Shortcut',
    description:
      'AI Chat Shortcut is a Browser extension that allows users to quickly access various AI chat services directly from the address bar.',
    permissions: ['storage'],
    omnibox: {
      keyword: '@chat',
    },
  },
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
