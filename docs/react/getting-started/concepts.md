---
title: Concepts
description: Understand how Ez Scrollbar works — container, track, thumb, and scroll state.
---

# Concepts

A few terms will help you use and style the scrollbar correctly.

## Container

The **container** is the element that actually scrolls. It’s the inner part of `<ScrollBar>` where your content lives. When the content is taller or wider than the visible area, the container scrolls and the scrollbar reflects that.

- In the default setup, the container is the first inner `div` inside `<ScrollBar>`.
- The library measures this element to know how much content there is and how much is visible, then it updates the scrollbar thumb size and position.

## Track

The **track** is the long bar (channel) behind the thumb. It represents the full scrollable range:

- **Vertical scrollbar**: the track is the full height of the scrollbar area.
- **Horizontal scrollbar**: the track is the full width.

Users can click on the track to jump the scroll position (e.g. click above the thumb to scroll up). You can style the track with CSS or by passing `trackProps` to the components.

## Thumb

The **thumb** is the draggable part of the scrollbar. Its size shows how much content is visible relative to the total:

- More content → smaller thumb.
- Less content (or almost all visible) → larger thumb.

Users can drag the thumb to scroll. You can style it with CSS or by passing `thumbProps` to the components.

## ScrollBar component

`ScrollBar` is the all-in-one component:

1. It renders a wrapper with your content inside (the container).
2. It renders a vertical scrollbar and/or a horizontal scrollbar.
3. It connects the container’s scroll position to the scrollbars so they stay in sync.

You can turn vertical or horizontal off: set `vertical={false}` or `horizontal={false}`.

## VerticalScrollBar and HorizontalScrollBar

If you need a custom layout, you can use `VerticalScrollBar` and `HorizontalScrollBar` directly. You pass a **container** (the scrollable element) and your own track/thumb elements. These components are what `ScrollBar` uses under the hood.

## Hooks (useVerticalScrollBar / useHorizontalScrollBar)

For full control (e.g. your own DOM structure or animations), you can use the hooks. They take options like “which element is the container,” “which is the track,” “which is the thumb,” and return an instance that keeps everything in sync. The components use these hooks internally.

## Scroll state

The library can attach **scroll state** to the container (or other elements you specify). That state includes things like:

- Is the user hovering the track or thumb?
- Is the thumb being dragged?
- Is the content scrollable?

You can use this for styling (e.g. highlight the thumb when hovered) or for custom behavior. It’s optional and is controlled by the `shouldAttachScrollBarStateToContainer` option when using the hooks or lower-level APIs.

---

With these concepts, you can follow the [usage guides](/react/usage/basic-usage) and the [API docs](/react/components/scroll-bar) with confidence.
