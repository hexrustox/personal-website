import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import MotionResolver from "motion-v/resolver";
import Components from "unplugin-vue-components/vite";

// https://astro.build/config
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  integrations: [vue({ appEntrypoint: "/src/pages/_app" })],
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [MotionResolver()],
      }),
    ],
  },
});
