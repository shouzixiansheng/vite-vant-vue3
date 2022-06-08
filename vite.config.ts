import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import Components from 'unplugin-vue-components/vite' //注意后面有个/vite
import AutoImport from 'unplugin-auto-import/vite' //注意后面有个/vite
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
// import VueI18n from '@intlify/vite-plugin-vue-i18n'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.', "src"),
    }
  },
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    Components({
      dirs: ['src/components/global'],
      extensions: ['vue', 'tsx'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    })
  ],
  server: {
    host: "0.0.0.0",
    open: '',
    hmr: true,
    proxy: { // 代理配置
      // '/api': 'http://101.43.71.26:8090',
      '/api': 'http://nft-stock-b3424.thedataplus.club',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     // Node.js global to browser globalThis
  //     define: {
  //       global: 'globalThis'
  //     },
  //     // Enable esbuild polyfill plugins
  //     plugins: [
  //       NodeGlobalsPolyfillPlugin({
  //         buffer: true
  //       })
  //     ]
  //   }
  // },
  // define: {
  //   'process.env': process.env
  // },
  build: {
    rollupOptions: {
      // @ts-ignore
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
})
