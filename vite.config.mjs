// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { dirname, resolve } from "node:path";

// Note that Vite tries to inject `__dirname` but if we leave it undefined then
// Node will complain ("ERROR: __dirname is not defined in ES module scope") so
// we use our own special name here
const appDir = dirname(fileURLToPath(import.meta.url));
const projDir = resolve(appDir, "..", "..");

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return {
    plugins: [
      Vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      Vuetify(),
      Components(),
      ViteFonts({
        google: {
          families: [
            {
              name: "Roboto",
              styles: "wght@100;300;400;500;700;900",
            },
          ],
        },
      }),
    ],

    // Don't clear the screen in dev mode so that we can see builder output
    clearScreen: false,

    // Use this directory as the root directory for the app project
    root: appDir,

    // Use `.` as the base directory (instead of the default `/`); this controls
    // how the path to the js/css files are generated in `index.html`
    base: "",

    // Load static files from `static` (instead of the default `public`)
    publicDir: "static",

    // Inject special values into the generated JS
    define: {
      // Set a flag to indicate that this is a production build
      __PRODUCTION__: env.mode === "production",
      __VUE_PROD_DEVTOOLS__: env.mode !== 'production'
    },
    // define: { "process.env": {} },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@core": resolve(appDir, "core", "src"),
        "@core-strings": resolve(appDir, "core", "strings"),
        "@prep": resolve(projDir, "sde-prep"),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },

    build: {
      // Write output files to `public` (instead of the default `dist`)
      outDir: "public",

      // Write js/css files to `public` (instead of the default `<outDir>/assets`)
      assetsDir: "",

      // TODO: Uncomment for debugging purposes
      // minify: false,

      rollupOptions: {
        output: {
          // XXX: Prevent vite from creating a separate `vendor.js` file
          manualChunks: undefined,
        },
      },
    },

    server: {
      // Run the dev server at `localhost:8080` by default
      port: 8080,

      // Open the app in the browser by default
      open: "/index.html",
    },
    // server: {
    //   port: 3000,
    // },
    // css: {
    //   preprocessorOptions: {
    //     sass: {
    //       api: "modern-compiler",
    //     },
    //   },
    // },
  };
});
