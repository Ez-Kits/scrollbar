import {
	clearUndefinedProperties,
	isEqual,
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
	private resizeScheduled = false;
	private lastAttachedStateByElement = new WeakMap<
		HTMLElement,
		Record<string, ScrollBarStore>
	>();
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
			computedOptions.getContainerElement,
		);
		const isTrackElementChanged = this.isElementGetterChanged(
			this.options.getTrackElement,
			computedOptions.getTrackElement,
		);
		const isThumbElementChanged = this.isElementGetterChanged(
			this.options.getThumbElement,
			computedOptions.getThumbElement,
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
		newElementGetter?: () => HTMLElement | undefined | null,
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
				this.prefix,
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
		if (this.resizeScheduled) return;
		this.resizeScheduled = true;
		requestAnimationFrame(() => {
			this.resizeScheduled = false;
			const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
			this.updateStore({
				trackSize: this.getTrackSize(),
				thumbSize,
				thumbOffset,
				isScrollable: this.isScrollable(),
			});
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
				this.prefix,
			);
		}
		this.removeEventListeners();
	}
	// #endregion

	// #region Store
	protected updateStore(store: Partial<ScrollBarStore>) {
		const oldStore = { ...this.store };
		this.store = { ...this.store, ...store };

		if (!isEqual(oldStore, this.store)) {
			this.onStoreUpdate();
		}
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
				},
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
		const isHoveringTrack = this.isHoveringTrack(event);
		const isHoveringThumb = this.isHoveringThumb(event);
		if (
			this.store.isHoveringTrack === isHoveringTrack &&
			this.store.isHoveringThumb === isHoveringThumb
		) {
			return;
		}
		this.updateStore({ isHoveringTrack, isHoveringThumb });
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
			event,
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
		const current = { ...this.store };
		const prefixKey = prefix ?? "";
		const last = this.lastAttachedStateByElement.get(element)?.[prefixKey];
		if (last && isEqual(current, last)) {
			return;
		}

		const computedPrefix = prefix ? `${prefix}-` : "";

		requestAnimationFrame(() => {
			const currentFrame = { ...this.store };
			const lastFrame =
				this.lastAttachedStateByElement.get(element)?.[prefixKey];

			const s = (key: keyof ScrollBarStore) =>
				lastFrame?.[key] !== currentFrame[key];
			const sizeChanged = s("trackSize") || s("thumbSize") || s("thumbOffset");
			const trackSizePx = `${currentFrame.trackSize}px`;
			const thumbOffsetPx = `${currentFrame.thumbOffset}px`;
			const thumbSizePx = `${currentFrame.thumbSize}px`;

			if (sizeChanged) {
				element.dataset[kebabCaseToCamelCase(`${computedPrefix}size`)] =
					trackSizePx;
				element.dataset[kebabCaseToCamelCase(`${computedPrefix}thumb-offset`)] =
					thumbOffsetPx;
				element.dataset[kebabCaseToCamelCase(`${computedPrefix}thumb-size`)] =
					thumbSizePx;
				element.style.setProperty(
					`--${computedPrefix}thumb-offset`,
					thumbOffsetPx,
				);
				element.style.setProperty(`--${computedPrefix}thumb-size`, thumbSizePx);
				element.style.setProperty(`--${computedPrefix}track-size`, trackSizePx);
			}

			const setBoolDataset = (key: string, value: boolean) => {
				const dataKey = kebabCaseToCamelCase(key);
				if (value) {
					element.dataset[dataKey] = "true";
				} else {
					delete element.dataset[dataKey];
				}
			};

			if (lastFrame?.isHoveringTrack !== currentFrame.isHoveringTrack) {
				setBoolDataset(
					`is-hovering-${computedPrefix}track`,
					currentFrame.isHoveringTrack,
				);
			}
			if (lastFrame?.isHoveringThumb !== currentFrame.isHoveringThumb) {
				setBoolDataset(
					`is-hovering-${computedPrefix}thumb`,
					currentFrame.isHoveringThumb,
				);
			}
			if (lastFrame?.isDraggingThumb !== currentFrame.isDraggingThumb) {
				setBoolDataset(
					`is-dragging-${computedPrefix}thumb`,
					currentFrame.isDraggingThumb,
				);
			}
			if (lastFrame?.isScrolling !== currentFrame.isScrolling) {
				setBoolDataset(
					`is-${computedPrefix}scrolling`,
					currentFrame.isScrolling,
				);
			}
			if (lastFrame?.isScrollable !== currentFrame.isScrollable) {
				setBoolDataset(
					`is-${computedPrefix}scrollable`,
					currentFrame.isScrollable,
				);
			}

			const byElement = this.lastAttachedStateByElement.get(element) ?? {};
			this.lastAttachedStateByElement.set(element, {
				...byElement,
				[prefixKey]: { ...currentFrame },
			});
		});
	}

	private detachScrollBarStateFromElement(
		element: HTMLElement,
		prefix?: string,
	) {
		const prefixKey = prefix ?? "";
		const byElement = this.lastAttachedStateByElement.get(element);
		if (byElement) {
			const next = { ...byElement };
			delete next[prefixKey];
			if (Object.keys(next).length === 0) {
				this.lastAttachedStateByElement.delete(element);
			} else {
				this.lastAttachedStateByElement.set(element, next);
			}
		}

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
		prefix?: string,
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
	protected abstract getTrackSize(): number;
	protected abstract updateContainerScrollOffsetOnTrackPress(
		event: MouseEvent,
	): void;
	protected abstract updateContainerScrollOffsetOnThumbDragging(
		activatorInfo: ThumbDraggingActivatorInfo,
		event: MouseEvent,
	): void;
	protected abstract isScrolling(lastScrollOffset: Coordinate): boolean;
	protected abstract isScrollable(): boolean;
	// #endregion
}
