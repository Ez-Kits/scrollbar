import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { createEffect, onCleanup } from "solid-js";
import type { WithoutTrackProps, WithTrackProps } from "src/types";

export type VerticalScrollBarProps = Omit<
	Partial<ScrollBarOptions>,
	"thumb" | "track" | "container"
> &
	(WithTrackProps | WithoutTrackProps);

export type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement;
};

export const VerticalScrollBar = (
	props: VerticalScrollBarWithContainerProps
) => {
	let thumbRef: HTMLDivElement | undefined;
	let trackRef: HTMLDivElement | undefined;

	const scrollBarInstance = new VerticalScrollBarInstance({
		container: props.container,
		autoHide: props.autoHide,
		thumb: thumbRef,
		track: trackRef,
		startOffset: props.startOffset,
		endOffset: props.endOffset,
	});
	scrollBarInstance.mount();
	onCleanup(() => {
		scrollBarInstance.unmount();
	});

	createEffect(() => {
		console.log("updateOptions", props);
		scrollBarInstance.updateOptions({
			container: props.container,
			autoHide: props.autoHide,
			thumb: thumbRef,
			track: trackRef,
			startOffset: props.startOffset,
			endOffset: props.endOffset,
		});
	});

	if (props.withTrack) {
		return (
			<div {...props.trackProps} ref={trackRef}>
				<div {...props.thumbProps} ref={thumbRef} />
			</div>
		);
	}

	return <div {...props} ref={thumbRef} />;
};
