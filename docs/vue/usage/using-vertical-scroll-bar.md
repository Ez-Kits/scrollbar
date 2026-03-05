---
title: Using VerticalScrollBar (Standalone)
description: Use the standalone VerticalScrollBar component when you need full control over layout — you provide the scrollable container and place the scrollbar wherever you want.
---

# Using VerticalScrollBar (Standalone)

The library exports a **standalone** `VerticalScrollBar` component. You provide the scrollable container and place the vertical scrollbar wherever you want in your layout (e.g. on the left instead of the right).

## When to use standalone VerticalScrollBar

- You want the **scrollbar on the left** instead of the right.
- You need a **custom layout** (e.g. scrollbar inside a sidebar, or in a different part of the page).
- You're building a **split view** where the scrollable area and scrollbar are in separate panels.

If the default `<ScrollBar>` layout is fine, use that instead — it's simpler.

## Basic example

You need a **container** (the element that scrolls) and the **VerticalScrollBar** with the `container` prop set to that element (or a ref).

```vue
<script setup>
import { ref } from "vue";
import { VerticalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
</script>

<template>
	<div style="display: flex; height: 300px">
		<div ref="containerRef" style="flex: 1; overflow: auto; padding: 16px">
			<p>Long content...</p>
			<p>More lines...</p>
		</div>
		<VerticalScrollBar :container="containerRef" />
	</div>
</template>
```

The scrollbar stays in sync with the container. Use `:container="containerRef"` (ref) or pass the element when it's available.

## Scrollbar on the left

Put `VerticalScrollBar` before the content:

```vue
<div style="display: flex; height: 300px">
	<VerticalScrollBar :container="containerRef" />
	<div ref="containerRef" style="flex: 1; overflow: auto"><!-- content --></div>
</div>
```

## Styling the track and thumb

Use `trackProps` and `thumbProps`:

```vue
<VerticalScrollBar
	:container="containerRef"
	:track-props="{
		class: 'my-track',
		style: { width: '10px', background: '#eee', borderRadius: '5px' },
	}"
	:thumb-props="{
		class: 'my-thumb',
		style: { background: '#666', borderRadius: '5px' },
	}"
/>
```

## Summary

| Need | Use |
|------|-----|
| Simple content + scrollbar in one wrapper | [ScrollBar](/vue/components/scroll-bar) with `:horizontal="false"` |
| Custom layout, scrollbar on left/right/custom position | **VerticalScrollBar** with `container` |

For the full API see [VerticalScrollBar](/vue/components/vertical-scroll-bar). For horizontal standalone usage see [Using HorizontalScrollBar (Standalone)](/vue/usage/using-horizontal-scroll-bar).
