import type { JSX } from "solid-js/jsx-runtime";
import { createHorizontalScrollBar } from "src/utilities";

export type HorizontalScrollBarProps = {
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
};

export type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | null;
};

export const HorizontalScrollBar = (
	props: HorizontalScrollBarWithContainerProps
) => {
	let thumbRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;

	createHorizontalScrollBar({
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
