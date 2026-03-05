---
title: Custom Styling
description: Style the scrollbar track and thumb with CSS or component props.
---

# Custom Styling

You can style the scrollbar track and thumb so it matches your app. There are two main approaches.

## 1. Using trackProps and thumbProps

`ScrollBar`, `VerticalScrollBar`, and `HorizontalScrollBar` accept `trackProps` and `thumbProps` (and for `ScrollBar`, you pass them via `vertical={{ trackProps, thumbProps }}` or `horizontal={{ ... }}`). Use these to pass `className`, `style`, or any other div props to the track and thumb elements.

### Example with ScrollBar

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-react";

<ScrollBar
	style={{ height: 300, overflow: "hidden" }}
	vertical={{
		trackProps: {
			className: "my-vertical-track",
			style: { width: 10, background: "#eee", borderRadius: 5 },
		},
		thumbProps: {
			className: "my-vertical-thumb",
			style: { background: "#999", borderRadius: 5 },
		},
	}}
	horizontal={{
		trackProps: { className: "my-horizontal-track" },
		thumbProps: { className: "my-horizontal-thumb" },
	}}
>
	<div style={{ padding: 16 }}>{/* content */}</div>
</ScrollBar>
```

Then in your CSS:

```css
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
```

## 2. Using only CSS

If you use `ScrollBar` without custom props, the track and thumb are plain `div`s. You can target them with CSS if you give the wrapper a known class:

```tsx
<ScrollBar className="custom-scrollbar" style={{ height: 300 }}>
	<div>{/* content */}</div>
</ScrollBar>
```

```css
.custom-scrollbar [data-scrollbar-track] {
	background: #f0f0f0;
}

.custom-scrollbar [data-scrollbar-thumb] {
	background: #888;
	border-radius: 4px;
}
```

Note: the library may not add `data-scrollbar-track` / `data-scrollbar-thumb` by default; check the rendered DOM. The most reliable approach is to use `trackProps` and `thumbProps` with your own `className` or `style`.

## Sizing tips

- **Vertical scrollbar**: set a width on the track (e.g. `width: 10px`) and let the thumb height be controlled by the library.
- **Horizontal scrollbar**: set a height on the track (e.g. `height: 10px`) and let the thumb width be controlled by the library.

The library sets inline styles for the thumb size and position so it reflects the scroll; you control the rest (colors, borders, radius, etc.).

Next: [Using hooks](/react/usage/using-hooks) when you need full control over the DOM structure.
