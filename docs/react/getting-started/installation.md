---
title: Installation
description: Install Ez Scrollbar for React in your project.
---

# Installation

This page shows how to add **Ez Scrollbar** to your React project.

## Step 1: Install the package

From your project folder, run one of these (use the package manager you already use):

```bash
# npm
npm install @ez-kits/scrollbar-react

# yarn
yarn add @ez-kits/scrollbar-react

# pnpm
pnpm add @ez-kits/scrollbar-react
```

## Step 2: Use the ScrollBar component

There’s no global setup. Import `ScrollBar` where you need a scrollable area:

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-react";

function MyComponent() {
	return (
		<ScrollBar
			style={{
				height: 600,
				width: 600,
				paddingRight: 10,
				overflowY: "auto",
				position: "relative",
				scrollbarWidth: "none",
				whiteSpace: "nowrap",
			}}
			scrollerProps={{
				style: {
					overflow: "auto",
					scrollbarWidth: "none",
					height: "100%",
					width: "100%",
				},
			}}
			vertical={{
				thumbProps: {
					className: "bg-gray-500 absolute top-0 w-2 min-h-4",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				},
				trackProps: {
					className: "bg-black absolute right-0 top-0 bottom-0 w-2",
				},
			}}
			horizontal={{
				thumbProps: {
					className: "bg-gray-500 absolute left-0 right-0 bottom-0 h-2",
					style: {
						transform: "translateX(var(--thumb-offset))",
						width: "var(--thumb-size)",
					},
				},
				trackProps: {
					className: "bg-black absolute left-0 right-0 bottom-0 h-2",
				},
			}}
		>
			{Array(50)
				.fill(null)
				.map((_, index) => (
					<p key={index}>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						tempore doloribus numquam? Maiores nostrum quisquam officia modi
						quis, dolore dignissimos provident consequatur explicabo dicta
						pariatur assumenda ullam dolor vero repudiandae!
					</p>
				))}
		</ScrollBar>
	);
}
```

Important: the **scrollable area** is the inner div. Give the outer wrapper a fixed height (and `overflow: hidden`) so that the content can scroll inside it. The `ScrollBar` component will show vertical and horizontal scrollbars when the content overflows.

## Next steps

- [Concepts](/react/getting-started/concepts) — track, thumb, container, and how they work together.
- [Basic usage](/react/usage/basic-usage) — a minimal example with vertical and horizontal scroll.
