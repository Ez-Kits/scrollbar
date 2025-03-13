import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";
import { Coordinate, ScrollBarStore } from "src/types";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	private oldOffset: number = 0;

	protected initialScrollBarElement(): void {
		const { scrollBar, autoHide } = this.options;
		if (!scrollBar) {
			return;
		}

		scrollBar.style.position = "fixed";
		scrollBar.style.left = "0px";
		scrollBar.style.bottom = "0px";

		if (autoHide) {
			scrollBar.style.opacity = "0";
			scrollBar.style.visibility = "hidden";
		}
	}

	protected updateStore() {
		const { container, startOffset = 0, endOffset = 0 } = this.options;
		if (!container) {
			return;
		}

		this.oldOffset = this.store.offset;

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
				offset:
					(container.scrollLeft / container.scrollWidth) * containerSize +
					startOffset,
				containerSize,
			};
			newStoreState.visible = this.shouldShowScrollBar(newStoreState);

			return newStoreState;
		});
	}

	protected updateScrollBarStyle(): void {
		const { scrollBar, container } = this.options;
		const { size, offset, visible } = this.store;

		if (!scrollBar) {
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const borderBottom = Number(
			getComputedStyle(container)
				.getPropertyValue("border-bottom-width")
				.replace("px", "")
		);
		const scrollBarMinWidth = Number(
			getComputedStyle(scrollBar)
				.getPropertyValue("min-width")
				.replace("px", "")
		);

		const computedOffset =
			offset > 0
				? offset - (size > scrollBarMinWidth ? 0 : scrollBarMinWidth - size)
				: 0;

		scrollBar.style.left = `${containerRect.left}px`;
		scrollBar.style.top = `${
			containerRect.top +
			containerRect.height -
			scrollBar.offsetHeight -
			borderBottom
		}px`;
		scrollBar.style.opacity = visible ? "1" : "0";
		scrollBar.style.visibility = visible ? "visible" : "hidden";
		scrollBar.style.width = `${size}px`;
		scrollBar.style.transform = `translateX(${
			computedOffset < 0 ? 0 : computedOffset
		}px)`;
	}

	protected onHide(): void {
		const { scrollBar } = this.options;

		if (!scrollBar) {
			return;
		}

		requestAnimationFrame(() => {
			scrollBar.style.opacity = "0";
			scrollBar.style.visibility = "hidden";
		});
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
		const { scrollBar, container, startOffset = 0 } = this.options;

		if (!scrollBar || !container) {
			return false;
		}

		const show =
			this.mouseCoordinate.x >= startOffset &&
			this.mouseCoordinate.x <= this.store.containerSize + startOffset &&
			container.clientHeight - this.mouseCoordinate.y <=
				scrollBar.clientHeight * 1.5;

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
