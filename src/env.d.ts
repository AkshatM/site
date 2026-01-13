/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

type PostsDO = import('./posts-do').PostsDO;

interface CustomEnv {
  POSTS: DurableObjectNamespace<PostsDO>;
  SESSION: KVNamespace;
  ASSETS: Fetcher;
}

type Runtime = import('@astrojs/cloudflare').Runtime<CustomEnv>;

declare namespace App {
  interface Locals extends Runtime {
    otherLocals: {
      test: string;
    };
  }
}