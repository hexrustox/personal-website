import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import Components from "unplugin-vue-components/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [vue({ appEntrypoint: "/src/pages/_app" })],
  vite: {
    plugins: [
      Components({
        dts: true,
      }),
    ],
  },
});
