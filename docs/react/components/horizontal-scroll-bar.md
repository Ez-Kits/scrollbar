---
title: HorizontalScrollBar
description: A horizontal scrollbar that syncs with a scrollable container you provide.
---

# `HorizontalScrollBar`

`HorizontalScrollBar` renders only the **horizontal** scrollbar. You pass the scrollable container (and optionally track/thumb props). Use it when you need a custom layout instead of the all-in-one `<ScrollBar>` component.

## Import

```ts
import { HorizontalScrollBar } from "@ez-kits/scrollbar-react";
```

## Basic usage

You must pass a **container**: the element that scrolls (usually a ref to a div with overflow).

```tsx
import { useRef } from "react";
import { HorizontalScrollBar } from "@ez-kits/scrollbar-react";

function MyLayout() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			<div
				ref={containerRef}
				style={{ overflow: "auto", whiteSpace: "nowrap" }}
			>
				{/* Wide scrollable content */}
			</div>
			<HorizontalScrollBar container={containerRef} />
		</div>
	);
}
```

The component renders a track and thumb and keeps them in sync with the container's scroll position and size.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `container` | `HTMLElement \| null \| RefObject<HTMLElement \| null \| undefined>` | The scrollable element. Usually a ref. |
| `trackProps` | `HTMLAttributes<HTMLDivElement>` | Optional. Props for the track element (e.g. `className`, `style`). |
| `thumbProps` | `HTMLAttributes<HTMLDivElement>` | Optional. Props for the thumb element. |

## Type

```ts
type HorizontalScrollBarProps = {
	trackProps?: HTMLAttributes<HTMLDivElement>;
	thumbProps?: HTMLAttributes<HTMLDivElement>;
};

type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | null | RefObject<HTMLElement | null | undefined>;
};
```

## When to use

- You want the scrollbar in a different place (e.g. above the content, or in a custom panel).
- You're building a custom scrollbar UI and need full control over the wrapper layout.

Otherwise, the [ScrollBar](/react/components/scroll-bar) component is simpler: it includes the container and both scrollbars.

See [useHorizontalScrollBar](/react/hooks/use-horizontal-scroll-bar) for an even lower-level API (your own DOM and refs).
