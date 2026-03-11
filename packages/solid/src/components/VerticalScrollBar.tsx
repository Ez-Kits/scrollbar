import type { ScrollBarOptions } from "@ez-kits/scrollbar-core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createVerticalScrollBar } from "src/utilities";

export type VerticalScrollBarProps = {
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
} & Partial<
	Pick<
		ScrollBarOptions,
		| "getElementsToAttachScrollBarStateTo"
		| "shouldAttachScrollBarStateToContainer"
	>
>;

export type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement | null;
};

export const VerticalScrollBar = (
	props: VerticalScrollBarWithContainerProps,
) => {
	let thumbRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;
	const [options] = splitProps(props, [
		"getElementsToAttachScrollBarStateTo",
		"shouldAttachScrollBarStateToContainer",
	]);

	createVerticalScrollBar({
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
