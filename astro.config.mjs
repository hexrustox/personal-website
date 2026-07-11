import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import MotionResolver from "motion-v/resolver";
import Components from "unplugin-vue-components/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ckhgy.com",
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  integrations: [vue({ appEntrypoint: "/src/pages/_app" }), sitemap()],
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [MotionResolver()],
      }),
    ],
  },
});
