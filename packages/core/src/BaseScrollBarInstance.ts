import { ScrollBarOptions, ScrollBarStore } from "./types";

export abstract class BaseScrollBarInstance {
	protected options!: ScrollBarOptions;
	protected store: ScrollBarStore;

	constructor(options: Partial<ScrollBarOptions>) {
		this.options = { ...options };
		this.store = {
			thumbSize: 0,
			thumbOffset: 0,
			trackSize: 0,
			isHoveringTrack: false,
			isHoveringThumb: false,
			isDraggingThumb: false,
			isScrolling: false,
		};
	}

	// #region Initialization
	updateOptions(options: Partial<ScrollBarOptions>) {
		const isContainerElementChanged = this.isElementGetterChanged(
			this.options.getContainerElement,
			options.getContainerElement
		);
		const isTrackElementChanged = this.isElementGetterChanged(
			this.options.getTrackElement,
			options.getTrackElement
		);
		const isThumbElementChanged = this.isElementGetterChanged(
			this.options.getThumbElement,
			options.getThumbElement
		);

		if (
			isContainerElementChanged ||
			isTrackElementChanged ||
			isThumbElementChanged
		) {
			this.options = { ...options };
			this.removeEventListeners();
			this.addEventListeners();
		}
	}

	private isElementGetterChanged(
		oldElementGetter?: () => HTMLElement | undefined | null,
		newElementGetter?: () => HTMLElement | undefined | null
	) {
		if (oldElementGetter !== undefined && newElementGetter !== undefined) {
			return oldElementGetter() !== newElementGetter();
		}

		if (oldElementGetter === undefined && newElementGetter === undefined) {
			return false;
		}

		if (oldElementGetter !== undefined && newElementGetter === undefined) {
			return true;
		}

		return false;
	}

	private initialScrollBarElement() {
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		this.updateStore({
			thumbSize,
			thumbOffset,
			trackSize: this.getTrackElement()?.clientWidth,
		});
	}

	private addEventListeners() {
		this.addContainerElementEventListeners();
		this.addTrackElementEventListeners();
		this.addThumbElementEventListeners();
	}

	private removeEventListeners() {
		this.removeContainerElementEventListeners();
		this.removeTrackElementEventListeners();
		this.removeThumbElementEventListeners();
	}

	mount() {
		this.addEventListeners();
		this.initialScrollBarElement();

		return () => {
			this.unmount();
		};
	}

	unmount() {
		this.removeEventListeners();
	}
	// #endregion

	// #region Store
	protected updateStore(store: Partial<ScrollBarStore>) {
		this.store = { ...this.store, ...store };
		this.onStoreUpdate();
	}

	private onStoreUpdate() {
		this.updateContainerElement();
		this.updateTrackElement();
		this.updateThumbElement();
	}
	// #endregion

	// #region Container
	private containerEventAbortController = new AbortController();

	protected getContainerElement() {
		return this.options.getContainerElement?.();
	}

	private updateContainerElement() {
		// Do nothing
	}

	private addContainerElementEventListeners() {
		const container = this.getContainerElement();
		if (!container) return;

		this.containerEventAbortController = new AbortController();

		console.log("addContainerElementEventListeners");

		container.addEventListener("mousemove", this.handleContainerMouseMove, {
			signal: this.containerEventAbortController.signal,
		});
		container.addEventListener("scroll", this.handleContainerScroll, {
			capture: true,
			signal: this.containerEventAbortController.signal,
		});
		container.addEventListener("scrollend", this.handleContainerScrollEnd, {
			signal: this.containerEventAbortController.signal,
		});
	}

	private removeContainerElementEventListeners() {
		this.containerEventAbortController.abort();
	}

	private handleContainerMouseMove = (event: MouseEvent) => {
		this.updateStore({
			isHoveringTrack: this.isHoveringTrack(event),
		});
	};

	private handleContainerScroll = () => {
		this.updateStore({ isScrolling: true });
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		console.log("thumbSize", thumbSize);
		console.log("thumbOffset", thumbOffset);
		this.updateStore({ thumbSize, thumbOffset });
	};

	private handleContainerScrollEnd = () => {
		this.updateStore({ isScrolling: false });
	};
	// #endregion

	// #region Scrollbar Track
	private trackEventAbortController = new AbortController();
	private trackObserver?: ResizeObserver;

	protected getTrackElement() {
		return this.options.getTrackElement?.();
	}

	private updateTrackElement() {
		const {
			thumbSize,
			thumbOffset,
			trackSize,
			isHoveringTrack,
			isHoveringThumb,
			isDraggingThumb,
			isScrolling,
		} = this.store;
		const track = this.getTrackElement();
		if (!track) return;

		requestAnimationFrame(() => {
			track.dataset.size = `${trackSize}px`;
			track.dataset.thumbOffset = `${thumbOffset}px`;
			track.dataset.thumbSize = `${thumbSize}px`;

			track.style.setProperty("--thumb-offset", `${thumbOffset}px`);
			track.style.setProperty("--thumb-size", `${thumbSize}px`);
			track.style.setProperty("--track-size", `${trackSize}px`);

			if (isHoveringTrack) {
				track.dataset.isHoveringTrack = "true";
			} else {
				delete track.dataset.isHoveringTrack;
			}

			if (isHoveringThumb) {
				track.dataset.isHoveringThumb = "true";
			} else {
				delete track.dataset.isHoveringThumb;
			}

			if (isDraggingThumb) {
				track.dataset.isDraggingThumb = "true";
			} else {
				delete track.dataset.isDraggingThumb;
			}

			if (isScrolling) {
				track.dataset.isScrolling = "true";
			} else {
				delete track.dataset.isScrolling;
			}
		});
	}

	private addTrackElementEventListeners() {
		const track = this.getTrackElement();
		if (!track) return;

		this.trackObserver = new ResizeObserver(this.handleTrackResize);
		this.trackObserver.observe(track);

		this.trackEventAbortController = new AbortController();
		track.addEventListener("mousedown", this.handleTrackMouseDown, {
			signal: this.trackEventAbortController.signal,
		});
		track.addEventListener("wheel", this.handleTrackWheel, {
			signal: this.trackEventAbortController.signal,
		});
	}

	private removeTrackElementEventListeners() {
		this.trackEventAbortController.abort();
		this.trackObserver?.disconnect();
	}

	private handleTrackResize = () => {
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		this.updateStore({
			trackSize: this.getTrackElement()?.clientWidth,
			thumbSize,
			thumbOffset,
		});
	};

	private handleTrackMouseDown = (event: MouseEvent) => {
		if (event.target === this.getThumbElement()) {
			return;
		}

		this.updateContainerScrollOffsetOnTrackPress(event);
	};

	private handleTrackWheel = (event: WheelEvent) => {
		const container = this.getContainerElement();
		if (!container) {
			return;
		}

		event.preventDefault();
		container.scrollLeft += event.deltaX;
		container.scrollTop += event.deltaY;
	};
	// #endregion

	// #region Scrollbar Thumb
	private thumbEventAbortController = new AbortController();
	private thumbDraggingActivatorEvent?: MouseEvent;

	protected getThumbElement() {
		return this.options.getThumbElement?.();
	}

	private updateThumbElement() {
		// Do nothing
	}

	private addThumbElementEventListeners() {
		const thumb = this.getThumbElement();
		if (!thumb) return;

		this.thumbEventAbortController = new AbortController();

		thumb.addEventListener("mousedown", this.handleThumbMouseDown, {
			signal: this.thumbEventAbortController.signal,
		});
		document.body.addEventListener("mousemove", this.handleThumbMouseMove, {
			signal: this.thumbEventAbortController.signal,
		});
		window.addEventListener("mouseup", this.handleThumbMouseUp, {
			signal: this.thumbEventAbortController.signal,
		});
	}

	private removeThumbElementEventListeners() {
		this.thumbEventAbortController.abort();
	}

	private handleThumbMouseDown = (event: MouseEvent) => {
		this.thumbDraggingActivatorEvent = event;
		this.updateStore({ isDraggingThumb: true });
	};

	private handleThumbMouseMove = (event: MouseEvent) => {
		if (!this.thumbDraggingActivatorEvent) return;

		this.updateContainerScrollOffsetOnThumbDragging(
			this.thumbDraggingActivatorEvent,
			event
		);
	};

	private handleThumbMouseUp = () => {
		this.thumbDraggingActivatorEvent = undefined;
		this.updateStore({ isDraggingThumb: false });
	};
	// #endregion

	// #region Helpers
	protected abstract isHoveringTrack(event: MouseEvent): boolean;
	protected abstract calculateThumbSizeAndOffset(): {
		thumbSize: number;
		thumbOffset: number;
	};
	protected abstract updateContainerScrollOffsetOnTrackPress(
		event: MouseEvent
	): void;
	protected abstract updateContainerScrollOffsetOnThumbDragging(
		activatorEvent: MouseEvent,
		event: MouseEvent
	): void;
	// #endregion
}
