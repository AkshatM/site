---
title: "Markdown test"
publishDate: "13 June 2026"
category: "guide"
showToc: true
draft: true
---

The formula 

$$
E = mc^{2}
$$

does not change

```mermaid
graph LR
    classDef default fill:none
    A[Start] --> B[Process]
    B --> C[End]
    C --> D
```

<!--toc-->

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")(width: 400)

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
