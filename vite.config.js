import vue from '@vitejs/plugin-vue'
import vike from 'vike/plugin'
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// import { defineConfig } from "vite";

export default {
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => {
      //       return tag.startsWith('AKC') 
      //     }
      //   }
      // }
    }),
    vike({
      // disableAutoFullBuild: true
      prerender: true
    })
  ],
  resolve: {
    alias: [
      /*
      NOTE: using symbol other than '@' for images does not resolves
            to the path in html part in development build
            however seems to work in production build.
            tried these symbols ! # $ ^ &
      */
      { find: "@assets", replacement: fileURLToPath(new URL("./assets", import.meta.url)) },

      { find: "$renderer", replacement: fileURLToPath(new URL("./renderer", import.meta.url)) },
      { find: "$", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      { find: "$components", replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
      { find: "$pages", replacement: fileURLToPath(new URL("./src/pages", import.meta.url)) },
      { find: "$layouts", replacement: fileURLToPath(new URL("./src/layouts", import.meta.url)) },
      { find: "$helpers", replacement: fileURLToPath(new URL("./src/helpers", import.meta.url)) },
    ],
  },
}