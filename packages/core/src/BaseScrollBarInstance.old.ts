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
	store: ScrollBarStore;

	protected oldOffset: number = 0;
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

		this.validateThumbAndTrackElement();
	}

	protected setStore(updater: (store: ScrollBarStore) => ScrollBarStore) {
		this.oldOffset = this.store.offset;
		this.store = updater(this.store);
		this.onStoreChange();
	}

	private onStoreChange() {
		const { thumb, track } = this.options;
		const { size, offset, visible } = this.store;

		if (track) {
			track.setAttribute("data-visible", visible ? "true" : "false");
			track.setAttribute("data-size", `${size}px`);
			track.setAttribute("data-offset", `${offset}px`);
			track.style.setProperty(
				"--scrollbar-visibility",
				visible ? "visible" : "hidden"
			);
			track.style.setProperty("--scrollbar-size", `${size}px`);
			track.style.setProperty("--scrollbar-offset", `${offset}px`);
		} else if (thumb) {
			thumb.setAttribute("data-visible", visible ? "true" : "false");
			thumb.setAttribute("data-size", `${size}px`);
			thumb.setAttribute("data-offset", `${offset}px`);
			thumb.style.setProperty(
				"--scrollbar-visibility",
				visible ? "visible" : "hidden"
			);
			thumb.style.setProperty("--scrollbar-size", `${size}px`);
			thumb.style.setProperty("--scrollbar-offset", `${offset}px`);
		}

		this.updateScrollBarStyle();
		if (this.options.autoHide) {
			this.debounceHide();
		}
	}

	updateOptions(options: Partial<ScrollBarOptions>) {
		const isScrollbarElementChanged = options.thumb !== this.options.thumb;
		const isTrackElementChanged = options.track !== this.options.track;
		const isContainerChanged = options.container !== this.options.container;
		this.options = {
			...this.options,
			...options,
			autoHide: options.autoHide ?? this.options.autoHide ?? true,
		};

		if (isScrollbarElementChanged || isTrackElementChanged) {
			this.validateThumbAndTrackElement();
		}

		if (
			isScrollbarElementChanged ||
			isTrackElementChanged ||
			isContainerChanged
		) {
			this.removeListeners();
			this.addListeners();
			this.initialScrollBarElement();
		}

		if (isContainerChanged || isTrackElementChanged) {
			this.updateStore();
		}
	}

	mount() {
		this.validateThumbAndTrackElement();
		this.addListeners();
		this.initialScrollBarElement();
		this.updateStore();

		return () => {
			this.unmount();
		};
	}

	unmount() {
		this.removeListeners();
	}

	private validateThumbAndTrackElement() {
		const { track, thumb } = this.options;

		if (!track || !thumb) {
			return;
		}

		if (!track.contains(thumb)) {
			throw new Error("Track element must contain thumb element");
		}
	}

	private initialScrollBarElement(): void {
		const { thumb, track, autoHide } = this.options;

		if (!thumb) {
			return;
		}

		if (track) {
			track.style.position = "fixed";
			track.style.left = "0px";
			track.style.top = "0px";

			if (autoHide) {
				track.style.opacity = "0";
				track.style.visibility = "hidden";
			}

			thumb.style.position = "absolute";
			thumb.style.left = "0px";
			thumb.style.top = "0px";
			thumb.style.height = "100%";
			return;
		}

		if (thumb) {
			thumb.style.position = "fixed";
			thumb.style.left = "0px";
			thumb.style.top = "0px";

			if (autoHide) {
				thumb.style.opacity = "0";
				thumb.style.visibility = "hidden";
			}
		}
	}

	private debounceHide = debounce(() => {
		this.hide();
	}, 500);

	private addListeners() {
		const { container } = this.options;

		this.eventAbortController = new AbortController();
		container &&
			container.addEventListener("scroll", this.handleScroll, {
				capture: true,
				signal: this.eventAbortController.signal,
			});

		this.resizeObserver = new ResizeObserver(() => {
			const { autoHide, thumb, track } = this.options;
			if (autoHide) {
				if (track) {
					track.style.opacity = "0";
					track.style.visibility = "hidden";
				} else if (thumb) {
					thumb.style.opacity = "0";
					thumb.style.visibility = "hidden";
				}
			}

			this.updateStore();
		});
		container && this.resizeObserver.observe(container);

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

		const { thumb, track } = this.options;
		if (!thumb) {
			return;
		}
		this.isScrolling = false;

		if (track) {
			track.setAttribute("data-visible", "false");
			track.style.setProperty("--scrollbar-visibility", "hidden");

			requestAnimationFrame(() => {
				track.style.opacity = "0";
				track.style.visibility = "hidden";
			});

			return;
		}

		thumb.setAttribute("data-visible", "false");
		thumb.style.setProperty("--scrollbar-visibility", "hidden");

		requestAnimationFrame(() => {
			thumb.style.opacity = "0";
			thumb.style.visibility = "hidden";
		});
	}

	protected abstract updateStore(): void;
	protected abstract updateScrollBarStyle(): void;

	// --------------------------------------
	// DRAG SCROLLBAR TO SCROLL CONTAINER
	// --------------------------------------

	addDraggingListeners() {
		const { container, thumb, track } = this.options;
		if (!container || !thumb) {
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
		container.addEventListener(
			"scrollend",
			() => {
				this.isScrolling = false;
			},
			{
				passive: true,
				capture: true,
				signal: this.eventAbortController.signal,
			}
		);

		const scrollBarEl = track || thumb;

		scrollBarEl.addEventListener(
			"pointerenter",
			this.handleScrollBarMouseEnter,
			{
				passive: true,
				capture: true,
				signal: this.eventAbortController.signal,
			}
		);
		scrollBarEl.addEventListener(
			"pointerleave",
			this.handleScrollBarMouseLeave,
			{
				passive: true,
				capture: true,
				signal: this.eventAbortController.signal,
			}
		);
		scrollBarEl.addEventListener("wheel", this.handleScrollBarWheel, {
			passive: false,
			capture: true,
			signal: this.eventAbortController.signal,
		});

		thumb.addEventListener("pointerdown", this.handleScrollBarMouseDown, {
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

	handleMouseLeave = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const relatedTarget = event.relatedTarget as HTMLElement;

		if (relatedTarget === target) {
			return;
		}

		if (target !== this.options.container) {
			return;
		}

		this.isMouseEntered = false;
		this.isScrolling = false;
		this.hide();
	};

	handleMouseEnter = (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		if (target !== this.options.container) {
			return;
		}

		this.isMouseEntered = true;
	};

	handleScrollBarMouseEnter = () => {
		this.isHoveringScrollBar = true;
		this.updateStore();
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
