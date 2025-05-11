"use client";

import { useRef, type HTMLAttributes } from "react";
import {
	HorizontalScrollBar,
	type HorizontalScrollBarProps,
} from "./HorizontalScrollBar";
import {
	VerticalScrollBar,
	type VerticalScrollBarProps,
} from "./VerticalScrollBar";

export interface ScrollBarProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Horizontal scrollbar props
	 * @default true
	 */
	horizontal?: boolean | HorizontalScrollBarProps;

	/**1
	 * Vertical scrollbar props
	 * @default true
	 */
	vertical?: boolean | VerticalScrollBarProps;

	/**
	 * Props for the scroller element
	 */
	scrollerProps?: HTMLAttributes<HTMLDivElement>;
}

export const ScrollBar = ({
	children,
	vertical = true,
	horizontal = true,
	scrollerProps,
	...props
}: ScrollBarProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div {...props}>
			<div {...scrollerProps} ref={containerRef}>
				{children}
			</div>
			{horizontal ? (
				<HorizontalScrollBar
					container={containerRef}
					{...(typeof horizontal === "object" ? horizontal : {})}
				/>
			) : null}
			{vertical ? (
				<VerticalScrollBar
					container={containerRef}
					{...(typeof vertical === "object" ? vertical : {})}
				/>
			) : null}
		</div>
	);
};
