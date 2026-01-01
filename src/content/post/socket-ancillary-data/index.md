---
title: "Use ancillary data to see packet wait times"
publishDate: "31 December 2025"
tags: ["note", "observability", "rust"]
---

## Context

In 2024, I was working on a Layer 3 proxy at Cloudflare. We had never stress-tested this system outside of production traffic, and we wanted a way to measure how long any packet was stuck in the kernel's wait queue. This would tell us, roughly, whether we had backpressure. 

I originally reached for a pure kernelspace solution -- use eBPF to track packet arrivals in any of the listening sockets for our proxy. However, it turns out there's a better way to do this, all in userspace:

- Use [control messages](https://man7.org/linux/man-pages/man3/cmsg.3.html) to access timestamps set by the [`SO_TIMESTAMPING`](https://man7.org/linux/man-pages/man7/socket.7.html) socket option.
- Compare against current Unix timestamp. 

This will tell you how long your packet sat in the queue.

### What are control messages?

Control messages were new to me when I began this journey. Essentially, they allow the kernel to add extra data to any socket. 

## How do I use this?

First, you must set the [`SO_TIMESTAMPING`](https://man7.org/linux/man-pages/man7/socket.7.html) socket option on your listening socket. This will generate the underlying timestamps.

To actually fetch the value, though, you need to:

1. Use the `recvmsg()` system call on a socket, supplying a pointer to a `msghdr` struct. This will populate `msghdr`.
2. Use the `cmsg()` system call to extract the control message from the `msghdr` struct. You need to loop through _all_ the messages to find yours. 

### In Rust

I found the `nix` crate super helpful for this - in particular, it directly exposes control messages in its [`recvmsg()`](https://docs.rs/nix/latest/nix/sys/socket/struct.RecvMsg.html#method.cmsgs) implementation. 

It even contains a sample implementation of this exact task, which I used to answer a [StackOverflow question](https://stackoverflow.com/questions/71891151/accessing-unix-socket-timestamps-in-rust/76268849#76268849): 

```rust
// Source - https://stackoverflow.com/a
// Posted by Akshat Mahajan
// Retrieved 2025-12-31, License - CC BY-SA 4.0

// Set up
let message = "Ohayō!".as_bytes();

let in_socket = socket(
    AddressFamily::Inet,
    SockType::Datagram,
    SockFlag::empty(),
    None
).unwrap();

setsockopt(in_socket, sockopt::ReceiveTimestamp, &true).unwrap();

let localhost = SockaddrIn::from_str("127.0.0.1:0").unwrap();
bind(in_socket, &localhost).unwrap();

let address: SockaddrIn = getsockname(in_socket).unwrap();

// Get initial time
let time0 = SystemTime::now();

// Send the message
let iov = [IoSlice::new(message)];
let flags = MsgFlags::empty();
let l = sendmsg(in_socket, &iov, &[], flags, Some(&address)).unwrap();
assert_eq!(message.len(), l);

// Receive the message
let mut buffer = vec![0u8; message.len()];
let mut cmsgspace = cmsg_space!(TimeVal);
let mut iov = [IoSliceMut::new(&mut buffer)];
let r = recvmsg::<SockaddrIn>(in_socket, &mut iov, Some(&mut cmsgspace), flags)
    .unwrap();
let rtime = match r.cmsgs().next() {
    Some(ControlMessageOwned::ScmTimestamp(rtime)) => rtime,
    Some(_) => panic!("Unexpected control message"),
    None => panic!("No control message")
};

// Check the final time
let time1 = SystemTime::now();
// the packet's received timestamp should lie in-between the two system
// times, unless the system clock was adjusted in the meantime.
let rduration = Duration::new(rtime.tv_sec() as u64,
                              rtime.tv_usec() as u32 * 1000);
assert!(time0.duration_since(UNIX_EPOCH).unwrap() <= rduration);
assert!(rduration <= time1.duration_since(UNIX_EPOCH).unwrap());

// Close socket
nix::unistd::close(in_socket).unwrap();
```

Hopefully, this helps someone else as well!