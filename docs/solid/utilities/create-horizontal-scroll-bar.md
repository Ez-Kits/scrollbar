---
title: createHorizontalScrollBar
description: Utility that connects a horizontal scrollbar to a container, track, and thumb. Returns the scrollbar instance. Mounts on Solid's onMount and unmounts on onCleanup.
---

# `createHorizontalScrollBar`

`createHorizontalScrollBar` is a utility that wires up a **horizontal** scrollbar: you tell it which element is the container, which is the track, and which is the thumb. It returns the scrollbar instance so you can read state or integrate with other logic. It uses Solid's `onMount` and `onCleanup` to mount and unmount the scrollbar.

## Import

```ts
import { createHorizontalScrollBar } from "@ez-kits/scrollbar-solid";
```

## Usage

```tsx
import { createHorizontalScrollBar } from "@ez-kits/scrollbar-solid";

function CustomScrollBar() {
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
			<div
				ref={(el) => (containerRef = el)}
				style={{ overflow: "auto", whiteSpace: "nowrap" }}
			>
				{/* wide content */}
			</div>
			<div ref={(el) => (trackRef = el)}>
				<div ref={(el) => (thumbRef = el)} />
			</div>
		</div>
	);
}
```

## Options (Partial<ScrollBarOptions>)

Same as [createVerticalScrollBar](/solid/utilities/create-vertical-scroll-bar): `getContainerElement`, `getTrackElement`, `getThumbElement`, and optionally `shouldAttachScrollBarStateToContainer`. Options can be accessors for reactivity.

## Return value

Returns a **HorizontalScrollBarInstance** with **store** and **updateOptions**. The utility mounts the instance in `onMount` and unmounts it in `onCleanup`; options are synced in a `createEffect`.
