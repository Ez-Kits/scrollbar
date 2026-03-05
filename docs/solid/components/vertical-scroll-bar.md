---
title: VerticalScrollBar
description: A vertical scrollbar that syncs with a scrollable container you provide.
---

# `VerticalScrollBar`

`VerticalScrollBar` renders only the **vertical** scrollbar. You pass the scrollable container (and optionally track/thumb props). Use it when you need a custom layout instead of the all-in-one `<ScrollBar>` component.

## Import

```ts
import { VerticalScrollBar } from "@ez-kits/scrollbar-solid";
```

## Basic usage

You must pass a **container**: the element that scrolls (usually the result of a ref callback or signal).

```tsx
import { createSignal } from "solid-js";
import { VerticalScrollBar } from "@ez-kits/scrollbar-solid";

function MyLayout() {
	const [container, setContainer] = createSignal<HTMLDivElement>();

	return (
		<div style={{ display: "flex", height: 300 }}>
			<div
				ref={(el) => setContainer(el)}
				style={{ flex: 1, overflow: "auto" }}
			>
				{/* Scrollable content */}
			</div>
			<VerticalScrollBar container={container()} />
		</div>
	);
}
```

The component renders a track and thumb and keeps them in sync with the container's scroll position and size. It uses `createVerticalScrollBar` under the hood.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `container` | `HTMLElement \| null \| undefined` | The scrollable element. Usually the current value of a signal or ref. |
| `trackProps` | `JSX.HTMLAttributes<HTMLDivElement>` | Optional. Props for the track element (e.g. `class`, `style`). |
| `thumbProps` | `JSX.HTMLAttributes<HTMLDivElement>` | Optional. Props for the thumb element. |

## Type

```ts
type VerticalScrollBarProps = {
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
};

type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement | null;
};
```

## When to use

- You want the scrollbar in a different place (e.g. left side, or inside a custom panel).
- You're building a custom scrollbar UI and need full control over the wrapper layout.

Otherwise, the [ScrollBar](/solid/components/scroll-bar) component is simpler. See [createVerticalScrollBar](/solid/utilities/create-vertical-scroll-bar) for an even lower-level API.
