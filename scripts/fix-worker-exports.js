#!/usr/bin/env node
/**
 * Post-build script to fix the Durable Object export in the generated worker.
 *
 * The Astro Cloudflare adapter incorrectly tries to get named exports (like PostsDO)
 * from createExports() result, but createExports only returns { default: { fetch } }.
 * The actual Durable Object class is in the adapter chunk and needs to be imported directly.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIST_WORKER_DIR = 'dist/_worker.js';
const INDEX_FILE = join(DIST_WORKER_DIR, 'index.js');

// Find the adapter chunk that contains PostsDO
const chunksDir = join(DIST_WORKER_DIR, 'chunks');
const adapterChunk = readdirSync(chunksDir).find(f => f.includes('astrojs-ssr-adapter'));

if (!adapterChunk) {
  console.error('Could not find adapter chunk');
  process.exit(1);
}

let content = readFileSync(INDEX_FILE, 'utf-8');

// Check if PostsDO is already properly imported
if (content.includes('P as PostsDO')) {
  console.log('PostsDO already properly imported, no fix needed.');
  process.exit(0);
}

// Fix the import to include PostsDO from the chunk
const importRegex = new RegExp(
  `import \\{ c as createExports, s as serverEntrypointModule \\} from './chunks/${adapterChunk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}';`
);

content = content.replace(
  importRegex,
  `import { c as createExports, s as serverEntrypointModule, P as PostsDO } from './chunks/${adapterChunk}';`
);

// Remove the incorrect line that tries to get PostsDO from _exports
content = content.replace(
  /const _exports = createExports\(_manifest\);\nconst __astrojsSsrVirtualEntry = _exports\.default;\nconst PostsDO = _exports\['PostsDO'\];/,
  `const _exports = createExports(_manifest);\nconst __astrojsSsrVirtualEntry = _exports.default;`
);

writeFileSync(INDEX_FILE, content);
console.log('Fixed PostsDO export in worker bundle.');
