---
title: Using Composables
description: Use useVerticalScrollBar and useHorizontalScrollBar for full control over the scrollbar DOM.
---

# Using Composables

When you need a custom layout (e.g. your own track/thumb structure or animations), you can use the composables instead of the pre-built components.

## When to use the composables

- You want to place the track and thumb in a different part of the DOM.
- You're building a custom scrollbar UI.
- You need the scrollbar **instance** to read state (e.g. `store.isHoveringThumb`) or to integrate with other logic.

If the `<ScrollBar>` or `<VerticalScrollBar>` / `<HorizontalScrollBar>` components are enough, you don't need the composables.

## useVerticalScrollBar

You pass options that tell the composable **which elements** are the container, track, and thumb. It returns an instance that stays in sync with the container's scroll.

```vue
<script setup>
import { ref } from "vue";
import { useVerticalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
const trackRef = ref(null);
const thumbRef = ref(null);

useVerticalScrollBar({
	getContainerElement: () => containerRef.value,
	getTrackElement: () => trackRef.value,
	getThumbElement: () => thumbRef.value,
});
</script>

<template>
	<div style="display: flex; height: 300px">
		<div ref="containerRef" style="flex: 1; overflow: auto">
			<!-- Your scrollable content -->
		</div>
		<div ref="trackRef" class="track">
			<div ref="thumbRef" class="thumb" />
		</div>
	</div>
</template>
```

You are responsible for giving the container a fixed size and `overflow: auto`, and for rendering the track and thumb elements.

## useHorizontalScrollBar

Same idea for horizontal scrolling:

```vue
<script setup>
import { ref } from "vue";
import { useHorizontalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
const trackRef = ref(null);
const thumbRef = ref(null);

useHorizontalScrollBar({
	getContainerElement: () => containerRef.value,
	getTrackElement: () => trackRef.value,
	getThumbElement: () => thumbRef.value,
});
</script>

<template>
	<div style="display: flex; flex-direction: column; width: 400px">
		<div ref="containerRef" style="overflow: auto; white-space: nowrap">
			<!-- Wide content -->
		</div>
		<div ref="trackRef" class="track">
			<div ref="thumbRef" class="thumb" />
		</div>
	</div>
</template>
```

## Options (ScrollBarOptions)

Both composables accept a partial `ScrollBarOptions` object. Common options:

- **getContainerElement** — () => scrollable element
- **getTrackElement** — () => track element
- **getThumbElement** — () => thumb element
- **shouldAttachScrollBarStateToContainer** — whether to attach scroll state to the container (default `true`)

The returned instance has a `.store` with properties like `thumbSize`, `thumbOffset`, `trackSize`, `isHoveringTrack`, `isHoveringThumb`, `isDraggingThumb`, `isScrolling`, `isScrollable`. You can use these for styling or UI logic.

For full option and store types, see the [API docs](/vue/composables/use-vertical-scroll-bar).
