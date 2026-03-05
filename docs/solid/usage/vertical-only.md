---
title: Vertical Only
description: Show only the vertical scrollbar.
---

# Vertical Only

If your content only scrolls vertically, you can hide the horizontal scrollbar.

## Using the ScrollBar component

Set `horizontal={false}`:

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-solid";

export function VerticalOnlyExample() {
	return (
		<ScrollBar
			vertical={true}
			horizontal={false}
			style={{ height: 400, overflow: "hidden" }}
		>
			<div style={{ padding: 16 }}>
				{/* Long vertical content */}
			</div>
		</ScrollBar>
	);
}
```

You can omit `vertical={true}` — it's the default. Only the vertical scrollbar will appear when the content is taller than the visible area.

## When to use

- Sidebars, menus, or lists that only scroll up/down.
- When you don't want a horizontal bar at the bottom.

Next: [Horizontal only](/solid/usage/horizontal-only) for the opposite case.

To place the vertical scrollbar in a custom position (e.g. on the left), use the standalone [VerticalScrollBar](/solid/usage/using-vertical-scroll-bar) component instead.
