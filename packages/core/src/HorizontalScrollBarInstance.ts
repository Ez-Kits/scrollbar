import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";
import { Coordinate, ScrollBarStore } from "src/types";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	private oldOffset: number = 0;

	protected onMount(): void {
		const { scrollBar } = this.options;
		if (!scrollBar) {
			return;
		}

		scrollBar.style.position = "absolute";
		scrollBar.style.left = "0px";
		scrollBar.style.bottom = "0px";
	}

	protected updateStore() {
		const { container, startOffset = 0, endOffset = 0 } = this.options;
		if (!container) {
			return;
		}

		this.oldOffset = this.store.offset;

		this.setStore((state) => {
			const containerSize = container.clientWidth - startOffset - endOffset;
			const sizePercent = containerSize / container.clientWidth;
			const newStoreState = {
				...state,
				size:
					(container.clientWidth / container.scrollWidth) *
					container.clientWidth *
					sizePercent,
				offset:
					(container.scrollLeft / container.scrollWidth) * containerSize +
					container.scrollLeft +
					startOffset,
				containerSize,
				crossOffset: container.scrollTop,
			};
			newStoreState.visible = this.shouldShowScrollBar(newStoreState);

			return newStoreState;
		});
	}

	protected updateScrollBarStyle(): void {
		const { scrollBar } = this.options;
		const { size, offset, crossOffset, visible } = this.store;

		if (!scrollBar) {
			return;
		}

		scrollBar.style.opacity = visible ? "1" : "0";
		scrollBar.style.visibility = visible ? "visible" : "hidden";
		scrollBar.style.width = `${size}px`;
		scrollBar.style.transform = `translate3d(${offset}px, ${crossOffset}px, 0)`;
	}

	protected onAutoHide(): void {
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

		if (this.isDraggingScrollBar || this.isHoveringScrollBar) {
			return true;
		}

		if (offset === this.oldOffset) {
			return this.isMouseInScrollBar();
		}

		return size < containerSize;
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

	protected updateContainerScrollTop(delta: Coordinate): void {
		const { container, startOffset = 0 } = this.options;
		if (!container) {
			return;
		}

		const { containerSize } = this.store;

		const newOffset =
			this.startDragInfo.offset +
			delta.x -
			this.startDragInfo.scrollOffset.x -
			startOffset;

		container.scrollLeft = (newOffset / containerSize) * container.scrollWidth;
	}
}
