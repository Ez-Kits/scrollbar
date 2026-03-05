---
title: Using HorizontalScrollBar (Standalone)
description: Use the standalone HorizontalScrollBar component when you need full control over layout — you provide the scrollable container and place the scrollbar wherever you want.
---

# Using HorizontalScrollBar (Standalone)

The library exports a **standalone** `HorizontalScrollBar` component. Unlike the all-in-one `<ScrollBar>`, you provide the scrollable container yourself and place the horizontal scrollbar wherever you want in your layout. This is useful when the default "content + scrollbar below" layout doesn't fit your design.

## When to use standalone HorizontalScrollBar

- You want the **scrollbar above** the content instead of below.
- You need a **custom layout** (e.g. scrollbar in a toolbar, or in a different column).
- You're building a **wide table or timeline** where the scrollable area and scrollbar are in separate rows or panels.

If the default `<ScrollBar>` layout (content + scrollbars in one wrapper) is fine, use that instead — it's simpler.

## Basic example

You need:

1. A **container** — the element that scrolls (e.g. a `div` with `overflow: auto` and a fixed width, and content that overflows horizontally).
2. The **HorizontalScrollBar** — pass the container via the `container` prop (a ref or the element itself).

```tsx
import { useRef } from "react";
import { HorizontalScrollBar } from "@ez-kits/scrollbar-react";

export function StandaloneHorizontalExample() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			{/* Scrollable content */}
			<div
				ref={containerRef}
				style={{
					overflow: "auto",
					whiteSpace: "nowrap",
					padding: 16,
				}}
			>
				<span>Item 1</span> <span>Item 2</span> <span>Item 3</span>
				{/* ... wide content */}
			</div>
			{/* Scrollbar below — you control where it goes */}
			<HorizontalScrollBar container={containerRef} />
		</div>
	);
}
```

The scrollbar stays in sync with the container. Give the wrapper a width (or max-width) so the content can overflow horizontally; use `whiteSpace: "nowrap"` (or a wide inner element) so the content doesn't wrap.

## Scrollbar above the content

Put `HorizontalScrollBar` before the content in the layout:

```tsx
<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
	<HorizontalScrollBar container={containerRef} />
	<div
		ref={containerRef}
		style={{ overflow: "auto", whiteSpace: "nowrap" }}
	>
		{/* wide content */}
	</div>
</div>
```

## Styling the track and thumb

Use `trackProps` and `thumbProps` to pass `className`, `style`, or any other div props:

```tsx
<HorizontalScrollBar
	container={containerRef}
	trackProps={{
		className: "my-track",
		style: { height: 10, background: "#eee", borderRadius: 5 },
	}}
	thumbProps={{
		className: "my-thumb",
		style: { background: "#666", borderRadius: 5 },
	}}
/>
```

## Container can be a ref or element

`container` accepts:

- A **ref object** (e.g. `containerRef` from `useRef`) — recommended.
- The **element itself** (e.g. `containerRef.current`) when the element is already mounted and stable.

```tsx
<HorizontalScrollBar container={containerRef} />
```

## Summary

| Need | Use |
|------|-----|
| Simple content + scrollbar in one wrapper | [ScrollBar](/react/components/scroll-bar) with `vertical={false}` |
| Custom layout, scrollbar above/below/custom position | **HorizontalScrollBar** with `container` ref |

For the full API (props and types), see [HorizontalScrollBar](/react/components/horizontal-scroll-bar). For vertical standalone usage, see [Using VerticalScrollBar (Standalone)](/react/usage/using-vertical-scroll-bar).
