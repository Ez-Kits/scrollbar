---
title: createVerticalScrollBar
description: Utility that connects a vertical scrollbar to a container, track, and thumb. Returns the scrollbar instance. Mounts on Solid's onMount and unmounts on onCleanup.
---

# `createVerticalScrollBar`

`createVerticalScrollBar` is a utility that wires up a **vertical** scrollbar: you tell it which element is the container, which is the track, and which is the thumb. It returns the scrollbar instance so you can read state or integrate with other logic. It uses Solid's `onMount` and `onCleanup` to mount and unmount the scrollbar.

## Import

```ts
import { createVerticalScrollBar } from "@ez-kits/scrollbar-solid";
```

## Usage

```tsx
import { createVerticalScrollBar } from "@ez-kits/scrollbar-solid";

function CustomScrollBar() {
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
				{/* content */}
			</div>
			<div ref={(el) => (trackRef = el)}>
				<div ref={(el) => (thumbRef = el)} />
			</div>
		</div>
	);
}
```

You must provide the three element getters. Options can be accessors (getters) so that when they change, the instance is updated via `createEffect`.

## Options (Partial<ScrollBarOptions>)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `getContainerElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the scrollable container. |
| `getTrackElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the track element. |
| `getThumbElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the thumb element. |
| `shouldAttachScrollBarStateToContainer` | `boolean \| Accessor<boolean>` | `true` | Whether to attach scroll state to the container. |

In Solid, options can be **accessors** (getters) for reactivity; the utility uses `getValueFromAccessor` internally so you can pass either a value or an accessor.

## Return value

Returns a **VerticalScrollBarInstance** (from `@ez-kits/scrollbar-core`) with:

- **store** — State: `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`.
- **updateOptions(options)** — Update options (also called automatically in a `createEffect` when options change).

See [createHorizontalScrollBar](/solid/utilities/create-horizontal-scroll-bar) for the horizontal variant.
