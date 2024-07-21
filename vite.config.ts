import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
      webExtConfig: {
        // startUrl: "https://go.v7labs.com/",
        startUrl:
          "chrome-extension:pnadmelgifhkooiblfmnclemejpgahfk/content.html",
        devtools: true,
      },
    }),
  ],
});
