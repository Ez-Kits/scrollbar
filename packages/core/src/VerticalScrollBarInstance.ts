import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";
import { Coordinate, ScrollBarStore } from "src/types";

export class VerticalScrollBarInstance extends BaseScrollBarInstance {
	private oldOffset: number = 0;

	protected onMount(): void {
		const { scrollBar } = this.options;
		if (!scrollBar) {
			return;
		}

		scrollBar.style.position = "fixed";
		scrollBar.style.top = "0px";
		scrollBar.style.right = "0px";
		scrollBar.style.opacity = "0";
		scrollBar.style.visibility = "hidden";
	}

	protected updateStore() {
		const { container, startOffset = 0, endOffset = 0 } = this.options;

		this.oldOffset = this.store.offset;

		this.setStore((state) => {
			const containerSize = container.offsetHeight - startOffset - endOffset;
			const sizePercent = containerSize / container.offsetHeight;

			const containerStyle = window.getComputedStyle(container);
			const shouldCalculate = containerStyle.overflowY !== "hidden";

			const newStoreState = {
				...state,
				size: shouldCalculate
					? (container.offsetHeight / container.scrollHeight) *
					  container.offsetHeight *
					  sizePercent
					: containerSize,
				offset:
					(container.scrollTop / container.scrollHeight) * containerSize +
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
		const borderRight = Number(
			getComputedStyle(container)
				.getPropertyValue("border-right-width")
				.replace("px", "")
		);

		scrollBar.style.top = `${containerRect.top}px`;
		scrollBar.style.left = `${
			containerRect.left +
			containerRect.width -
			scrollBar.offsetWidth -
			borderRight
		}px`;
		scrollBar.style.opacity = visible ? "1" : "0";
		scrollBar.style.visibility = visible ? "visible" : "hidden";
		scrollBar.style.height = `${size}px`;
		scrollBar.style.transform = `translateY(${offset}px)`;
	}

	protected onHide(): void {
		const { scrollBar } = this.options;

		if (!scrollBar) {
			return;
		}

		scrollBar.style.opacity = "0";
		scrollBar.style.visibility = "hidden";
	}

	protected shouldShowScrollBar(store: ScrollBarStore): boolean {
		const { containerSize, size, offset } = store;

		const shouldShow = size < containerSize;
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
			this.mouseCoordinate.y >= startOffset &&
			this.mouseCoordinate.y <= this.store.containerSize + startOffset &&
			container.clientWidth - this.mouseCoordinate.x <=
				scrollBar.clientWidth * 1.5;

		return show;
	}

	protected updateContainerScrollOffset(delta: Coordinate): void {
		const { container, startOffset = 0 } = this.options;
		if (!container) {
			return;
		}

		const { containerSize } = this.store;

		const newOffset =
			this.startDragInfo.scrollOffset.y +
			this.startDragInfo.offset +
			delta.y -
			this.startDragInfo.scrollOffset.y -
			startOffset;

		container.scrollTop = (newOffset / containerSize) * container.scrollHeight;
	}
}
