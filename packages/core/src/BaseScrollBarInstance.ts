import {
	clearUndefinedProperties,
	isServer,
	kebabCaseToCamelCase,
} from "src/utils";
import {
	Coordinate,
	ScrollBarOptions,
	ScrollBarStore,
	ThumbDraggingActivatorInfo,
} from "./types";

export abstract class BaseScrollBarInstance {
	protected options!: ScrollBarOptions;
	protected store: ScrollBarStore;
	protected prefix?: string;

	private observer?: ResizeObserver;
	private elementsToAttachScrollBarStateTo?: Iterable<
		HTMLElement | null | undefined
	>;

	constructor(options: Partial<ScrollBarOptions>) {
		this.options = {
			...options,
			shouldAttachScrollBarStateToContainer:
				options.shouldAttachScrollBarStateToContainer ?? true,
		};
		this.store = {
			thumbSize: 0,
			thumbOffset: 0,
			trackSize: 0,
			isHoveringTrack: false,
			isHoveringThumb: false,
			isDraggingThumb: false,
			isScrolling: false,
			isScrollable: false,
		};

		this.elementsToAttachScrollBarStateTo =
			options.getElementsToAttachScrollBarStateTo?.();
	}

	// #region Initialization
	updateOptions(options: Partial<ScrollBarOptions>) {
		const computedOptions = clearUndefinedProperties(options);
		const isContainerElementChanged = this.isElementGetterChanged(
			this.options.getContainerElement,
			computedOptions.getContainerElement
		);
		const isTrackElementChanged = this.isElementGetterChanged(
			this.options.getTrackElement,
			computedOptions.getTrackElement
		);
		const isThumbElementChanged = this.isElementGetterChanged(
			this.options.getThumbElement,
			computedOptions.getThumbElement
		);

		this.options = {
			...this.options,
			...computedOptions,
			shouldAttachScrollBarStateToContainer:
				computedOptions.shouldAttachScrollBarStateToContainer ?? true,
		};

		this.updateElementsToAttachScrollBarStateTo();

		if (
			isContainerElementChanged ||
			isTrackElementChanged ||
			isThumbElementChanged
		) {
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
		if (isServer()) return;

		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		this.updateStore({
			thumbSize,
			thumbOffset,
			trackSize: this.getTrackElement()?.clientWidth,
			isScrollable: this.isScrollable(),
		});
	}

	private updateElementsToAttachScrollBarStateTo() {
		const oldElementsToAttachScrollBarStateTo =
			this.elementsToAttachScrollBarStateTo;
		this.elementsToAttachScrollBarStateTo =
			this.options.getElementsToAttachScrollBarStateTo?.();

		if (
			oldElementsToAttachScrollBarStateTo &&
			oldElementsToAttachScrollBarStateTo !==
				this.elementsToAttachScrollBarStateTo
		) {
			this.detachScrollBarStateFromElements(
				oldElementsToAttachScrollBarStateTo,
				this.prefix
			);
		}
	}

	private getObserver() {
		if (isServer()) return;

		if (!this.observer) {
			this.observer = new ResizeObserver(this.handleResize);
		}

		return this.observer;
	}

	private handleResize = () => {
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		this.updateStore({
			trackSize: this.getTrackElement()?.clientWidth,
			thumbSize,
			thumbOffset,
			isScrollable: this.isScrollable(),
		});
	};

	private addEventListeners() {
		if (isServer()) return;

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
		if (this.elementsToAttachScrollBarStateTo) {
			this.detachScrollBarStateFromElements(
				this.elementsToAttachScrollBarStateTo,
				this.prefix
			);
		}
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
	private lastContainerScrollOffset: Coordinate = { x: 0, y: 0 };

	protected getContainerElement() {
		return this.options.getContainerElement?.();
	}

	private updateContainerElement() {
		if (!this.options.shouldAttachScrollBarStateToContainer) return;
		const container = this.getContainerElement();
		if (!container) return;

		this.attachScrollBarStateToElement(container, this.prefix);
	}

	private addContainerElementEventListeners() {
		const container = this.getContainerElement();
		const track = this.getTrackElement();
		if (!container || !track) return;

		const observer = this.getObserver();
		observer?.observe(container);

		this.containerEventAbortController = new AbortController();

		if (container.contains(track)) {
			container.addEventListener("mousemove", this.handleContainerMouseMove, {
				signal: this.containerEventAbortController.signal,
			});
		} else {
			document.body.addEventListener(
				"mousemove",
				this.handleContainerMouseMove,
				{
					capture: true,
					signal: this.containerEventAbortController.signal,
				}
			);
		}

		container.addEventListener("scroll", this.handleContainerScroll, {
			signal: this.containerEventAbortController.signal,
		});
		container.addEventListener("scrollend", this.handleContainerScrollEnd, {
			signal: this.containerEventAbortController.signal,
		});
	}

	private removeContainerElementEventListeners() {
		this.containerEventAbortController.abort();
		this.getObserver()?.disconnect();
	}

	private handleContainerMouseMove = (event: MouseEvent) => {
		this.updateStore({
			isHoveringTrack: this.isHoveringTrack(event),
			isHoveringThumb: this.isHoveringThumb(event),
		});
	};

	private handleContainerScroll = () => {
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		this.updateStore({
			thumbSize,
			thumbOffset,
			isScrolling: this.isScrolling(this.lastContainerScrollOffset),
		});

		const container = this.getContainerElement();
		if (!container) return;
		this.lastContainerScrollOffset = {
			x: container.scrollLeft,
			y: container.scrollTop,
		};
	};

	private handleContainerScrollEnd = () => {
		this.updateStore({ isScrolling: false });
		const container = this.getContainerElement();
		if (!container) return;

		this.lastContainerScrollOffset = {
			x: container.scrollLeft,
			y: container.scrollTop,
		};
	};
	// #endregion

	// #region Scrollbar Track
	private trackEventAbortController = new AbortController();

	protected getTrackElement() {
		return this.options.getTrackElement?.();
	}

	private updateTrackElement() {
		const track = this.getTrackElement();
		if (!track) return;

		this.attachScrollBarStateToElement(track);
	}

	private addTrackElementEventListeners() {
		const track = this.getTrackElement();
		if (!track) return;

		const observer = this.getObserver();
		observer?.observe(track);

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
		this.getObserver()?.disconnect();
	}

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
	private thumbDraggingActivator?: ThumbDraggingActivatorInfo;

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

	private removeThumbElementEventListeners() {
		this.thumbEventAbortController.abort();
	}

	private handleThumbMouseDown = (event: MouseEvent) => {
		event.stopImmediatePropagation();
		this.thumbDraggingActivator = {
			activatorEvent: event,
			offset: this.store.thumbOffset,
			bodyUserSelect: document.body.style.userSelect,
		};
		document.body.style.userSelect = "none";
		this.updateStore({ isDraggingThumb: true });
	};

	private handleThumbMouseMove = (event: MouseEvent) => {
		if (!this.thumbDraggingActivator) return;

		this.updateContainerScrollOffsetOnThumbDragging(
			this.thumbDraggingActivator,
			event
		);
	};

	private handleThumbMouseUp = () => {
		document.body.style.userSelect =
			this.thumbDraggingActivator?.bodyUserSelect ?? "";
		this.thumbDraggingActivator = undefined;
		this.updateStore({ isDraggingThumb: false });
	};
	// #endregion

	// #region Helpers
	private isHoveringElement(event: MouseEvent, element: HTMLElement): boolean {
		if (element.contains(event.target as Node) || element === event.target) {
			return true;
		}

		const elementRect = element.getBoundingClientRect();
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		return (
			mouseX >= elementRect.left &&
			mouseX <= elementRect.right &&
			mouseY >= elementRect.top &&
			mouseY <= elementRect.bottom
		);
	}

	protected isHoveringTrack(event: MouseEvent): boolean {
		const track = this.getTrackElement();
		if (!track) {
			return false;
		}

		return this.isHoveringElement(event, track);
	}

	protected isHoveringThumb(event: MouseEvent): boolean {
		const thumb = this.getThumbElement();
		if (!thumb) {
			return false;
		}

		return this.isHoveringElement(event, thumb);
	}

	private attachScrollBarStateToElement(element: HTMLElement, prefix?: string) {
		const {
			thumbSize,
			thumbOffset,
			trackSize,
			isHoveringTrack,
			isHoveringThumb,
			isDraggingThumb,
			isScrolling,
			isScrollable,
		} = this.store;

		const computedPrefix = prefix ? `${prefix}-` : "";

		requestAnimationFrame(() => {
			element.dataset[
				kebabCaseToCamelCase(`${computedPrefix}size`)
			] = `${trackSize}px`;
			element.dataset[
				kebabCaseToCamelCase(`${computedPrefix}thumb-offset`)
			] = `${thumbOffset}px`;
			element.dataset[
				kebabCaseToCamelCase(`${computedPrefix}thumb-size`)
			] = `${thumbSize}px`;

			element.style.setProperty(
				`--${computedPrefix}thumb-offset`,
				`${thumbOffset}px`
			);
			element.style.setProperty(
				`--${computedPrefix}thumb-size`,
				`${thumbSize}px`
			);
			element.style.setProperty(
				`--${computedPrefix}track-size`,
				`${trackSize}px`
			);

			if (isHoveringTrack) {
				element.dataset[
					kebabCaseToCamelCase(`is-hovering-${computedPrefix}track`)
				] = "true";
			} else {
				delete element.dataset[
					kebabCaseToCamelCase(`is-hovering-${computedPrefix}track`)
				];
			}

			if (isHoveringThumb) {
				element.dataset[
					kebabCaseToCamelCase(`is-hovering-${computedPrefix}thumb`)
				] = "true";
			} else {
				delete element.dataset[
					kebabCaseToCamelCase(`is-hovering-${computedPrefix}thumb`)
				];
			}

			if (isDraggingThumb) {
				element.dataset[
					kebabCaseToCamelCase(`is-dragging-${computedPrefix}thumb`)
				] = "true";
			} else {
				delete element.dataset[
					kebabCaseToCamelCase(`is-dragging-${computedPrefix}thumb`)
				];
			}

			if (isScrolling) {
				element.dataset[kebabCaseToCamelCase(`is-${computedPrefix}scrolling`)] =
					"true";
			} else {
				delete element.dataset[
					kebabCaseToCamelCase(`is-${computedPrefix}scrolling`)
				];
			}

			if (isScrollable) {
				element.dataset[
					kebabCaseToCamelCase(`is-${computedPrefix}scrollable`)
				] = "true";
			} else {
				delete element.dataset[
					kebabCaseToCamelCase(`is-${computedPrefix}scrollable`)
				];
			}
		});
	}

	private detachScrollBarStateFromElement(
		element: HTMLElement,
		prefix?: string
	) {
		const computedPrefix = prefix ? `${prefix}-` : "";
		delete element.dataset[
			kebabCaseToCamelCase(`is-${computedPrefix}scrollable`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-hovering-${computedPrefix}track`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-hovering-${computedPrefix}thumb`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-dragging-${computedPrefix}thumb`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-${computedPrefix}scrolling`)
		];

		element.style.removeProperty(`--${computedPrefix}thumb-offset`);
		element.style.removeProperty(`--${computedPrefix}thumb-size`);
		element.style.removeProperty(`--${computedPrefix}track-size`);
	}

	private detachScrollBarStateFromElements(
		elements: Iterable<HTMLElement | null | undefined>,
		prefix?: string
	) {
		for (const element of elements) {
			if (!element) continue;
			this.detachScrollBarStateFromElement(element, prefix);
		}
	}
	// #endregion

	// #region Calculations
	protected abstract calculateThumbSizeAndOffset(): {
		thumbSize: number;
		thumbOffset: number;
	};
	protected abstract updateContainerScrollOffsetOnTrackPress(
		event: MouseEvent
	): void;
	protected abstract updateContainerScrollOffsetOnThumbDragging(
		activatorInfo: ThumbDraggingActivatorInfo,
		event: MouseEvent
	): void;
	protected abstract isScrolling(lastScrollOffset: Coordinate): boolean;
	protected abstract isScrollable(): boolean;
	// #endregion
}
