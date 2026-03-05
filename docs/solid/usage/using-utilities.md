---
title: Using Utilities
description: Use createVerticalScrollBar and createHorizontalScrollBar for full control over the scrollbar DOM.
---

# Using Utilities

When you need a custom layout (e.g. your own track/thumb structure or animations), you can use the utilities instead of the pre-built components.

## When to use the utilities

- You want to place the track and thumb in a different part of the DOM.
- You're building a custom scrollbar UI.
- You need the scrollbar **instance** to read state (e.g. `store.isHoveringThumb`) or to integrate with other logic.

If the `<ScrollBar>` or `<VerticalScrollBar>` / `<HorizontalScrollBar>` components are enough, you don't need the utilities.

## createVerticalScrollBar

You pass options that tell the utility **which elements** are the container, track, and thumb. It returns an instance that stays in sync with the container's scroll. The utility runs in Solid's lifecycle (onMount / onCleanup).

```tsx
import { createVerticalScrollBar } from "@ez-kits/scrollbar-solid";

function CustomVerticalScrollBar() {
	let containerRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;
	let thumbRef: HTMLDivElement | undefined;

	createVerticalScrollBar({
		getContainerElement: () => containerRef,
		getTrackElement: () => trackRef,
		getThumbElement: () => thumbRef,
	});

	return (
		<div style={{ display: "flex", height: 300 }}>
			<div ref={(el) => (containerRef = el)} style={{ flex: 1, overflow: "auto" }}>
				{/* Your scrollable content */}
			</div>
			<div ref={(el) => (trackRef = el)} class="track">
				<div ref={(el) => (thumbRef = el)} class="thumb" />
			</div>
		</div>
	);
}
```

You are responsible for giving the container a fixed size and `overflow: auto`, and for rendering the track and thumb elements.

## createHorizontalScrollBar

Same idea for horizontal scrolling:

```tsx
import { createHorizontalScrollBar } from "@ez-kits/scrollbar-solid";

function CustomHorizontalScrollBar() {
	let containerRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;
	let thumbRef: HTMLDivElement | undefined;

	createHorizontalScrollBar({
		getContainerElement: () => containerRef,
		getTrackElement: () => trackRef,
		getThumbElement: () => thumbRef,
	});

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			<div ref={(el) => (containerRef = el)} style={{ overflow: "auto", whiteSpace: "nowrap" }}>
				{/* Wide content */}
			</div>
			<div ref={(el) => (trackRef = el)} class="track">
				<div ref={(el) => (thumbRef = el)} class="thumb" />
			</div>
		</div>
	);
}
```

## Options (ScrollBarOptions)

Both utilities accept a partial `ScrollBarOptions` object. Options can be accessors (getters) for reactivity. Common options:

- **getContainerElement** — () => scrollable element
- **getTrackElement** — () => track element
- **getThumbElement** — () => thumb element
- **shouldAttachScrollBarStateToContainer** — whether to attach scroll state to the container (default `true`)

The returned instance has a `.store` with properties like `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`. You can use these for styling or UI logic.

For full option and store types, see the [API docs](/solid/utilities/create-vertical-scroll-bar).
