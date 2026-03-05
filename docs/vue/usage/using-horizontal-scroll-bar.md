---
title: Using HorizontalScrollBar (Standalone)
description: Use the standalone HorizontalScrollBar component when you need full control over layout — you provide the scrollable container and place the scrollbar wherever you want.
---

# Using HorizontalScrollBar (Standalone)

The library exports a **standalone** `HorizontalScrollBar` component. You provide the scrollable container and place the horizontal scrollbar wherever you want in your layout (e.g. above the content instead of below).

## When to use standalone HorizontalScrollBar

- You want the **scrollbar above** the content instead of below.
- You need a **custom layout** (e.g. scrollbar in a toolbar, or in a different row).
- You're building a **wide table or timeline** where the scrollable area and scrollbar are in separate panels.

If the default `<ScrollBar>` layout is fine, use that instead — it's simpler.

## Basic example

You need a **container** (the element that scrolls) and the **HorizontalScrollBar** with the `container` prop.

```vue
<script setup>
import { ref } from "vue";
import { HorizontalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
</script>

<template>
	<div style="display: flex; flex-direction: column; width: 400px">
		<div
			ref="containerRef"
			style="overflow: auto; white-space: nowrap; padding: 16px"
		>
			<span>Item 1</span> <span>Item 2</span> <span>Item 3</span>
		</div>
		<HorizontalScrollBar :container="containerRef" />
	</div>
</template>
```

Give the wrapper a width and use `white-space: nowrap` (or wide content) so the content overflows horizontally.

## Scrollbar above the content

Put `HorizontalScrollBar` before the content:

```vue
<div style="display: flex; flex-direction: column; width: 400px">
	<HorizontalScrollBar :container="containerRef" />
	<div ref="containerRef" style="overflow: auto; white-space: nowrap">
		<!-- wide content -->
	</div>
</div>
```

## Styling the track and thumb

Use `trackProps` and `thumbProps`:

```vue
<HorizontalScrollBar
	:container="containerRef"
	:track-props="{ class: 'my-track', style: { height: '10px', background: '#eee' } }"
	:thumb-props="{ class: 'my-thumb', style: { background: '#666' } }"
/>
```

## Summary

| Need | Use |
|------|-----|
| Simple content + scrollbar in one wrapper | [ScrollBar](/vue/components/scroll-bar) with `:vertical="false"` |
| Custom layout, scrollbar above/below/custom position | **HorizontalScrollBar** with `container` |

For the full API see [HorizontalScrollBar](/vue/components/horizontal-scroll-bar). For vertical standalone see [Using VerticalScrollBar (Standalone)](/vue/usage/using-vertical-scroll-bar).
