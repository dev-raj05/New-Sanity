// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sanity({
      projectId: "9ud96vcw",
      dataset: "production",
      apiVersion: "2021-03-25",
      useCdn: false,
      studioBasePath: "/studio",

      stega: {
        enabled: false,
        studioUrl: "/studio",
      },
    }),
    react(),
  ],
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  devToolbar: {
    enabled: false,
  },
});
