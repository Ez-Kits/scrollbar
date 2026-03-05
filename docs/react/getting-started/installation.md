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

The library will install `@ez-kits/scrollbar-core` as a dependency. You don't need to install it yourself.

## Step 2: Use the ScrollBar component

There’s no global setup. Import `ScrollBar` where you need a scrollable area:

```tsx
import { ScrollBar } from "@ez-kits/scrollbar-react";

function MyComponent() {
	return (
		<ScrollBar style={{ height: 300, overflow: "hidden" }}>
			<div style={{ padding: 16 }}>
				<p>Your long content here...</p>
			</div>
		</ScrollBar>
	);
}
```

Important: the **scrollable area** is the inner div. Give the outer wrapper a fixed height (and `overflow: hidden`) so that the content can scroll inside it. The `ScrollBar` component will show vertical and horizontal scrollbars when the content overflows.

## Next steps

- [Concepts](/react/getting-started/concepts) — track, thumb, container, and how they work together.
- [Basic usage](/react/usage/basic-usage) — a minimal example with vertical and horizontal scroll.
