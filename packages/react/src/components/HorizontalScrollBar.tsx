"use client";

import type { ScrollBarOptions } from "@ez-kits/scrollbar-core";
import { useRef, type HTMLAttributes, type RefObject } from "react";
import { useHorizontalScrollBar } from "src/hooks";
import { maybeRefToValue } from "src/utilities";

export type HorizontalScrollBarProps = {
	trackProps?: HTMLAttributes<HTMLDivElement>;
	thumbProps?: HTMLAttributes<HTMLDivElement>;
} & Partial<
	Pick<
		ScrollBarOptions,
		| "getElementsToAttachScrollBarStateTo"
		| "shouldAttachScrollBarStateToContainer"
	>
>;

export type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | null | RefObject<HTMLElement | null | undefined>;
};

export const HorizontalScrollBar = ({
	container,
	trackProps,
	thumbProps,
	...options
}: HorizontalScrollBarWithContainerProps) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	useHorizontalScrollBar({
		getContainerElement: () => maybeRefToValue(container),
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
		...options,
	});

	return (
		<div ref={trackRef} {...trackProps}>
			<div ref={thumbRef} {...thumbProps} />
		</div>
	);
};
