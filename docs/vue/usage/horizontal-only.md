---
title: Horizontal Only
description: Show only the horizontal scrollbar.
---

# Horizontal Only

If your content only scrolls horizontally, you can hide the vertical scrollbar.

## Using the ScrollBar component

Set `:vertical="false"`:

```vue
<script setup>
import { ScrollBar } from "@ez-kits/scrollbar-vue";
</script>

<template>
	<ScrollBar
		:vertical="false"
		:horizontal="true"
		:style="{ width: '500px', overflow: 'hidden' }"
	>
		<div style="padding: 16px; white-space: nowrap">
			<!-- Wide content -->
		</div>
	</ScrollBar>
</template>
```

Only the horizontal scrollbar will appear when the content is wider than the visible area.

## When to use

- Wide tables, galleries, or horizontal timelines.
- When you want a fixed height and no vertical scrollbar.

Tip: use a fixed or max width on the wrapper and ensure the inner content can overflow horizontally (e.g. `white-space: nowrap`).

Next: [Custom styling](/vue/usage/custom-styling) to style the track and thumb.
