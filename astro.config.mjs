// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://akshatmahajan.com",
  integrations: [
    expressiveCode({ themes: ["catppuccin-mocha"] }),
    mdx(),
    sitemap(),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath, remarkToc],
    rehypePlugins: [rehypeKatex],
  },
});
