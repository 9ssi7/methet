import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output: "server",
  adapter: node({
    mode: 'standalone'
  })
});