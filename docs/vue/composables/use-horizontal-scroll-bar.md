---
title: useHorizontalScrollBar
description: Composable that connects a horizontal scrollbar to a container, track, and thumb. Returns the scrollbar instance.
---

# `useHorizontalScrollBar`

`useHorizontalScrollBar` is a composable that wires up a **horizontal** scrollbar: you tell it which element is the container, which is the track, and which is the thumb. It returns the scrollbar instance so you can read state or integrate with other logic.

## Import

```ts
import { useHorizontalScrollBar } from "@ez-kits/scrollbar-vue";
```

If your package does not export composables from the main entry, you may need to import from a subpath if provided by the library.

## Usage

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
			<!-- wide content -->
		</div>
		<div ref="trackRef">
			<div ref="thumbRef" />
		</div>
	</div>
</template>
```

## Options (Partial<ScrollBarOptions>)

Same as [useVerticalScrollBar](/vue/composables/use-vertical-scroll-bar): `getContainerElement`, `getTrackElement`, `getThumbElement`, and optionally `shouldAttachScrollBarStateToContainer`. Options can be refs or getters.

## Return value

Returns a **HorizontalScrollBarInstance** with **store** and **updateOptions**. See the vertical composable for details.
