import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./new-sanity/schemaTypes";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { enableVisualEditing } from "@sanity/visual-editing";
// import {resolve} from '../src/lib/resolve'

export default defineConfig({
  projectId: "9ud96vcw",
  dataset: "production",
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      // resolve,
      previewUrl: {
        origin: "https://localhost:4321/",
        previewMode: {
          enable: "/",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    enableVisualEditing(),
  ],

  schema: {
    types: schemaTypes,
  },
});
