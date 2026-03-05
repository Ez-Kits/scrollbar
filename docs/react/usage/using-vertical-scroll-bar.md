---
title: Using VerticalScrollBar (Standalone)
description: Use the standalone VerticalScrollBar component when you need full control over layout — you provide the scrollable container and place the scrollbar wherever you want.
---

# Using VerticalScrollBar (Standalone)

The library exports a **standalone** `VerticalScrollBar` component. Unlike the all-in-one `<ScrollBar>`, you provide the scrollable container yourself and place the vertical scrollbar wherever you want in your layout. This is useful when the default "content + scrollbar on the right" layout doesn't fit your design.

## When to use standalone VerticalScrollBar

- You want the **scrollbar on the left** instead of the right.
- You need a **custom layout** (e.g. scrollbar inside a sidebar, or in a different part of the page).
- You're building a **split view** or editor where the scrollable area and scrollbar are in separate panels.

If the default `<ScrollBar>` layout (content + scrollbars in one wrapper) is fine, use that instead — it's simpler.

## Basic example

You need:

1. A **container** — the element that scrolls (e.g. a `div` with `overflow: auto` and a fixed height).
2. The **VerticalScrollBar** — pass the container via the `container` prop (a ref or the element itself).

```tsx
import { useRef } from "react";
import { VerticalScrollBar } from "@ez-kits/scrollbar-react";

export function StandaloneVerticalExample() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div style={{ display: "flex", height: 300 }}>
			{/* Scrollable content */}
			<div
				ref={containerRef}
				style={{ flex: 1, overflow: "auto", padding: 16 }}
			>
				<p>Long content...</p>
				<p>More lines...</p>
			</div>
			{/* Scrollbar on the right — you control where it goes */}
			<VerticalScrollBar container={containerRef} />
		</div>
	);
}
```

The scrollbar stays in sync with the container: when the user scrolls the div (or drags the thumb), the position updates. The library measures the container and sets the thumb size and position for you.

## Scrollbar on the left

Put `VerticalScrollBar` before the content in the layout:

```tsx
<div style={{ display: "flex", height: 300 }}>
	<VerticalScrollBar container={containerRef} />
	<div ref={containerRef} style={{ flex: 1, overflow: "auto" }}>
		{/* content */}
	</div>
</div>
```

## Styling the track and thumb

Use `trackProps` and `thumbProps` to pass `className`, `style`, or any other div props:

```tsx
<VerticalScrollBar
	container={containerRef}
	trackProps={{
		className: "my-track",
		style: { width: 10, background: "#eee", borderRadius: 5 },
	}}
	thumbProps={{
		className: "my-thumb",
		style: { background: "#666", borderRadius: 5 },
	}}
/>
```

## Container can be a ref or element

`container` accepts:

- A **ref object** (e.g. `containerRef` from `useRef`) — recommended so the same ref is used for the scrollable div and the scrollbar.
- The **element itself** (e.g. `containerRef.current`) — use only when the element is already mounted and stable.

```tsx
// Recommended: pass the ref
<VerticalScrollBar container={containerRef} />

// Or the element (e.g. from state after mount)
<VerticalScrollBar container={containerRef.current} />
```

## Summary

| Need | Use |
|------|-----|
| Simple content + scrollbar in one wrapper | [ScrollBar](/react/components/scroll-bar) with `horizontal={false}` |
| Custom layout, scrollbar on left/right/custom position | **VerticalScrollBar** with `container` ref |

For the full API (props and types), see [VerticalScrollBar](/react/components/vertical-scroll-bar). For horizontal standalone usage, see [Using HorizontalScrollBar (Standalone)](/react/usage/using-horizontal-scroll-bar).
