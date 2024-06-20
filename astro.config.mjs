import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "tut-from-astro.pages.dev",
  integrations: [preact()],
});
