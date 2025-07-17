import type { JSX } from "solid-js/jsx-runtime";
import { createVerticalScrollBar } from "src/utilities";

export type VerticalScrollBarProps = {
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
};

export type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement | null;
};

export const VerticalScrollBar = (
	props: VerticalScrollBarWithContainerProps
) => {
	let thumbRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;

	createVerticalScrollBar({
		getContainerElement: () => props.container,
		getTrackElement: () => trackRef,
		getThumbElement: () => thumbRef,
	});

	return (
		<div {...props.trackProps} ref={trackRef}>
			<div {...props.thumbProps} ref={thumbRef} />
		</div>
	);
};
