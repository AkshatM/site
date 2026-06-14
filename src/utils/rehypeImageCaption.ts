import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

export function rehypeImageCaption() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element, index, parent) => {
			if (node.tagName !== 'img' || index === undefined || !parent) return
			const title = node.properties?.title
			if (!title || typeof title !== 'string') return

			const figure: Element = {
				type: 'element',
				tagName: 'figure',
				properties: {},
				children: [
					node,
					{
						type: 'element',
						tagName: 'figcaption',
						properties: {},
						children: [{ type: 'text', value: title }]
					}
				]
			}

			parent.children.splice(index, 1, figure)
		})
	}
}
