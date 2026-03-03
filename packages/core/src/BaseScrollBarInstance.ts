import { ScrollBarEventBinding } from "./ScrollBarEventBinding";
import { ScrollBarStateAttachment } from "./ScrollBarStateAttachment";
import {
	Coordinate,
	ScrollBarOptions,
	ScrollBarStore,
	ThumbDraggingActivatorInfo,
} from "./types";
import { clearUndefinedProperties, isEqual, isServer } from "./utils";

export abstract class BaseScrollBarInstance {
	protected options!: ScrollBarOptions;
	protected store: ScrollBarStore;
	protected prefix?: string;

	private stateAttachment: ScrollBarStateAttachment;
	private eventBinding: ScrollBarEventBinding;
	private elementsToAttachScrollBarStateTo?: Iterable<
		HTMLElement | null | undefined
	>;
	private lastContainerScrollOffset: Coordinate = { x: 0, y: 0 };
	private thumbDraggingActivator?: ThumbDraggingActivatorInfo;

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

		this.stateAttachment = new ScrollBarStateAttachment(() => this.store);
		this.eventBinding = new ScrollBarEventBinding({
			getContainerElement: () => this.getContainerElement(),
			getTrackElement: () => this.getTrackElement(),
			getThumbElement: () => this.getThumbElement(),
			onResize: () => this.handleResize(),
			onContainerMouseMove: (e) => this.handleContainerMouseMove(e),
			onContainerScroll: () => this.handleContainerScroll(),
			onContainerScrollEnd: () => this.handleContainerScrollEnd(),
			onTrackMouseDown: (e) => this.handleTrackMouseDown(e),
			onTrackWheel: (e) => this.handleTrackWheel(e),
			onThumbMouseDown: (e) => this.handleThumbMouseDown(e),
			onThumbMouseMove: (e) => this.handleThumbMouseMove(e),
			onThumbMouseUp: () => this.handleThumbMouseUp(),
		});
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
			this.eventBinding.remove();
			this.eventBinding.add();
			this.initialScrollBarElement();
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
			trackSize: this.getTrackSize(),
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
			this.stateAttachment.detachFromElements(
				oldElementsToAttachScrollBarStateTo,
				this.prefix,
			);
		}
	}

	mount() {
		this.eventBinding.add();
		this.initialScrollBarElement();

		return () => {
			this.unmount();
		};
	}

	unmount() {
		if (this.elementsToAttachScrollBarStateTo) {
			this.stateAttachment.detachFromElements(
				this.elementsToAttachScrollBarStateTo,
				this.prefix,
			);
		}
		this.eventBinding.remove();
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
		if (this.options.shouldAttachScrollBarStateToContainer) {
			const container = this.getContainerElement();
			if (container) {
				this.stateAttachment.attach(container, this.prefix);
			}
		}
		const track = this.getTrackElement();
		if (track) {
			this.stateAttachment.attach(track);
		}

		if (this.elementsToAttachScrollBarStateTo) {
			for (const element of this.elementsToAttachScrollBarStateTo) {
				if (element) {
					this.stateAttachment.attach(element);
				}
			}
		}
	}
	// #endregion

	// #region Element getters
	protected getContainerElement() {
		return this.options.getContainerElement?.();
	}

	protected getTrackElement() {
		return this.options.getTrackElement?.();
	}

	protected getThumbElement() {
		return this.options.getThumbElement?.();
	}
	// #endregion

	// #region Container event handlers
	private handleResize() {
		const { thumbSize, thumbOffset } = this.calculateThumbSizeAndOffset();
		this.updateStore({
			trackSize: this.getTrackSize(),
			thumbSize,
			thumbOffset,
			isScrollable: this.isScrollable(),
		});
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

	// #region Track event handlers
	private handleTrackMouseDown = (event: MouseEvent) => {
		if (event.target === this.getThumbElement()) {
			return;
		}
		this.updateContainerScrollOffsetOnTrackPress(event);
	};

	private handleTrackWheel = (event: WheelEvent) => {
		const container = this.getContainerElement();
		if (!container) return;

		event.preventDefault();
		container.scrollLeft += event.deltaX;
		container.scrollTop += event.deltaY;
	};
	// #endregion

	// #region Thumb event handlers
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

	// #region Hover helpers
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
		if (!track) return false;
		return this.isHoveringElement(event, track);
	}

	protected isHoveringThumb(event: MouseEvent): boolean {
		const thumb = this.getThumbElement();
		if (!thumb) return false;
		return this.isHoveringElement(event, thumb);
	}
	// #endregion

	// #region Abstract (axis-specific)
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
