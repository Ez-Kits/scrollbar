---
title: Using HorizontalScrollBar (Standalone)
description: Use the standalone HorizontalScrollBar component when you need full control over layout — you provide the scrollable container and place the scrollbar wherever you want.
---

# Using HorizontalScrollBar (Standalone)

The library exports a **standalone** `HorizontalScrollBar` component. You provide the scrollable container and place the horizontal scrollbar wherever you want in your layout (e.g. above the content instead of below).

## When to use standalone HorizontalScrollBar

- You want the **scrollbar above** the content instead of below.
- You need a **custom layout** (e.g. scrollbar in a toolbar, or in a different row).
- You're building a **wide table or timeline** where the scrollable area and scrollbar are in separate panels.

If the default `<ScrollBar>` layout is fine, use that instead — it's simpler.

## Basic example

You need a **container** (the element that scrolls) and the **HorizontalScrollBar** with the `container` prop. In Solid use a signal or ref callback for the container.

```tsx
import { createSignal } from "solid-js";
import { HorizontalScrollBar } from "@ez-kits/scrollbar-solid";

export function StandaloneHorizontalExample() {
	const [container, setContainer] = createSignal<HTMLDivElement>();

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			<div
				ref={setContainer}
				style={{
					overflow: "auto",
					whiteSpace: "nowrap",
					padding: 16,
				}}
			>
				<span>Item 1</span> <span>Item 2</span> <span>Item 3</span>
			</div>
			<HorizontalScrollBar container={container()} />
		</div>
	);
}
```

Give the wrapper a width and use `whiteSpace: "nowrap"` (or wide content) so the content overflows horizontally.

## Scrollbar above the content

Put `HorizontalScrollBar` before the content:

```tsx
<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
	<HorizontalScrollBar container={container()} />
	<div ref={setContainer} style={{ overflow: "auto", whiteSpace: "nowrap" }}>
		{/* wide content */}
	</div>
</div>
```

## Styling the track and thumb

Use `trackProps` and `thumbProps`:

```tsx
<HorizontalScrollBar
	container={container()}
	trackProps={{
		class: "my-track",
		style: { height: 10, background: "#eee", borderRadius: 5 },
	}}
	thumbProps={{
		class: "my-thumb",
		style: { background: "#666", borderRadius: 5 },
	}}
/>
```

## Summary

| Need | Use |
|------|-----|
| Simple content + scrollbar in one wrapper | [ScrollBar](/solid/components/scroll-bar) with `vertical={false}` |
| Custom layout, scrollbar above/below/custom position | **HorizontalScrollBar** with `container` |

For the full API see [HorizontalScrollBar](/solid/components/horizontal-scroll-bar). For vertical standalone see [Using VerticalScrollBar (Standalone)](/solid/usage/using-vertical-scroll-bar).
