---
title: Custom Styling
description: Style the scrollbar track and thumb with CSS or component props.
---

# Custom Styling

You can style the scrollbar track and thumb so it matches your app. Use the `trackProps` and `thumbProps` passed via the `vertical` or `horizontal` props (when they are objects).

## Using trackProps and thumbProps

```vue
<script setup>
import { ScrollBar } from "@ez-kits/scrollbar-vue";
</script>

<template>
	<ScrollBar
		:style="{ height: '300px', overflow: 'hidden' }"
		:vertical="{
			trackProps: {
				class: 'my-vertical-track',
				style: { width: '10px', background: '#eee', borderRadius: '5px' },
			},
			thumbProps: {
				class: 'my-vertical-thumb',
				style: { background: '#999', borderRadius: '5px' },
			},
		}"
		:horizontal="{
			trackProps: { class: 'my-horizontal-track' },
			thumbProps: { class: 'my-horizontal-thumb' },
		}"
	>
		<div style="padding: 16px"><!-- content --></div>
	</ScrollBar>
</template>

<style scoped>
.my-vertical-track {
	width: 10px;
	background: #eee;
	border-radius: 5px;
}

.my-vertical-thumb {
	background: #999;
	border-radius: 5px;
}

.my-horizontal-track {
	height: 10px;
	background: #eee;
	border-radius: 5px;
}

.my-horizontal-thumb {
	background: #999;
	border-radius: 5px;
}
</style>
```

## Sizing tips

- **Vertical scrollbar**: set a width on the track; the library controls the thumb height.
- **Horizontal scrollbar**: set a height on the track; the library controls the thumb width.

Next: [Using composables](/vue/usage/using-composables) when you need full control over the DOM structure.
