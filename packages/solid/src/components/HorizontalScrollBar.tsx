import type { ScrollBarOptions } from "@ez-kits/scrollbar-core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createHorizontalScrollBar } from "src/utilities";

export type HorizontalScrollBarProps = {
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
} & Partial<
	Pick<
		ScrollBarOptions,
		| "getElementsToAttachScrollBarStateTo"
		| "shouldAttachScrollBarStateToContainer"
	>
>;

export type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | null;
};

export const HorizontalScrollBar = (
	props: HorizontalScrollBarWithContainerProps,
) => {
	let thumbRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;
	const [options] = splitProps(props, [
		"getElementsToAttachScrollBarStateTo",
		"shouldAttachScrollBarStateToContainer",
	]);

	createHorizontalScrollBar({
		getContainerElement: () => props.container,
		getTrackElement: () => trackRef,
		getThumbElement: () => thumbRef,
		...options,
	});

	return (
		<div {...props.trackProps} ref={trackRef}>
			<div {...props.thumbProps} ref={thumbRef} />
		</div>
	);
};
