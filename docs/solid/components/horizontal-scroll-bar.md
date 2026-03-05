---
title: HorizontalScrollBar
description: A horizontal scrollbar that syncs with a scrollable container you provide.
---

# `HorizontalScrollBar`

`HorizontalScrollBar` renders only the **horizontal** scrollbar. You pass the scrollable container (and optionally track/thumb props). Use it when you need a custom layout instead of the all-in-one `<ScrollBar>` component.

## Import

```ts
import { HorizontalScrollBar } from "@ez-kits/scrollbar-solid";
```

## Basic usage

You must pass a **container**: the element that scrolls (usually the result of a ref callback or signal).

```tsx
import { createSignal } from "solid-js";
import { HorizontalScrollBar } from "@ez-kits/scrollbar-solid";

function MyLayout() {
	const [container, setContainer] = createSignal<HTMLDivElement>();

	return (
		<div style={{ display: "flex", flexDirection: "column", width: 400 }}>
			<div
				ref={(el) => setContainer(el)}
				style={{ overflow: "auto", whiteSpace: "nowrap" }}
			>
				{/* Wide scrollable content */}
			</div>
			<HorizontalScrollBar container={container()} />
		</div>
	);
}
```

The component renders a track and thumb and keeps them in sync with the container's scroll position and size. It uses `createHorizontalScrollBar` under the hood.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `container` | `HTMLElement \| null \| undefined` | The scrollable element. Usually the current value of a signal or ref. |
| `trackProps` | `JSX.HTMLAttributes<HTMLDivElement>` | Optional. Props for the track element. |
| `thumbProps` | `JSX.HTMLAttributes<HTMLDivElement>` | Optional. Props for the thumb element. |

## Type

```ts
type HorizontalScrollBarProps = {
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
};

type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | null;
};
```

## When to use

- You want the scrollbar in a different place (e.g. above the content).
- You're building a custom scrollbar UI and need full control.

Otherwise, the [ScrollBar](/solid/components/scroll-bar) component is simpler. See [createHorizontalScrollBar](/solid/utilities/create-horizontal-scroll-bar) for a lower-level API.
