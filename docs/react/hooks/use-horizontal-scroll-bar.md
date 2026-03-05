---
title: useHorizontalScrollBar
description: Hook that connects a horizontal scrollbar to a container, track, and thumb. Returns the scrollbar instance.
---

# `useHorizontalScrollBar`

`useHorizontalScrollBar` is a hook that wires up a **horizontal** scrollbar: you tell it which element is the container, which is the track, and which is the thumb. It returns the scrollbar instance so you can read state or integrate with other logic.

## Import

```ts
import { useHorizontalScrollBar } from "@ez-kits/scrollbar-react";
```

## Usage

```tsx
import { useRef } from "react";
import { useHorizontalScrollBar } from "@ez-kits/scrollbar-react";

function CustomScrollBar() {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	const instance = useHorizontalScrollBar({
		getContainerElement: () => containerRef.current,
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
	});

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			<div ref={containerRef} style={{ overflow: "auto", whiteSpace: "nowrap" }}>
				{/* wide content */}
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
| `shouldAttachScrollBarStateToContainer` | `boolean` | `true` | Whether to attach scroll state to the container. |
| `getElementsToAttachScrollBarStateTo` | `() => Iterable<HTMLElement \| null \| undefined>` | — | Optional. Elements to attach scroll state to. |

## Return value

The hook returns a **HorizontalScrollBarInstance** (from `@ez-kits/scrollbar-core`). It has:

- **store** — State: `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`.
- **updateOptions(options)** — Update options.
- **mount()** / **unmount()** — Called by the hook; you usually don’t call them.

## Type

```ts
import type { ScrollBarOptions } from "@ez-kits/scrollbar-core";

function useHorizontalScrollBar(options: Partial<ScrollBarOptions>): HorizontalScrollBarInstance;
```

See [useVerticalScrollBar](/react/hooks/use-vertical-scroll-bar) for the vertical variant and the same option/store types.
