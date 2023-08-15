import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入组件-sfc
import ViteComponents from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia']
      // dirs: ['./src/components']
    }),
    ViteComponents()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/scss/var.module.scss" as *;
        @use "@/scss/mixin.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
