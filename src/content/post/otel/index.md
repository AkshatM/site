---
title: "OpenTelemetry supports zero-code instrumentation"
publishDate: "31 December 2025"
tags: ["note", "observability"]
---

A [Hacker News article](https://opentelemetry.io/docs/concepts/instrumentation/zero-code/) caught my attention today, and led me down the maze to OpenTelemetry's recent announcement of [zero-code eBPF-based observability](https://opentelemetry.io/blog/2025/obi-announcing-first-release/). 

It is now possible to configure an eBPF-based sidecar service that will automatically record HTTP and gRPC metrics like request duration and size. However, it doesn't support traces for HTTPS and gRPC [very well](https://opentelemetry.io/docs/zero-code/obi/distributed-traces/), and is in fact disabled by default - you need a cooperative library for the same.

As an aside, this mechanism originally required the very specialized `bpf_write_user_probe()` method for tracing with Go - it involves writing directly to userspace memory from the kernel! A [talk](https://www.youtube.com/watch?v=TUiVX-44S9s) on the same dives deep into how this works, and also how difficult it is to use in practice (as expected!).