import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入组件-sfc
import ViteComponents from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vitePluginsVueUnicode from './src/plugins/vite-plugins-vue-unicode'
const target = `http://10.101.65.11:8090`

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV == 'development' ? '/' : '/dataasset/',
  define: {
    updateDate: new Date().getTime()
  },
  plugins: [
    vue2(),
    vueJsx(),
    vueSetupExtend(),
    vitePluginsVueUnicode(),
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
    },
    loaderOptions: {
      sass: {
        sassOptions: {
          outputStyle: 'expanded'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue:'vue/dist/vue.esm.js'
    }
  },
  server: {
    proxy: {
      '/datablau-cloud': {
        target: target,
        changeOrigin: true
      }
    }
  }
})
