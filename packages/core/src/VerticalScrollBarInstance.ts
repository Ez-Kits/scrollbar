import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";
import { Coordinate, ScrollBarStore } from "src/types";

export class VerticalScrollBarInstance extends BaseScrollBarInstance {
	private oldOffset: number = 0;

	protected onMount(): void {
		const { scrollBar } = this.options;
		if (!scrollBar) {
			return;
		}

		scrollBar.style.position = "absolute";
		scrollBar.style.top = "0px";
		scrollBar.style.right = "0px";
	}

	protected updateStore() {
		const { container, startOffset = 0, endOffset = 0 } = this.options;

		this.oldOffset = this.store.offset;

		this.setStore((state) => {
			const containerSize = container.clientHeight - startOffset - endOffset;
			const sizePercent = containerSize / container.clientHeight;
			const newStoreState = {
				...state,
				size:
					(container.clientHeight / container.scrollHeight) *
					container.clientHeight *
					sizePercent,
				offset:
					(container.scrollTop / container.scrollHeight) * containerSize +
					container.scrollTop +
					startOffset,
				crossOffset: container.scrollLeft,
				containerSize,
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
		scrollBar.style.height = `${size}px`;
		scrollBar.style.transform = `translate3d(${crossOffset}px, ${offset}px, 0)`;
	}

	protected onAutoHide(): void {
		const { scrollBar } = this.options;

		if (!scrollBar) {
			return;
		}

		scrollBar.style.opacity = "0";
		scrollBar.style.visibility = "hidden";
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
			this.mouseCoordinate.y >= startOffset &&
			this.mouseCoordinate.y <= this.store.containerSize + startOffset &&
			container.clientWidth - this.mouseCoordinate.x <=
				scrollBar.clientWidth * 1.5;

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
			delta.y -
			this.startDragInfo.scrollOffset.y -
			startOffset;

		container.scrollTop = (newOffset / containerSize) * container.scrollHeight;
	}
}
