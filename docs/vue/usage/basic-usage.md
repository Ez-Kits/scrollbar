---
title: Basic Usage
description: Use the ScrollBar component to add vertical and horizontal scrollbars to any content.
---

# Basic Usage

The simplest way to use Ez Scrollbar is to wrap your scrollable content with the `<ScrollBar>` component.

## Minimal example

Give the wrapper a fixed height (and optionally width) so the content can overflow and scroll:

```vue
<script setup>
import { ScrollBar } from "@ez-kits/scrollbar-vue";
</script>

<template>
	<ScrollBar :style="{ height: '300px', overflow: 'hidden' }">
		<div style="padding: 16px">
			<h2>Scrollable content</h2>
			<p>First paragraph...</p>
			<p>Second paragraph...</p>
		</div>
	</ScrollBar>
</template>
```

By default, both **vertical** and **horizontal** scrollbars are shown when needed.

## Tips for beginners

1. **Height is required** — Use something like `height: 300px`, `height: 50vh`, or a flex layout that gives the area a fixed height.
2. **Use one inner wrapper** — The first child of `<ScrollBar>` is the scrollable area. Put all your content inside that child.
3. **Styling the wrapper** — You can pass `style` or `class` to `<ScrollBar>`; use `scrollerProps` to pass props to the inner scrollable element.

## With a class

```vue
<ScrollBar class="my-scroll-area" :style="{ height: '400px' }">
	<div class="my-content"><!-- content --></div>
</ScrollBar>
```

Next: [Vertical only](/vue/usage/vertical-only) or [Horizontal only](/vue/usage/horizontal-only) if you want scroll in one direction.
