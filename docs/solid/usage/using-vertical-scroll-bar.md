---
title: Using VerticalScrollBar (Standalone)
description: Use the standalone VerticalScrollBar component when you need full control over layout — you provide the scrollable container and place the scrollbar wherever you want.
---

# Using VerticalScrollBar (Standalone)

The library exports a **standalone** `VerticalScrollBar` component. You provide the scrollable container and place the vertical scrollbar wherever you want in your layout (e.g. on the left instead of the right).

## When to use standalone VerticalScrollBar

- You want the **scrollbar on the left** instead of the right.
- You need a **custom layout** (e.g. scrollbar inside a sidebar, or in a different part of the page).
- You're building a **split view** where the scrollable area and scrollbar are in separate panels.

If the default `<ScrollBar>` layout is fine, use that instead — it's simpler.

## Basic example

You need a **container** (the element that scrolls) and the **VerticalScrollBar** with the `container` prop. In Solid you typically use a signal or ref callback to hold the container element.

```tsx
import { createSignal } from "solid-js";
import { VerticalScrollBar } from "@ez-kits/scrollbar-solid";

export function StandaloneVerticalExample() {
	const [container, setContainer] = createSignal<HTMLDivElement>();

	return (
		<div style={{ display: "flex", height: 300 }}>
			<div
				ref={setContainer}
				style={{ flex: 1, overflow: "auto", padding: 16 }}
			>
				<p>Long content...</p>
				<p>More lines...</p>
			</div>
			<VerticalScrollBar container={container()} />
		</div>
	);
}
```

The scrollbar stays in sync with the container. Pass the current container element: `container={container()}`.

## Scrollbar on the left

Put `VerticalScrollBar` before the content:

```tsx
<div style={{ display: "flex", height: 300 }}>
	<VerticalScrollBar container={container()} />
	<div ref={setContainer} style={{ flex: 1, overflow: "auto" }}>
		{/* content */}
	</div>
</div>
```

## Styling the track and thumb

Use `trackProps` and `thumbProps`:

```tsx
<VerticalScrollBar
	container={container()}
	trackProps={{
		class: "my-track",
		style: { width: 10, background: "#eee", borderRadius: 5 },
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
| Simple content + scrollbar in one wrapper | [ScrollBar](/solid/components/scroll-bar) with `horizontal={false}` |
| Custom layout, scrollbar on left/right/custom position | **VerticalScrollBar** with `container` |

For the full API see [VerticalScrollBar](/solid/components/vertical-scroll-bar). For horizontal standalone see [Using HorizontalScrollBar (Standalone)](/solid/usage/using-horizontal-scroll-bar).
