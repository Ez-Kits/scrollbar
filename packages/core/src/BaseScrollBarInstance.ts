import { ScrollBarOptions, ScrollBarStore } from "./types";

export abstract class BaseScrollBarInstance {
	protected options!: ScrollBarOptions;
	protected store: ScrollBarStore;

	constructor(options: Partial<ScrollBarOptions>) {
		this.updateOptions(options);
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
		const isContainerElementChanged =
			options.getContainerElement() !== this.options.getContainerElement;
		const isTrackElementChanged =
			options.getTrackElement() !== this.options.getTrackElement;
		const isThumbElementChanged =
			options.getThumbElement() !== this.options.getThumbElement;

		this.options = { ...options };
		this.removeEventListeners();
		this.addEventListeners();
	}

	private isElementGetterChanged(
		oldElementGetter: () => HTMLElement | undefined,
		newElementGetter: () => HTMLElement | undefined
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

		container.addEventListener("mousemove", this.handleContainerMouseMove, {
			signal: this.containerEventAbortController.signal,
		});
		container.addEventListener("scroll", this.handleContainerScroll, {
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
		if (!this.trackDomRect) return;

		this.updateStore({
			isHoveringTrack: this.isHoveringTrack(this.trackDomRect, event),
		});
	};

	private handleContainerScroll = (event: Event) => {
		this.updateStore({ isScrolling: true });
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset(event);
		this.updateStore({ thumbSize, thumbOffset });
	};

	private handleContainerScrollEnd = () => {
		this.updateStore({ isScrolling: false });
	};
	// #endregion

	// #region Scrollbar Track
	private trackEventAbortController = new AbortController();
	private trackDomRect?: DOMRect;
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

		this.trackObserver = new ResizeObserver(this.updateTrackDomRect.bind(this));
		this.trackObserver.observe(track);

		this.trackEventAbortController = new AbortController();
		track.addEventListener("mousedown", this.handleTrackMouseDown, {
			signal: this.trackEventAbortController.signal,
		});
	}

	private removeTrackElementEventListeners() {
		this.trackEventAbortController.abort();
		this.trackObserver?.disconnect();
	}

	private updateTrackDomRect() {
		const track = this.getTrackElement();
		if (!track) return;

		this.trackDomRect = track.getBoundingClientRect();
	}

	private handleTrackMouseDown = (event: MouseEvent) => {
		if (event.target === this.getThumbElement()) {
			return;
		}

		this.updateContainerScrollOffsetOnTrackPress(event);
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
	protected abstract isHoveringTrack(
		trackDomRect: DOMRect,
		event: MouseEvent
	): boolean;
	protected abstract calculateThumbSizeAndOffset(event: Event): {
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
