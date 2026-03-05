---
title: ScrollBar
description: The main ScrollBar component that wraps content and shows vertical and/or horizontal scrollbars.
---

# `ScrollBar`

`ScrollBar` is the component you'll use most often. It wraps your content, creates the scrollable area, and renders the scrollbar(s) for it.

## Import

```ts
import { ScrollBar } from "@ez-kits/scrollbar-solid";
```

## Basic usage

```tsx
<ScrollBar style={{ height: 300, overflow: "hidden" }}>
	<div style={{ padding: 16 }}>{/* Your content */}</div>
</ScrollBar>
```

The first child of `ScrollBar` is the **scrollable container**. Give the outer wrapper a height (and optionally width) so the content can overflow; the library will show vertical and/or horizontal scrollbars as needed.

## Props

`ScrollBar` accepts standard JSX HTML attributes for the outer wrapper, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `horizontal` | `boolean \| HorizontalScrollBarProps` | `true` | Whether to show the horizontal scrollbar. Pass `false` to hide, or an object to pass props to the horizontal scrollbar. |
| `vertical` | `boolean \| VerticalScrollBarProps` | `true` | Whether to show the vertical scrollbar. Pass `false` to hide, or an object to pass props to the vertical scrollbar. |
| `scrollerProps` | `JSX.HTMLAttributes<HTMLDivElement>` | — | Props applied to the inner scrollable element (the first child). |

When `vertical` or `horizontal` is an object, it can include `trackProps` and `thumbProps` for the track and thumb elements.

## Type

```ts
interface ScrollBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
	horizontal?: boolean | HorizontalScrollBarProps;
	vertical?: boolean | VerticalScrollBarProps;
	scrollerProps?: JSX.HTMLAttributes<HTMLDivElement>;
}
```

## Examples

Vertical only:

```tsx
<ScrollBar horizontal={false} style={{ height: 400 }}>
	<div>{/* content */}</div>
</ScrollBar>
```

With custom track/thumb styling:

```tsx
<ScrollBar
	style={{ height: 300 }}
	vertical={{
		trackProps: { style: { width: 10, background: "#eee" } },
		thumbProps: { style: { background: "#666" } },
	}}
>
	<div>{/* content */}</div>
</ScrollBar>
```

See [VerticalScrollBar](/solid/components/vertical-scroll-bar) and [HorizontalScrollBar](/solid/components/horizontal-scroll-bar) for the building blocks used inside `ScrollBar`.
