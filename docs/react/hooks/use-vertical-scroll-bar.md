---
title: useVerticalScrollBar
description: Hook that connects a vertical scrollbar to a container, track, and thumb. Returns the scrollbar instance.
---

# `useVerticalScrollBar`

`useVerticalScrollBar` is a hook that wires up a **vertical** scrollbar: you tell it which element is the container, which is the track, and which is the thumb. It returns the scrollbar instance (from the core library) so you can read state or integrate with other logic.

## Import

```ts
import { useVerticalScrollBar } from "@ez-kits/scrollbar-react";
```

## Usage

```tsx
import { useRef } from "react";
import { useVerticalScrollBar } from "@ez-kits/scrollbar-react";

function CustomScrollBar() {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	const instance = useVerticalScrollBar({
		getContainerElement: () => containerRef.current,
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
	});

	return (
		<div style={{ display: "flex", height: 300 }}>
			<div ref={containerRef} style={{ flex: 1, overflow: "auto" }}>
				{/* content */}
			</div>
			<div ref={trackRef}>
				<div ref={thumbRef} />
			</div>
		</div>
	);
}
```

The hook mounts the scrollbar logic on mount and unmounts it on unmount. You must provide the three element getters; the rest of the options have defaults.

## Options (Partial<ScrollBarOptions>)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `getContainerElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the scrollable container. |
| `getTrackElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the track element. |
| `getThumbElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the thumb element. |
| `shouldAttachScrollBarStateToContainer` | `boolean` | `true` | Whether to attach scroll state (e.g. for CSS or behavior) to the container. |
| `getElementsToAttachScrollBarStateTo` | `() => Iterable<HTMLElement \| null \| undefined>` | — | Optional. Elements to attach scroll state to (if you need more than the container). |

## Return value

The hook returns a **VerticalScrollBarInstance** (from `@ez-kits/scrollbar-core`). It has:

- **store** — Reactive-like state: `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`.
- **updateOptions(options)** — Update options (e.g. if container ref changes).
- **mount()** / **unmount()** — The hook calls these for you; you usually don’t call them.

You can use `instance.store` to drive styling or UI (e.g. highlight thumb when `isHoveringThumb` is true). Note: the store is a plain object; for React you may need to trigger re-renders yourself (e.g. by storing relevant values in state and subscribing to the instance if it exposes a listener).

## Type

```ts
import type { ScrollBarOptions } from "@ez-kits/scrollbar-core";

function useVerticalScrollBar(options: Partial<ScrollBarOptions>): VerticalScrollBarInstance;
```

For the full `ScrollBarStore` and `ScrollBarOptions` types, see the core package or [useHorizontalScrollBar](/react/hooks/use-horizontal-scroll-bar) for the horizontal variant.
