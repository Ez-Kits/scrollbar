"use client";

import type { ScrollBarOptions } from "@ez-kits/scrollbar-core";
import { useRef, type HTMLAttributes, type RefObject } from "react";
import { useVerticalScrollBar } from "src/hooks";
import { maybeRefToValue } from "src/utilities";

export type VerticalScrollBarProps = {
	trackProps?: HTMLAttributes<HTMLDivElement>;
	thumbProps?: HTMLAttributes<HTMLDivElement>;
} & Partial<
	Pick<
		ScrollBarOptions,
		| "getElementsToAttachScrollBarStateTo"
		| "shouldAttachScrollBarStateToContainer"
	>
>;

export type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement | null | RefObject<HTMLElement | null | undefined>;
};

export const VerticalScrollBar = ({
	container,
	thumbProps,
	trackProps,
	...options
}: VerticalScrollBarWithContainerProps) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	useVerticalScrollBar({
		getContainerElement: () => maybeRefToValue(container),
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
		...options,
	});

	return (
		<div {...trackProps} ref={trackRef}>
			<div {...thumbProps} ref={thumbRef} />
		</div>
	);
};
