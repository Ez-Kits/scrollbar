---
title: Using Hooks
description: Use useVerticalScrollBar and useHorizontalScrollBar for full control over the scrollbar DOM.
---

# Using Hooks

When you need a custom layout (e.g. your own track/thumb structure or animations), you can use the hooks instead of the pre-built components.

## When to use the hooks

- You want to place the track and thumb in a different part of the DOM.
- You're building a custom scrollbar UI (e.g. with different markup or libraries).
- You need the scrollbar **instance** to read state (e.g. `store.isHoveringThumb`) or to integrate with other logic.

If the `<ScrollBar>` or `<VerticalScrollBar>` / `<HorizontalScrollBar>` components are enough, you don't need the hooks.

## useVerticalScrollBar

You pass options that tell the hook **which elements** are the container, track, and thumb. The hook returns an instance that stays in sync with the container's scroll.

```tsx
import { useRef } from "react";
import { useVerticalScrollBar } from "@ez-kits/scrollbar-react";

function CustomVerticalScrollBar() {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	useVerticalScrollBar({
		getContainerElement: () => containerRef.current,
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
	});

	return (
		<div style={{ display: "flex", height: 300 }}>
			<div
				ref={containerRef}
				style={{ flex: 1, overflow: "auto" }}
			>
				{/* Your scrollable content */}
			</div>
			<div ref={trackRef} className="track">
				<div ref={thumbRef} className="thumb" />
			</div>
		</div>
	);
}
```

You are responsible for:

- Giving the **container** a fixed size and `overflow: auto` (or similar) so it scrolls.
- Rendering the **track** and **thumb** elements and passing their refs in the options.

## useHorizontalScrollBar

Same idea for horizontal scrolling:

```tsx
import { useRef } from "react";
import { useHorizontalScrollBar } from "@ez-kits/scrollbar-react";

function CustomHorizontalScrollBar() {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	useHorizontalScrollBar({
		getContainerElement: () => containerRef.current,
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
	});

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			<div
				ref={containerRef}
				style={{ overflow: "auto", whiteSpace: "nowrap" }}
			>
				{/* Wide content */}
			</div>
			<div ref={trackRef} className="track">
				<div ref={thumbRef} className="thumb" />
			</div>
		</div>
	);
}
```

## Options (ScrollBarOptions)

Both hooks accept a partial `ScrollBarOptions` object. Common options:

- **getContainerElement** — () => scrollable element
- **getTrackElement** — () => track element
- **getThumbElement** — () => thumb element
- **shouldAttachScrollBarStateToContainer** — whether to attach scroll state to the container (default `true`)
- **getElementsToAttachScrollBarStateTo** — () => list of elements to attach state to (if you want it on more than the container)

The returned instance has a `.store` with properties like `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`. You can use these for styling or UI logic.

For full option and store types, see the [API docs](/react/hooks/use-vertical-scroll-bar).
