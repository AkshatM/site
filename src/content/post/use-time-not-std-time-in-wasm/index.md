---
title: "Do not use std::time::Instant in WASM contexts"
publishDate: "31 December 2025"
tags: ["note", "cloudflare workers", "rust"]
---

## A Warning

`std::time` is not supported by the `wasm32-unknown-unknown` compile target. Oh, it'll _compile_ fine - the problem is it'll throw [a runtime panic](https://internals.rust-lang.org/t/is-std-instant-on-webassembly-possible/18913/2) whenever `time` functions are invoked! 

The root of the issue is that WebAssembly itself doesn't have any support for time, and the host itself must provide this somehow. Cloudflare Workers [recommends](https://internals.rust-lang.org/t/is-std-instant-on-webassembly-possible/18913/2) using the `time` crate instead - this falls back to an appropriate Javascipt `Date()` interface in WASM contexts, which is widely supported. 

After having used `time`, I find myself far preferring it to `std::time` - not relying on an `Instant` abstraction yields a much better interface. I have made it a major dependency in the `web-bot-auth` crate, both because of the Workers support and because it allowed me to get rid of all time-based errors.