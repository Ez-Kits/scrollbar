export interface ScrollBarStore {
	/**
	 * Size of scrollbar thumb.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	thumbSize: number;
	/**
	 * Offset of scrollbar thumb.
	 * Is offset top with Vertical Scrollbar and offset left with Horizontal ScrollBar
	 */
	thumbOffset: number;
	/**
	 * Size of scrollbar track.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	trackSize: number;
	/**
	 * Is scrollbar track hovered.
	 */
	isHoveringTrack: boolean;
	/**
	 * Is scrollbar thumb hovered.
	 */
	isHoveringThumb: boolean;
	/**
	 * Is scrollbar thumb is being dragged.
	 */
	isDraggingThumb: boolean;
	/**
	 * Is container is being scrolled.
	 */
	isScrolling: boolean;
}

export interface ScrollBarOptions {
	/**
	 * Container element, which will be scrollable
	 */
	getContainerElement?: () => HTMLElement | null | undefined;

	/**
	 * Scrollbar Thumb element
	 */
	getThumbElement?: () => HTMLElement | null | undefined;

	/**
	 * Scrollbar Track element
	 */
	getTrackElement?: () => HTMLElement | null | undefined;
}

export interface Coordinate {
	x: number;
	y: number;
}

export interface DraggingInfo {
	mouseCoordinate: Coordinate;
	scrollOffset: Coordinate;
	offset: number;
}
