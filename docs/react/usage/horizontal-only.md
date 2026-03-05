---
title: Horizontal Only
description: Show only the horizontal scrollbar.
---

# Horizontal Only

If your content only scrolls horizontally (e.g. a wide table or timeline), you can hide the vertical scrollbar.

## Using the ScrollBar component

Set `vertical={false}`:

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-react";

export function HorizontalOnlyExample() {
	return (
		<ScrollBar
			vertical={false}
			horizontal={true}
			style={{ width: 500, overflow: "hidden" }}
		>
			<div style={{ padding: 16, whiteSpace: "nowrap" }}>
				{/* Wide content — no tall content, so no vertical scroll */}
				<span>Item 1</span> <span>Item 2</span> <span>Item 3</span>
				{/* ... */}
			</div>
		</ScrollBar>
	);
}
```

You can omit `horizontal={true}` — it’s the default. Only the horizontal scrollbar will appear when the content is wider than the visible area.

## When to use

- Wide tables, galleries, or horizontal timelines.
- When you want a fixed height and no vertical scrollbar.

Tip: use a fixed or max width on the wrapper and ensure the inner content can overflow horizontally (e.g. `whiteSpace: "nowrap"` or a wide inner element).

Next: [Custom styling](/react/usage/custom-styling) to style the track and thumb.

To place the horizontal scrollbar in a custom position (e.g. above the content), use the standalone [HorizontalScrollBar](/react/usage/using-horizontal-scroll-bar) component instead.
