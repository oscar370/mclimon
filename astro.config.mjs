// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],

  markdown: {
    syntaxHighlight: false,
  },

  adapter: netlify({
    devFeatures: {
      edgeFunctions: false,
    },
  }),

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  trailingSlash: "always",
});
