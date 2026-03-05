---
title: useVerticalScrollBar
description: Composable that connects a vertical scrollbar to a container, track, and thumb. Returns the scrollbar instance.
---

# `useVerticalScrollBar`

`useVerticalScrollBar` is a composable that wires up a **vertical** scrollbar: you tell it which element is the container, which is the track, and which is the thumb. It returns the scrollbar instance so you can read state or integrate with other logic.

## Import

```ts
import { useVerticalScrollBar } from "@ez-kits/scrollbar-vue";
```

If your package does not export composables from the main entry, you may need to import from a subpath (e.g. `@ez-kits/scrollbar-vue/composables`) if provided by the library.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { useVerticalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
const trackRef = ref(null);
const thumbRef = ref(null);

const instance = useVerticalScrollBar({
	getContainerElement: () => containerRef.value,
	getTrackElement: () => trackRef.value,
	getThumbElement: () => thumbRef.value,
});
</script>

<template>
	<div style="display: flex; height: 300px">
		<div ref="containerRef" style="flex: 1; overflow: auto"><!-- content --></div>
		<div ref="trackRef">
			<div ref="thumbRef" />
		</div>
	</div>
</template>
```

The composable mounts the scrollbar logic when the component is mounted and unmounts it on unmount. You must provide the three element getters.

## Options (Partial<ScrollBarOptions>)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `getContainerElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the scrollable container. |
| `getTrackElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the track element. |
| `getThumbElement` | `() => HTMLElement \| null \| undefined` | — | **Required.** Returns the thumb element. |
| `shouldAttachScrollBarStateToContainer` | `boolean` | `true` | Whether to attach scroll state to the container. |

Options can be refs or getters; the composable accepts Vue's `ToMaybeRefObject` for reactivity.

## Return value

The composable returns a **VerticalScrollBarInstance** (from `@ez-kits/scrollbar-core`) with:

- **store** — State: `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`.
- **updateOptions(options)** — Update options (called automatically when options change).

See [useHorizontalScrollBar](/vue/composables/use-horizontal-scroll-bar) for the horizontal variant.
