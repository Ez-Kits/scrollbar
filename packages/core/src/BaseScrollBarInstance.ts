import {
	Coordinate,
	DraggingInfo,
	ScrollBarOptions,
	ScrollBarStore,
} from "src/types";

export abstract class BaseScrollBarInstance {
	protected options: ScrollBarOptions;
	protected resizeObserver?: ResizeObserver;
	private autoHideTimeout?: NodeJS.Timeout;
	store: ScrollBarStore;

	protected mouseCoordinate: Coordinate = { x: 0, y: 0 };
	protected isMouseEntered: boolean = false;
	protected isHoveringScrollBar: boolean = false;
	protected isDraggingScrollBar: boolean = false;
	protected isScrolling: boolean = false;
	protected startDragInfo: DraggingInfo = {
		mouseCoordinate: { x: 0, y: 0 },
		scrollOffset: {
			x: 0,
			y: 0,
		},
		offset: 0,
	};
	protected currentDragInfo: DraggingInfo = {
		mouseCoordinate: { x: 0, y: 0 },
		scrollOffset: {
			x: 0,
			y: 0,
		},
		offset: 0,
	};

	constructor(options: Partial<ScrollBarOptions>) {
		this.options = {
			autoHide: true,
			startOffset: 0,
			endOffset: 0,
			container: document.body,
			...options,
		};
		this.store = {
			size: 0,
			offset: 0,
			containerSize: 0,
			visible: false,
		};
	}

	protected setStore(updater: (store: ScrollBarStore) => ScrollBarStore) {
		this.store = updater(this.store);
		this.onStoreChange();
	}

	private onStoreChange() {
		clearTimeout(this.autoHideTimeout);
		const { scrollBar } = this.options;
		const { size, offset, visible } = this.store;

		if (!scrollBar) {
			return;
		}

		scrollBar.setAttribute("data-visible", visible ? "true" : "false");
		scrollBar.setAttribute("data-size", `${size}px`);
		scrollBar.setAttribute("data-offset", `${offset}px`);
		scrollBar.style.setProperty(
			"--scrollbar-visibility",
			visible ? "visible" : "hidden"
		);
		scrollBar.style.setProperty("--scrollbar-size", `${size}px`);
		scrollBar.style.setProperty("--scrollbar-offset", `${offset}px`);

		this.updateScrollBarStyle();
		this.autoHideTimeout = setTimeout(() => {
			if (this.isHoveringScrollBar || this.isDraggingScrollBar) {
				return;
			}

			if (scrollBar) {
				scrollBar.setAttribute("data-visible", "false");
				scrollBar.style.setProperty("--scrollbar-visibility", "hidden");
			}

			this.isScrolling = false;
			this.onAutoHide();
		}, 500);
	}

	updateOptions(options: Partial<ScrollBarOptions>) {
		this.options = {
			...this.options,
			...options,
			autoHide: options.autoHide ?? this.options.autoHide ?? true,
		};
		this.unmount();
		this.mount();
	}

	mount() {
		this.addListeners();
		this.options.container &&
			this.resizeObserver?.observe(this.options.container);

		this.onMount();

		return () => {
			this.unmount();
		};
	}

	unmount() {
		this.removeListeners();
		this.options.container &&
			this.resizeObserver?.unobserve(this.options.container);
		this.resizeObserver?.disconnect();
	}

	private addListeners() {
		const { container } = this.options;

		container && container.addEventListener("scroll", this.handleScroll);
		this.resizeObserver = new ResizeObserver(() => {
			this.updateStore();
		});

		this.addDraggingListeners();
	}

	private removeListeners() {
		const { container } = this.options;
		container && container.removeEventListener("scroll", this.handleScroll);
		this.removeDraggingListeners();
	}

	private handleScroll = (e: Event) => {
		requestAnimationFrame(() => {
			this.isScrolling = true;
			this.updateStore();
		});
	};

	protected abstract onMount(): void;
	protected abstract updateStore(): void;
	protected abstract updateScrollBarStyle(): void;
	protected abstract onAutoHide(): void;
	protected abstract shouldShowScrollBar(store: ScrollBarStore): boolean;

	// --------------------------------------
	// DRAG SCROLLBAR TO SCROLL CONTAINER
	// --------------------------------------

	addDraggingListeners() {
		const { container, scrollBar } = this.options;
		if (!container || !scrollBar) {
			return;
		}

		container.addEventListener("mousemove", this.handleMouseMove, {
			passive: true,
		});
		container.addEventListener("mouseenter", this.handleMouseEnter, {
			passive: true,
		});
		container.addEventListener("mouseleave", this.handleMouseLeave, {
			passive: true,
		});

		scrollBar.addEventListener("mouseenter", this.handleScrollBarMouseEnter, {
			passive: true,
		});
		scrollBar.addEventListener("mouseleave", this.handleScrollBarMouseLeave, {
			passive: true,
		});
		scrollBar.addEventListener("mousedown", this.handleScrollBarMouseDown, {
			passive: true,
		});

		document.body.addEventListener("mouseup", this.handleBodyMouseUp, {
			passive: true,
		});
		document.body.addEventListener("mousemove", this.handleBodyMouseMove);
	}

	removeDraggingListeners() {
		const { container, scrollBar } = this.options;

		if (!container || !scrollBar) {
			return;
		}

		container.removeEventListener("mousemove", this.handleMouseMove);
		container.removeEventListener("mouseenter", this.handleMouseEnter);
		container.removeEventListener("mouseleave", this.handleMouseLeave);

		scrollBar.removeEventListener("mouseenter", this.handleScrollBarMouseEnter);
		scrollBar.removeEventListener("mouseleave", this.handleScrollBarMouseLeave);
		scrollBar.removeEventListener("mousedown", this.handleScrollBarMouseDown);

		document.body.removeEventListener("mouseup", this.handleBodyMouseUp);
		document.body.removeEventListener("mousemove", this.handleBodyMouseMove);
	}

	handleMouseMove = (e: MouseEvent) => {
		this.updateMouseCoordinate(e);
	};

	updateMouseCoordinate(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const containerRect = target.getBoundingClientRect();

		this.mouseCoordinate = {
			x: Math.abs(e.clientX - containerRect.left),
			y: Math.abs(e.clientY - containerRect.top),
		};
		this.updateStore();
	}

	handleMouseLeave = () => {
		this.isMouseEntered = false;
	};

	handleMouseEnter = () => {
		this.isMouseEntered = true;
	};

	handleScrollBarMouseEnter = () => {
		this.isHoveringScrollBar = true;
	};

	handleScrollBarMouseLeave = () => {
		this.isHoveringScrollBar = false;
	};

	handleScrollBarMouseDown = (e: MouseEvent) => {
		const { container } = this.options;
		if (!container) {
			return;
		}

		this.isDraggingScrollBar = true;
		this.startDragInfo = {
			mouseCoordinate: {
				x: e.clientX,
				y: e.clientY,
			},
			scrollOffset: {
				x: container.scrollLeft,
				y: container.scrollTop,
			},
			offset: this.store.offset,
		};
	};

	handleBodyMouseUp = () => {
		this.isDraggingScrollBar = false;
	};

	handleBodyMouseMove = (e: MouseEvent) => {
		if (!this.isDraggingScrollBar) {
			return;
		}

		e.preventDefault();

		this.currentDragInfo = {
			mouseCoordinate: {
				x: e.clientX,
				y: e.clientY,
			},
			scrollOffset: {
				x: 0,
				y: 0,
			},
			offset: 0,
		};

		this.updateContainerScrollOffset({
			x:
				this.currentDragInfo.mouseCoordinate.x -
				this.startDragInfo.mouseCoordinate.x,
			y:
				this.currentDragInfo.mouseCoordinate.y -
				this.startDragInfo.mouseCoordinate.y,
		});
	};

	protected abstract updateContainerScrollOffset(delta: Coordinate): void;
}
