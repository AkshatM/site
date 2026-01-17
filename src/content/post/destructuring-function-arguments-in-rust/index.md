---
title: "In Rust, you can destructure function arguments"
description: "A surprising feature of unusual syntax, for the uninitiated"
publishDate: "17 January 2026"
tags: ["note", "rust"]
---

First, a question. What is [this code in the wild](https://github.com/sgl-project/sglang/blob/eb768189eeb18e2f33518f45a7fd0b5e3b57c122/sgl-model-gateway/src/server.rs#L341) doing? 

```rust
async fn v1_conversations_list_items(
    State(state): State<Arc<AppState>>,
    Path(conversation_id): Path<String>,
    Query(ListItemsQuery {
        limit,
        order,
        after,
    }): Query<ListItemsQuery>,
) -> Response { ... }
```

"_Huh?_", I can hear you say. Those look **nothing** like function arguments. What are those weird wrappers?

This syntax has a surprisingly satisfying answer. 

## Pattern-matching is everywhere

If you've used Rust, you're probably familiar with its umpteen ways to destructure values. Destructuring, for the uninitiated, looks like this:

```rust
let (a, b) = (1, 2);
// a and b are auto-initialized to 1 and 2
```

but is most frequently encountered using `match` statements: 

```rust
match result {
    Ok(value) => { /* use value here */}
    Err(error) => {/* use error here */}
}
```

You can also use `if let` and `while let`: 

```rust
if let Some(x) = maybe {
    println!("{x}");
}
```

```rust
while let Some(x) = iter.next() {
    println!("{x}");
}
```

or destructure references 

```rust
let &x = &5;
```

and so on.

## Function arguments can be pattern-matched too

Yes, you read that correctly. _Function arguments (and closure arguments) get this treatment too_.

Let's revisit our first example: 

```rust
async fn v1_conversations_list_items(
    State(state): State<Arc<AppState>>,
    Path(conversation_id): Path<String>,
    Query(ListItemsQuery {
        limit,
        order,
        after,
    }): Query<ListItemsQuery>,
) -> Response { ... }
```

Here, the function is simply destructuring variables for use in the function body. It accepts a `State<Arc<AppState>>` and extracts the inner `state` as a variable. Here's the full body:

```rust
async fn v1_conversations_list_items(
    State(state): State<Arc<AppState>>,
    Path(conversation_id): Path<String>,
    Query(ListItemsQuery {
        limit,
        order,
        after,
    }): Query<ListItemsQuery>,
) -> Response {
    conversations::list_conversation_items(
        &state.context.conversation_storage,
        &state.context.conversation_item_storage,
        &conversation_id,
        limit,
        order.as_deref(),
        after.as_deref(),
    )
    .await
}
```

Notice how the body can simply reference `limit`, `order`, etc. 

The slightly more cumbersome equivalent in more familiar syntax:

```rust
async fn v1_conversations_list_items(
    app_state: State<Arc<AppState>>,
    path_string: Path<String>,
    query: Query<ListItemsQuery>
) -> Response {

    let State(state) = app_state;
    let Path(conversation_id) = path_string;
    let Query(ListItemsQuery {
        limit,
        order,
        after,
    }) = query;

    conversations::list_conversation_items(
        &state.context.conversation_storage,
        &state.context.conversation_item_storage,
        &conversation_id,
        limit,
        order.as_deref(),
        after.as_deref(),
    )
    .await
}
```

Isn't that neat?