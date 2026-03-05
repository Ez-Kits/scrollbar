---
title: Custom Styling
description: Style the scrollbar track and thumb with CSS or component props.
---

# Custom Styling

You can style the scrollbar track and thumb so it matches your app. Use `trackProps` and `thumbProps` passed via the `vertical` or `horizontal` props (when they are objects).

## Using trackProps and thumbProps

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-solid";

<ScrollBar
	style={{ height: 300, overflow: "hidden" }}
	vertical={{
		trackProps: {
			class: "my-vertical-track",
			style: { width: 10, background: "#eee", borderRadius: 5 },
		},
		thumbProps: {
			class: "my-vertical-thumb",
			style: { background: "#999", borderRadius: 5 },
		},
	}}
	horizontal={{
		trackProps: { class: "my-horizontal-track" },
		thumbProps: { class: "my-horizontal-thumb" },
	}}
>
	<div style={{ padding: 16 }}>{/* content */}</div>
</ScrollBar>
```

Then in your CSS (or CSS-in-JS):

- **Vertical scrollbar**: set a width on the track; the library controls the thumb height.
- **Horizontal scrollbar**: set a height on the track; the library controls the thumb width.

Next: [Using utilities](/solid/usage/using-utilities) when you need full control over the DOM structure.
