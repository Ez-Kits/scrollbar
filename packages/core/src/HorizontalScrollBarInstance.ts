import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	protected isHoveringTrack(event: MouseEvent): boolean {
		const track = this.getTrackElement();
		if (!track) {
			return false;
		}

		if (track.contains(event.target as Node) || track === event.target) {
			return true;
		}

		const trackRect = track.getBoundingClientRect();
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		return (
			mouseX >= trackRect.left &&
			mouseX <= trackRect.right &&
			mouseY >= trackRect.top &&
			mouseY <= trackRect.bottom
		);
	}

	protected calculateThumbSizeAndOffset(): {
		thumbSize: number;
		thumbOffset: number;
	} {
		const container = this.getContainerElement();
		const track = this.getTrackElement();

		if (!container || !track) {
			return { thumbSize: 0, thumbOffset: 0 };
		}

		const containerStyle = window.getComputedStyle(container);
		const shouldCalculate = containerStyle.overflowX !== "hidden";

		if (!shouldCalculate) {
			return { thumbSize: 0, thumbOffset: 0 };
		}

		const trackRect = track.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		const thumbSize =
			(containerRect.width / container.scrollWidth) * trackRect.width;
		const thumbOffset =
			(container.scrollLeft / container.scrollWidth) * trackRect.width;

		return { thumbSize, thumbOffset };
	}

	protected updateContainerScrollOffsetOnTrackPress(event: MouseEvent): void {
		const track = this.getTrackElement();
		const thumb = this.getThumbElement();
		const container = this.getContainerElement();
		if (!track || !thumb || !container) {
			return;
		}

		const trackRect = track.getBoundingClientRect();
		const thumbRect = thumb.getBoundingClientRect();

		const offset = event.clientX - trackRect.left - thumbRect.width / 2;
		const offsetPercent = offset / trackRect.width;
		const scrollLeft = offsetPercent * container.scrollWidth;

		container.scrollLeft = scrollLeft;
	}

	protected updateContainerScrollOffsetOnThumbDragging(
		activatorEvent: MouseEvent,
		event: MouseEvent
	): void {
		const container = this.getContainerElement();
		const thumb = this.getThumbElement();
		const track = this.getTrackElement();
		if (!container || !thumb || !track) {
			return;
		}

		const currentThumbOffset = this.store.thumbOffset;
		const delta = event.clientX - activatorEvent.clientX;
		const newThumbOffset = currentThumbOffset + delta;

		container.scrollLeft = newThumbOffset;
	}
	// protected updateStore() {
	// 	const { container, startOffset = 0, endOffset = 0 } = this.options;
	// 	if (!container) {
	// 		return;
	// 	}

	// 	this.setStore((state) => {
	// 		const containerSize = container.offsetWidth - startOffset - endOffset;
	// 		const sizePercent = containerSize / container.offsetWidth;

	// 		const containerStyle = window.getComputedStyle(container);
	// 		const shouldCalculate = containerStyle.overflowX !== "hidden";

	// 		const newStoreState = {
	// 			...state,
	// 			size: shouldCalculate
	// 				? (container.offsetWidth / container.scrollWidth) *
	// 				  container.offsetWidth *
	// 				  sizePercent
	// 				: containerSize,
	// 			offset: (container.scrollLeft / container.scrollWidth) * containerSize,
	// 			containerSize,
	// 		};
	// 		newStoreState.visible = this.shouldShowScrollBar(newStoreState);

	// 		return newStoreState;
	// 	});
	// }

	// protected updateScrollBarStyle(): void {
	// 	const { thumb, track, container, startOffset = 0 } = this.options;
	// 	const { size, offset, containerSize, visible } = this.store;

	// 	if (!thumb) {
	// 		return;
	// 	}

	// 	const containerRect = container.getBoundingClientRect();
	// 	const borderBottom = Number(
	// 		getComputedStyle(container)
	// 			.getPropertyValue("border-bottom-width")
	// 			.replace("px", "")
	// 	);
	// 	const scrollBarHeight = track ? track.offsetHeight : thumb.offsetHeight;
	// 	const computedTop =
	// 		containerRect.top + containerRect.height - scrollBarHeight - borderBottom;
	// 	const computedLeft = containerRect.left + startOffset;

	// 	if (track) {
	// 		track.style.left = `${computedLeft}px`;
	// 		track.style.top = `${computedTop}px`;
	// 		track.style.width = `${containerSize}px`;
	// 		track.style.opacity = visible ? "1" : "0";
	// 		track.style.visibility = visible ? "visible" : "hidden";
	// 	} else {
	// 		thumb.style.left = `${computedLeft}px`;
	// 		thumb.style.top = `${computedTop}px`;
	// 		thumb.style.opacity = visible ? "1" : "0";
	// 		thumb.style.visibility = visible ? "visible" : "hidden";
	// 	}

	// 	const thumbMinWidth = Number(
	// 		getComputedStyle(thumb).getPropertyValue("min-width").replace("px", "")
	// 	);

	// 	const computedSize = size > thumbMinWidth ? size : thumbMinWidth;
	// 	let computedOffset =
	// 		offset > 0
	// 			? offset - (size > thumbMinWidth ? 0 : thumbMinWidth - size)
	// 			: 0;

	// 	if (computedOffset < 0) {
	// 		computedOffset = 0;
	// 	}

	// 	if (computedOffset > containerSize - computedSize) {
	// 		computedOffset = containerSize - computedSize;
	// 	}

	// 	thumb.style.width = `${computedSize}px`;
	// 	thumb.style.transform = `translateX(${computedOffset}px)`;
	// }

	// protected shouldShowScrollBar(store: ScrollBarStore): boolean {
	// 	const { containerSize, size, offset } = store;

	// 	const shouldShow = size < containerSize;
	// 	if (!this.options.autoHide) {
	// 		return shouldShow;
	// 	}

	// 	if (
	// 		this.isDraggingScrollBar ||
	// 		this.isHoveringScrollBar ||
	// 		this.isScrolling
	// 	) {
	// 		return shouldShow;
	// 	}

	// 	if (offset === this.oldOffset) {
	// 		return this.isMouseInScrollBar() && shouldShow;
	// 	}

	// 	return shouldShow;
	// }

	// // --------------------------------------
	// // DRAG SCROLLBAR TO SCROLL CONTAINER
	// // --------------------------------------
	// private isMouseInScrollBar() {
	// 	const { track, container, startOffset = 0 } = this.options;

	// 	if (!track || !container) {
	// 		return false;
	// 	}

	// 	const show =
	// 		this.mouseCoordinate.x >= startOffset &&
	// 		this.mouseCoordinate.x <= this.store.containerSize + startOffset &&
	// 		container.clientHeight - this.mouseCoordinate.y <= track.clientHeight;

	// 	return show;
	// }

	// protected updateContainerScrollOffset(delta: Coordinate): void {
	// 	const { container, startOffset = 0 } = this.options;
	// 	if (!container) {
	// 		return;
	// 	}

	// 	const { containerSize } = this.store;

	// 	const newOffset =
	// 		this.startDragInfo.scrollOffset.x +
	// 		this.startDragInfo.offset +
	// 		delta.x -
	// 		this.startDragInfo.scrollOffset.x -
	// 		startOffset;

	// 	container.scrollLeft = (newOffset / containerSize) * container.scrollWidth;
	// }
}
