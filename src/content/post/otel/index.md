---
title: "OTEL supports zero-code instrumentation"
publishDate: "31 December 2025"
tags: ["note", "observability"]
---

A [Hacker News article](https://opentelemetry.io/docs/concepts/instrumentation/zero-code/) caught my attention today, and led me down the maze to OpenTelemetry's recent announcement of [zero-code eBPF-based observability](https://opentelemetry.io/blog/2025/obi-announcing-first-release/). 

It is now possible to configure an eBPF-based sidecar service that will automatically record HTTP and gRPC metrics like request duration and size. However, it doesn't support traces for HTTPS and gRPC [very well](https://opentelemetry.io/docs/zero-code/obi/distributed-traces/), and is in fact disabled by default - you need a cooperative library for the same.

As an aside, this mechanism originally required the very specialized `bpf_write_user_probe()` method for tracing with Go - it involves writing directly to userspace memory from the kernel! A [talk](https://www.youtube.com/watch?v=TUiVX-44S9s) on the same dives deep into how this works, and also how difficult it is to use in practice (as expected!). 

I have a strong personal interest in this area, and have previously tried to obtain zero-code instrumentation for Rust functions -- basically, attempting to reproduce microbenchmarks with _no_ code instrumentation at all. My system attached `uprobes` and `uretprobes` to symbols in an ELF binary corresponding to a function, measured duration time between successive `uprobes` and `uretprobes` in a map, and reported a histogram for invidividual functions. Unfortunately, the system suffered in practice from several obvious issues: 

1. [Symbol mangling](https://doc.rust-lang.org/beta/rustc/symbol-mangling/index.html) prevents resolving function names to their corresponding ELF symbols. 

2. Inlined functions can't be handled this way. There is no symbol to attach to!

3. Concurrent execution means `uretprobes` could happen before their corresponding `uprobes`, resulting in bizarre values. 

   Working around this by having `uprobes` push a value to a BPF per CPU hash stack and `uretprobes` pop the corresponding value did not fix this. It is still not clear to me why, but I ran out of cycles to experiment with this.

OpenTelemetry's woes here suggest there is still some way to go before zero-code instrumentation can replace code instrumentation completely. Nevertheless, this is quite cool!