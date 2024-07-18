import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});