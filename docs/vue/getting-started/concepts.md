---
title: Concepts
description: Understand how Ez Scrollbar works — container, track, thumb, and scroll state.
---

# Concepts

A few terms will help you use and style the scrollbar correctly.

## Container

The **container** is the element that actually scrolls. It's the inner part of `<ScrollBar>` where your content lives. When the content is taller or wider than the visible area, the container scrolls and the scrollbar reflects that.

- In the default setup, the container is the first inner element inside `<ScrollBar>`.
- The library measures this element to know how much content there is and how much is visible, then it updates the scrollbar thumb size and position.

## Track

The **track** is the long bar (channel) behind the thumb. It represents the full scrollable range:

- **Vertical scrollbar**: the track is the full height of the scrollbar area.
- **Horizontal scrollbar**: the track is the full width.

Users can click on the track to jump the scroll position. You can style the track with CSS or by passing props to the components.

## Thumb

The **thumb** is the draggable part of the scrollbar. Its size shows how much content is visible relative to the total. Users can drag the thumb to scroll. You can style it with CSS or by passing props to the components.

## ScrollBar component

`ScrollBar` is the all-in-one component: it renders a wrapper with your content inside (the container) and vertical and/or horizontal scrollbars, and keeps them in sync. You can turn vertical or horizontal off with the `vertical` and `horizontal` props.

## VerticalScrollBar and HorizontalScrollBar

If you need a custom layout, you can use `VerticalScrollBar` and `HorizontalScrollBar` directly. You pass a **container** (the scrollable element). These components are what `ScrollBar` uses under the hood.

## Composables (useVerticalScrollBar / useHorizontalScrollBar)

For full control (e.g. your own DOM structure), you can use the composables. They take options like "which element is the container," "which is the track," "which is the thumb," and return an instance that keeps everything in sync. The components use these composables internally.

## Scroll state

The library can attach **scroll state** to the container (or other elements you specify). That state includes things like whether the user is hovering the track or thumb, or dragging the thumb. You can use this for styling or custom behavior. It's optional and controlled by the `shouldAttachScrollBarStateToContainer` option when using the composables or lower-level APIs.

---

With these concepts, you can follow the [usage guides](/vue/usage/basic-usage) and the [API docs](/vue/components/scroll-bar) with confidence.
