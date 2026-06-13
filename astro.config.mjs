import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import { rehypeImageCaption } from './src/utils/rehypeImageCaption.ts'
import imgAttr from 'remark-imgattr'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import mermaid from 'astro-mermaid'
import remarkMath from 'remark-math'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

import cloudflare from '@astrojs/cloudflare'

import react from '@astrojs/react'

import customToc from 'astro-custom-toc'

// https://astro.build/config
export default defineConfig({
	site: 'https://akshatmahajan.com',

	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true,
			enableLog: false,
			mermaidConfig: {
				look: 'handDrawn'
			}
		}),
		expressiveCode(expressiveCodeOptions),
		customToc(),
		sitemap(),
		mdx(),
		icon(),
		react()
	],

	markdown: {
		remarkPlugins: [imgAttr, remarkReadingTime, remarkMath, remarkUnwrapImages],
		rehypePlugins: [
			rehypeSlug,
			rehypeImageCaption,
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
			persist: true
		},
		workerEntryPoint: {
			path: 'src/worker.ts',
			namedExports: ['PostsDO']
		}
	})
})
