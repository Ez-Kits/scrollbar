export interface ScrollBarStore {
	/**
	 * Size of scrollbar.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	size: number;
	/**
	 * Offset of scrollbar.
	 * Is offset top with Vertical Scrollbar and offset left with Horizontal ScrollBar
	 */
	offset: number;
	/**
	 * Size of container.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	containerSize: number;
	/**
	 * Visibility of scrollbar.
	 */
	visible: boolean;
}

export interface ScrollBarOptions {
	/**
	 * Container element, which will be scrollable
	 */
	container: HTMLElement;

	/**
	 * Scrollbar element
	 */
	scrollBar?: HTMLElement;

	/**
	 * Should scrollbar automatically hide
	 */
	autoHide?: boolean;

	// /**
	//  * Modify scrollbar store, useful when need to change size or offset of scrollbar
	//  */
	// modifier?: (store: ScrollBarStore, container: HTMLElement) => ScrollBarStore;

	/**
	 * Offset of scrollbar from start.
	 * Top offset with Vertical Scrollbar.
	 * Left offset with Horizontal Scrollbar.
	 * @default 0
	 */
	startOffset: number;

	/**
	 * Offset of scrollbar from end.
	 * Bottom offset with Vertical Scrollbar.
	 * Right offset with Horizontal Scrollbar.
	 * @default 0
	 */
	endOffset: number;
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
