import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://akshatmahajan.com',

  integrations: [
    expressiveCode(expressiveCodeOptions), 
    tailwind({
      applyBaseStyles: false
    }), 
    sitemap(), 
    mdx(), 
    icon(),
    react()
  ],

  markdown: {
      remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkMath],
      rehypePlugins: [
          [
              rehypeExternalLinks,
              {
                  target: '_blank',
                  rel: ['nofollow, noopener, noreferrer']
              }
          ],
          [rehypeKatex, {}]
      ],
      remarkRehype: {
          footnoteLabelProperties: {
              className: ['']
          }
      }
    },

  prefetch: true,
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      persist: true,
    },
    workerEntryPoint: {
      path: 'src/worker.ts',
      namedExports: ['PostsDO'],
    },
  }),
})