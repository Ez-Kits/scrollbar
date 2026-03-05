---
title: Vertical Only
description: Show only the vertical scrollbar.
---

# Vertical Only

If your content only scrolls vertically (e.g. a long list or article), you can hide the horizontal scrollbar.

## Using the ScrollBar component

Set `horizontal={false}`:

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-react";

export function VerticalOnlyExample() {
	return (
		<ScrollBar
			vertical={true}
			horizontal={false}
			style={{ height: 400, overflow: "hidden" }}
		>
			<div style={{ padding: 16 }}>
				{/* Long vertical content — no wide content, so no horizontal scroll */}
				<p>Line 1</p>
				<p>Line 2</p>
				{/* ... */}
			</div>
		</ScrollBar>
	);
}
```

You can omit `vertical={true}` — it’s the default. Only the vertical scrollbar will appear when the content is taller than the visible area.

## When to use

- Sidebars, menus, or lists that only scroll up/down.
- When you don’t want a horizontal bar at the bottom even if the content is slightly wider (e.g. long lines that you’re okay to have clipped or wrapped).

Next: [Horizontal only](/react/usage/horizontal-only) for the opposite case.
