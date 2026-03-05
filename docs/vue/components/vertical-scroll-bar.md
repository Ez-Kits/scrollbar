---
title: VerticalScrollBar
description: A vertical scrollbar that syncs with a scrollable container you provide.
---

# `VerticalScrollBar`

`VerticalScrollBar` renders only the **vertical** scrollbar. You pass the scrollable container (and optionally track/thumb props). Use it when you need a custom layout instead of the all-in-one `<ScrollBar>` component.

## Import

```ts
import { VerticalScrollBar } from "@ez-kits/scrollbar-vue";
```

## Basic usage

You must pass a **container**: the element that scrolls (usually a ref to a div with overflow).

```vue
<script setup>
import { ref } from "vue";
import { VerticalScrollBar } from "@ez-kits/scrollbar-vue";

const containerRef = ref(null);
</script>

<template>
	<div style="display: flex; height: 300px">
		<div ref="containerRef" style="flex: 1; overflow: auto">
			<!-- Scrollable content -->
		</div>
		<VerticalScrollBar :container="containerRef" />
	</div>
</template>
```

The component renders a track and thumb and keeps them in sync with the container's scroll position and size.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `container` | `HTMLElement \| null` | The scrollable element. Usually the value of a ref. |
| `trackProps` | `object` | Optional. Props for the track element (e.g. `class`, `style`). |
| `thumbProps` | `object` | Optional. Props for the thumb element. |

## When to use

- You want the scrollbar in a different place (e.g. left side, or inside a custom panel).
- You're building a custom scrollbar UI and need full control over the wrapper layout.

Otherwise, the [ScrollBar](/vue/components/scroll-bar) component is simpler. See [useVerticalScrollBar](/vue/composables/use-vertical-scroll-bar) for an even lower-level API.
