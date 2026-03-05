---
title: Basic Usage
description: Use the ScrollBar component to add vertical and horizontal scrollbars to any content.
---

# Basic Usage

The simplest way to use Ez Scrollbar is to wrap your scrollable content with the `<ScrollBar>` component.

## Minimal example

Give the wrapper a fixed height (and optionally width) so the content can overflow and scroll:

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-react";

export function BasicExample() {
	return (
		<ScrollBar style={{ height: 300, overflow: "hidden" }}>
			<div style={{ padding: 16 }}>
				<h2>Scrollable content</h2>
				<p>First paragraph...</p>
				<p>Second paragraph...</p>
				{/* Add enough content so it overflows */}
			</div>
		</ScrollBar>
	);
}
```

By default, both **vertical** and **horizontal** scrollbars are shown when needed. The inner `div` is the scrollable container; the library measures it and renders the scrollbars beside it.

## Tips for beginners

1. **Height is required** — If the wrapper has no height, the content won’t overflow and you won’t see scrolling. Use something like `height: 300`, `height: "50vh"`, or a flex layout that gives the area a fixed height.
2. **Use one inner wrapper** — The first child of `<ScrollBar>` becomes the scrollable area. Put all your content inside that child (often a single `div`).
3. **Styling the wrapper** — You can pass any `style` or `className` to `<ScrollBar>`; they apply to the outer wrapper. Use `scrollerProps` to pass props to the inner scrollable element.

## With className

```tsx
<ScrollBar className="my-scroll-area" style={{ height: 400 }}>
	<div className="my-content">
		{/* content */}
	</div>
</ScrollBar>
```

Next: [Vertical only](/react/usage/vertical-only) or [Horizontal only](/react/usage/horizontal-only) if you want scroll in one direction.
