import { isServer } from "./utils";

export interface ScrollBarEventBindingContext {
	getContainerElement(): HTMLElement | null | undefined;
	getTrackElement(): HTMLElement | null | undefined;
	getThumbElement(): HTMLElement | null | undefined;
	onResize(): void;
	onContainerMouseMove(event: MouseEvent): void;
	onContainerScroll(): void;
	onContainerScrollEnd(): void;
	onTrackMouseDown(event: MouseEvent): void;
	onTrackWheel(event: WheelEvent): void;
	onThumbMouseDown(event: MouseEvent): void;
	onThumbMouseMove(event: MouseEvent): void;
	onThumbMouseUp(): void;
}

/**
 * Manages all scrollbar-related DOM event listeners and ResizeObserver.
 * Single place to add/remove container, track, and thumb listeners.
 */
export class ScrollBarEventBinding {
	private observer?: ResizeObserver;
	private resizeScheduled = false;
	private containerEventAbortController = new AbortController();
	private trackEventAbortController = new AbortController();
	private thumbEventAbortController = new AbortController();

	constructor(private context: ScrollBarEventBindingContext) {}

	add(): void {
		if (isServer()) return;

		const container = this.context.getContainerElement();
		const track = this.context.getTrackElement();
		const thumb = this.context.getThumbElement();

		if (!container || !track) return;

		const observer = this.getObserver();
		observer?.observe(container);
		observer?.observe(track);

		this.containerEventAbortController = new AbortController();
		this.trackEventAbortController = new AbortController();
		this.thumbEventAbortController = new AbortController();

		if (container.contains(track)) {
			container.addEventListener(
				"mousemove",
				this.handleContainerMouseMove,
				{ signal: this.containerEventAbortController.signal },
			);
		} else {
			document.body.addEventListener(
				"mousemove",
				this.handleContainerMouseMove,
				{
					capture: true,
					signal: this.containerEventAbortController.signal,
				},
			);
		}

		container.addEventListener("scroll", this.handleContainerScroll, {
			signal: this.containerEventAbortController.signal,
		});
		container.addEventListener("scrollend", this.handleContainerScrollEnd, {
			signal: this.containerEventAbortController.signal,
		});

		track.addEventListener("mousedown", this.handleTrackMouseDown, {
			signal: this.trackEventAbortController.signal,
		});
		track.addEventListener("wheel", this.handleTrackWheel, {
			signal: this.trackEventAbortController.signal,
		});
		if (thumb) {
			thumb.addEventListener("mousedown", this.handleThumbMouseDown, {
				capture: true,
				signal: this.thumbEventAbortController.signal,
			});
			document.body.addEventListener("mousemove", this.handleThumbMouseMove, {
				signal: this.thumbEventAbortController.signal,
			});
			window.addEventListener("mouseup", this.handleThumbMouseUp, {
				capture: true,
				signal: this.thumbEventAbortController.signal,
			});
		}
	}

	remove(): void {
		this.containerEventAbortController.abort();
		this.trackEventAbortController.abort();
		this.thumbEventAbortController.abort();
		this.getObserver()?.disconnect();
	}

	private getObserver(): ResizeObserver | undefined {
		if (isServer()) return undefined;
		if (!this.observer) {
			this.observer = new ResizeObserver(this.handleResize);
		}
		return this.observer;
	}

	private handleResize = (): void => {
		if (this.resizeScheduled) return;
		this.resizeScheduled = true;
		requestAnimationFrame(() => {
			this.resizeScheduled = false;
			this.context.onResize();
		});
	};

	private handleContainerMouseMove = (event: MouseEvent): void => {
		this.context.onContainerMouseMove(event);
	};

	private handleContainerScroll = (): void => {
		this.context.onContainerScroll();
	};

	private handleContainerScrollEnd = (): void => {
		this.context.onContainerScrollEnd();
	};

	private handleTrackMouseDown = (event: MouseEvent): void => {
		this.context.onTrackMouseDown(event);
	};

	private handleTrackWheel = (event: WheelEvent): void => {
		this.context.onTrackWheel(event);
	};

	private handleThumbMouseDown = (event: MouseEvent): void => {
		this.context.onThumbMouseDown(event);
	};

	private handleThumbMouseMove = (event: MouseEvent): void => {
		this.context.onThumbMouseMove(event);
	};

	private handleThumbMouseUp = (): void => {
		this.context.onThumbMouseUp();
	};
}
