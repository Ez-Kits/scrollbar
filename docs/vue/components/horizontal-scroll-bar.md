---
title: HorizontalScrollBar
description: A horizontal scrollbar that syncs with a scrollable container you provide.
---

# `HorizontalScrollBar`

`HorizontalScrollBar` renders only the **horizontal** scrollbar. You pass the scrollable container (and optionally track/thumb props). Use it when you need a custom layout instead of the all-in-one `<ScrollBar>` component.

## Import

```ts
import { HorizontalScrollBar } from "@ez-kits/scrollbar-vue";
```

## Basic usage

You must pass a **container**: the element that scrolls (usually a ref).

```vue
<script setup>
import { ref } from "vue";
import { HorizontalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
</script>

<template>
	<div style="display: flex; flex-direction: column; width: 400px">
		<div ref="containerRef" style="overflow: auto; white-space: nowrap">
			<!-- Wide scrollable content -->
		</div>
		<HorizontalScrollBar :container="containerRef" />
	</div>
</template>
```

The component renders a track and thumb and keeps them in sync with the container's scroll position and size.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `container` | `HTMLElement \| null` | The scrollable element. Usually the value of a ref. |
| `trackProps` | `object` | Optional. Props for the track element. |
| `thumbProps` | `object` | Optional. Props for the thumb element. |

## When to use

- You want the scrollbar in a different place (e.g. above the content).
- You're building a custom scrollbar UI and need full control.

Otherwise, the [ScrollBar](/vue/components/scroll-bar) component is simpler. See [useHorizontalScrollBar](/vue/composables/use-horizontal-scroll-bar) for a lower-level API.
