---
title: ScrollBar
description: The main ScrollBar component that wraps content and shows vertical and/or horizontal scrollbars.
---

# `ScrollBar`

`ScrollBar` is the component you'll use most often. It wraps your content, creates the scrollable area, and renders the scrollbar(s) for it.

## Import

```ts
import { ScrollBar } from "@ez-kits/scrollbar-vue";
```

## Basic usage

```vue
<ScrollBar :style="{ height: '300px', overflow: 'hidden' }">
	<div style="padding: 16px"><!-- Your content --></div>
</ScrollBar>
```

The first child of `ScrollBar` is the **scrollable container**. Give the outer wrapper a height (and optionally width) so the content can overflow; the library will show vertical and/or horizontal scrollbars as needed.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `horizontal` | `boolean \| object` | `true` | Whether to show the horizontal scrollbar. Pass `false` to hide, or an object with `trackProps` / `thumbProps`. |
| `vertical` | `boolean \| object` | `true` | Whether to show the vertical scrollbar. Pass `false` to hide, or an object with `trackProps` / `thumbProps`. |
| `scrollerProps` | `object` | `{}` | Props applied to the inner scrollable element. |

When `vertical` or `horizontal` is an object, it can include `trackProps` and `thumbProps` (e.g. `class`, `style`) for the track and thumb elements.

## Examples

Vertical only:

```vue
<ScrollBar :horizontal="false" :style="{ height: '400px' }">
	<div><!-- content --></div>
</ScrollBar>
```

With custom track/thumb styling:

```vue
<ScrollBar
	:style="{ height: '300px' }"
	:vertical="{
		trackProps: { style: { width: '10px', background: '#eee' } },
		thumbProps: { style: { background: '#666' } },
	}"
>
	<div><!-- content --></div>
</ScrollBar>
```

See [VerticalScrollBar](/vue/components/vertical-scroll-bar) and [HorizontalScrollBar](/vue/components/horizontal-scroll-bar) for the building blocks used inside `ScrollBar`.
