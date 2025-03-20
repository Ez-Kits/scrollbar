import { BaseScrollBarInstance } from "src/BaseScrollBarInstance.old";
import { Coordinate, ScrollBarStore } from "src/types";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	protected updateStore() {
		const { container, startOffset = 0, endOffset = 0 } = this.options;
		if (!container) {
			return;
		}

		this.setStore((state) => {
			const containerSize = container.offsetWidth - startOffset - endOffset;
			const sizePercent = containerSize / container.offsetWidth;

			const containerStyle = window.getComputedStyle(container);
			const shouldCalculate = containerStyle.overflowX !== "hidden";

			const newStoreState = {
				...state,
				size: shouldCalculate
					? (container.offsetWidth / container.scrollWidth) *
					  container.offsetWidth *
					  sizePercent
					: containerSize,
				offset: (container.scrollLeft / container.scrollWidth) * containerSize,
				containerSize,
			};
			newStoreState.visible = this.shouldShowScrollBar(newStoreState);

			return newStoreState;
		});
	}

	protected updateScrollBarStyle(): void {
		const { thumb, track, container, startOffset = 0 } = this.options;
		const { size, offset, containerSize, visible } = this.store;

		if (!thumb) {
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const borderBottom = Number(
			getComputedStyle(container)
				.getPropertyValue("border-bottom-width")
				.replace("px", "")
		);
		const scrollBarHeight = track ? track.offsetHeight : thumb.offsetHeight;
		const computedTop =
			containerRect.top + containerRect.height - scrollBarHeight - borderBottom;
		const computedLeft = containerRect.left + startOffset;

		if (track) {
			track.style.left = `${computedLeft}px`;
			track.style.top = `${computedTop}px`;
			track.style.width = `${containerSize}px`;
			track.style.opacity = visible ? "1" : "0";
			track.style.visibility = visible ? "visible" : "hidden";
		} else {
			thumb.style.left = `${computedLeft}px`;
			thumb.style.top = `${computedTop}px`;
			thumb.style.opacity = visible ? "1" : "0";
			thumb.style.visibility = visible ? "visible" : "hidden";
		}

		const thumbMinWidth = Number(
			getComputedStyle(thumb).getPropertyValue("min-width").replace("px", "")
		);

		const computedSize = size > thumbMinWidth ? size : thumbMinWidth;
		let computedOffset =
			offset > 0
				? offset - (size > thumbMinWidth ? 0 : thumbMinWidth - size)
				: 0;

		if (computedOffset < 0) {
			computedOffset = 0;
		}

		if (computedOffset > containerSize - computedSize) {
			computedOffset = containerSize - computedSize;
		}

		thumb.style.width = `${computedSize}px`;
		thumb.style.transform = `translateX(${computedOffset}px)`;
	}

	protected shouldShowScrollBar(store: ScrollBarStore): boolean {
		const { containerSize, size, offset } = store;

		const shouldShow = size < containerSize;
		if (!this.options.autoHide) {
			return shouldShow;
		}

		if (
			this.isDraggingScrollBar ||
			this.isHoveringScrollBar ||
			this.isScrolling
		) {
			return shouldShow;
		}

		if (offset === this.oldOffset) {
			return this.isMouseInScrollBar() && shouldShow;
		}

		return shouldShow;
	}

	// --------------------------------------
	// DRAG SCROLLBAR TO SCROLL CONTAINER
	// --------------------------------------
	private isMouseInScrollBar() {
		const { track, container, startOffset = 0 } = this.options;

		if (!track || !container) {
			return false;
		}

		const show =
			this.mouseCoordinate.x >= startOffset &&
			this.mouseCoordinate.x <= this.store.containerSize + startOffset &&
			container.clientHeight - this.mouseCoordinate.y <= track.clientHeight;

		return show;
	}

	protected updateContainerScrollOffset(delta: Coordinate): void {
		const { container, startOffset = 0 } = this.options;
		if (!container) {
			return;
		}

		const { containerSize } = this.store;

		const newOffset =
			this.startDragInfo.scrollOffset.x +
			this.startDragInfo.offset +
			delta.x -
			this.startDragInfo.scrollOffset.x -
			startOffset;

		container.scrollLeft = (newOffset / containerSize) * container.scrollWidth;
	}
}
