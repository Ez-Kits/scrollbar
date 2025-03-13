import {
	Coordinate,
	DraggingInfo,
	ScrollBarOptions,
	ScrollBarStore,
} from "src/types";
import { debounce } from "src/utils";

export abstract class BaseScrollBarInstance {
	protected options: ScrollBarOptions;
	protected resizeObserver?: ResizeObserver;
	private autoHideTimeout?: NodeJS.Timeout;
	store: ScrollBarStore;

	protected isMounted: boolean = false;
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

	private eventAbortController = new AbortController();
	private oldUserSelect: string = "";

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
		if (this.options.autoHide) {
			this.debounceHide();
		}
	}

	updateOptions(options: Partial<ScrollBarOptions>) {
		const isScrollbarElementChanged =
			options.scrollBar !== this.options.scrollBar;
		const isContainerChanged = options.container !== this.options.container;
		this.options = {
			...this.options,
			...options,
			autoHide: options.autoHide ?? this.options.autoHide ?? true,
		};

		if (isScrollbarElementChanged || isContainerChanged) {
			this.removeListeners();
			this.addListeners();
			this.initialScrollBarElement();
		}

		if (isContainerChanged) {
			this.updateStore();
		}
	}

	mount() {
		this.addListeners();
		this.options.container &&
			this.resizeObserver?.observe(this.options.container);

		this.initialScrollBarElement();
		this.updateStore();
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

	private debounceHide = debounce(() => {
		this.hide();
	}, 500);

	private addListeners() {
		const { container, scrollBar } = this.options;

		this.eventAbortController = new AbortController();
		container &&
			container.addEventListener("scroll", this.handleScroll, {
				capture: true,
				signal: this.eventAbortController.signal,
			});

		this.resizeObserver = new ResizeObserver(() => {
			if (scrollBar && this.options.autoHide) {
				scrollBar.style.opacity = "0";
				scrollBar.style.visibility = "hidden";
			}

			this.updateStore();
		});

		this.addDraggingListeners();
		this.addDocumentScrollListener();
	}

	private removeListeners() {
		this.eventAbortController.abort();
		this.resizeObserver?.disconnect();
	}

	private handleScroll = (e: Event) => {
		requestAnimationFrame(() => {
			this.isScrolling = true;
			this.updateStore();
		});
	};

	hide() {
		if (this.isHoveringScrollBar || this.isDraggingScrollBar) {
			return;
		}

		const { scrollBar } = this.options;

		if (scrollBar) {
			scrollBar.setAttribute("data-visible", "false");
			scrollBar.style.setProperty("--scrollbar-visibility", "hidden");
		}

		this.isScrolling = false;
		this.onHide();
	}

	protected abstract initialScrollBarElement(): void;
	protected abstract updateStore(): void;
	protected abstract updateScrollBarStyle(): void;
	protected abstract onHide(): void;
	protected abstract shouldShowScrollBar(store: ScrollBarStore): boolean;

	// --------------------------------------
	// DRAG SCROLLBAR TO SCROLL CONTAINER
	// --------------------------------------

	addDraggingListeners() {
		const { container, scrollBar } = this.options;
		if (!container || !scrollBar) {
			return;
		}

		container.addEventListener("pointermove", this.handleMouseMove, {
			passive: true,
			capture: true,
			signal: this.eventAbortController.signal,
		});
		container.addEventListener("pointerenter", this.handleMouseEnter, {
			passive: true,
			capture: true,
			signal: this.eventAbortController.signal,
		});
		container.addEventListener("pointerleave", this.handleMouseLeave, {
			passive: true,
			capture: true,
			signal: this.eventAbortController.signal,
		});

		scrollBar.addEventListener("pointerenter", this.handleScrollBarMouseEnter, {
			passive: true,
			capture: true,
			signal: this.eventAbortController.signal,
		});
		scrollBar.addEventListener("pointerleave", this.handleScrollBarMouseLeave, {
			passive: true,
			capture: true,
			signal: this.eventAbortController.signal,
		});
		scrollBar.addEventListener("pointerdown", this.handleScrollBarMouseDown, {
			capture: true,
			signal: this.eventAbortController.signal,
		});
		scrollBar.addEventListener("wheel", this.handleScrollBarWheel, {
			passive: false,
			capture: true,
			signal: this.eventAbortController.signal,
		});

		window.addEventListener("pointerup", this.handleBodyMouseUp, {
			passive: true,
			capture: true,
			signal: this.eventAbortController.signal,
		});
		document.body.addEventListener("pointermove", this.handleBodyMouseMove, {
			capture: true,
			signal: this.eventAbortController.signal,
		});
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

	handleMouseEnter = (e: MouseEvent) => {
		if (!this.isOnlyLeftButton(e)) {
			return;
		}

		this.isMouseEntered = true;
	};

	handleScrollBarMouseEnter = () => {
		this.isHoveringScrollBar = true;
	};

	handleScrollBarMouseLeave = () => {
		this.isHoveringScrollBar = false;
	};

	handleScrollBarMouseDown = (e: MouseEvent) => {
		if (!this.isOnlyLeftButton(e)) {
			return;
		}

		const { container } = this.options;
		if (!container) {
			return;
		}

		// e.preventDefault();
		this.oldUserSelect = document.body.style.userSelect;
		document.body.style.userSelect = "none";

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
		document.body.style.userSelect = this.oldUserSelect;
	};

	handleBodyMouseMove = (e: MouseEvent) => {
		if (!this.isDraggingScrollBar) {
			return;
		}

		// e.preventDefault();

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

	handleScrollBarWheel = (e: WheelEvent) => {
		const { container } = this.options;
		if (!container) {
			return;
		}

		e.preventDefault();
		container.scrollLeft += e.deltaX;
		container.scrollTop += e.deltaY;
	};

	protected abstract updateContainerScrollOffset(delta: Coordinate): void;

	// --------------------------------------
	// HANDLE OTHERS SCROLL
	// --------------------------------------

	handleOtherScroll = (e: Event) => {
		const el = e.target;

		if (!(el instanceof HTMLElement)) {
			return;
		}

		if (el === this.options.container) {
			return;
		}

		this.hide();
	};

	addDocumentScrollListener() {
		document.addEventListener("scroll", this.handleOtherScroll, {
			capture: true,
			signal: this.eventAbortController.signal,
		});
	}

	// --------------------------------------
	// POINTER EVENTS UTILITIES
	// --------------------------------------

	private isOnlyLeftButton(e: MouseEvent) {
		return e.button === 0;
	}
}
