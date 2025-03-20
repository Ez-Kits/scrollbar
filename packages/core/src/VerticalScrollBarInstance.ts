import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";

export class VerticalScrollBarInstance extends BaseScrollBarInstance {
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
		const shouldCalculate = containerStyle.overflowY !== "hidden";

		if (!shouldCalculate) {
			return { thumbSize: 0, thumbOffset: 0 };
		}

		const trackRect = track.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		console.log(
			"calculateThumbSizeAndOffset",
			container.scrollTop,
			container.scrollHeight,
			trackRect.height
		);

		const thumbSize =
			(containerRect.height / container.scrollHeight) * trackRect.height;
		const thumbOffset =
			(container.scrollTop / container.scrollHeight) * trackRect.height;

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

		const offset = event.clientY - trackRect.top - thumbRect.height / 2;
		const offsetPercent = offset / trackRect.height;
		const scrollTop = offsetPercent * container.scrollHeight;

		container.scrollTop = scrollTop;
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
		const delta = event.clientY - activatorEvent.clientY;
		const newThumbOffset = currentThumbOffset + delta;

		container.scrollTop = newThumbOffset;
	}

	// protected updateStore() {
	// 	const { container, startOffset = 0, endOffset = 0 } = this.options;
	// 	if (!container) {
	// 		return;
	// 	}

	// 	this.setStore((state) => {
	// 		const containerSize = container.offsetHeight - startOffset - endOffset;
	// 		const sizePercent = containerSize / container.offsetHeight;

	// 		const containerStyle = window.getComputedStyle(container);
	// 		const shouldCalculate = containerStyle.overflowY !== "hidden";

	// 		const newStoreState = {
	// 			...state,
	// 			size: shouldCalculate
	// 				? (container.offsetHeight / container.scrollHeight) *
	// 				  container.offsetHeight *
	// 				  sizePercent
	// 				: containerSize,
	// 			offset: (container.scrollTop / container.scrollHeight) * containerSize,
	// 			containerSize,
	// 		};
	// 		newStoreState.visible = this.shouldShowScrollBar(newStoreState);

	// 		return newStoreState;
	// 	});
	// }

	// protected updateScrollBarStyle(): void {
	// 	const { thumb, container, startOffset = 0, track } = this.options;
	// 	const { size, offset, visible, containerSize } = this.store;

	// 	if (!thumb) {
	// 		return;
	// 	}

	// 	const containerRect = container.getBoundingClientRect();
	// 	const borderRight = Number(
	// 		getComputedStyle(container)
	// 			.getPropertyValue("border-right-width")
	// 			.replace("px", "")
	// 	);
	// 	const scrollBarWidth = track ? track.offsetWidth : thumb.offsetWidth;
	// 	const computedTop = containerRect.top + startOffset;
	// 	const computedLeft =
	// 		containerRect.left + containerRect.width - scrollBarWidth - borderRight;

	// 	if (track) {
	// 		track.style.top = `${computedTop}px`;
	// 		track.style.left = `${computedLeft}px`;
	// 		track.style.width = `${scrollBarWidth}px`;
	// 		track.style.height = `${containerSize}px`;
	// 		track.style.opacity = visible ? "1" : "0";
	// 		track.style.visibility = visible ? "visible" : "hidden";
	// 	} else {
	// 		thumb.style.top = `${computedTop}px`;
	// 		thumb.style.left = `${computedLeft}px`;
	// 		thumb.style.opacity = visible ? "1" : "0";
	// 		thumb.style.visibility = visible ? "visible" : "hidden";
	// 	}

	// 	const thumbMinHeight = Number(
	// 		getComputedStyle(thumb).getPropertyValue("min-height").replace("px", "")
	// 	);
	// 	const computedSize = size > thumbMinHeight ? size : thumbMinHeight;
	// 	let computedOffset =
	// 		offset > 0
	// 			? offset - (size > thumbMinHeight ? 0 : thumbMinHeight - size)
	// 			: 0;

	// 	if (computedOffset < 0) {
	// 		computedOffset = 0;
	// 	}

	// 	if (computedOffset > containerSize - computedSize) {
	// 		computedOffset = containerSize - computedSize;
	// 	}

	// 	thumb.style.height = `${computedSize}px`;
	// 	thumb.style.transform = `translateY(${
	// 		computedOffset < 0 ? 0 : computedOffset
	// 	}px)`;
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
	// 	const { thumb, container, startOffset = 0 } = this.options;

	// 	if (!thumb || !container) {
	// 		return false;
	// 	}

	// 	const show =
	// 		this.mouseCoordinate.y >= startOffset &&
	// 		this.mouseCoordinate.y <= this.store.containerSize + startOffset &&
	// 		container.clientWidth - this.mouseCoordinate.x <= thumb.clientWidth * 1.5;

	// 	return show;
	// }

	// protected updateContainerScrollOffset(delta: Coordinate): void {
	// 	const { container, startOffset = 0 } = this.options;
	// 	if (!container) {
	// 		return;
	// 	}

	// 	const { containerSize } = this.store;

	// 	const newOffset =
	// 		this.startDragInfo.scrollOffset.y +
	// 		this.startDragInfo.offset +
	// 		delta.y -
	// 		this.startDragInfo.scrollOffset.y -
	// 		startOffset;

	// 	container.scrollTop = (newOffset / containerSize) * container.scrollHeight;
	// }
}
