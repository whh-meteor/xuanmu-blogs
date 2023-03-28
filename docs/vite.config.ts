//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";
import flexSearchIndexOptions from "flexsearch";
//default options
var options = {
  ...flexSearchIndexOptions,
  previewLength: 100, //搜索结果预览长度
  buttonLabel: "搜索",
  placeholder: "情输入关键词",
  ignore:['/idea/']
};

export default defineConfig({
  plugins: [SearchPlugin(options)],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["../.."],
    },
  },
});


// import { ConfigEnv, defineConfig } from 'vite'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import { SearchPlugin } from '@pzy915/vitepress-plugin-search'

// export default defineConfig((env: ConfigEnv) => {
//   return {
//     plugins: [
//       vueJsx(),
//       SearchPlugin({
//         previewLength: 20,
//         buttonLabel: '搜索',
//         placeholder: '文章搜索',
//         tokenize: 'full',
//         // ignore:['/idea']
    
//       }),
//     ],
//     server: {
//       fs: {
//         // Allow serving files from one level up to the project root
//         allow: ['../..'],
//       },
//       host: '0.0.0.0',
//       // open: true,
//     },
//   }
// })