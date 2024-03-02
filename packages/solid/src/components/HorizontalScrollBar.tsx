import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { createEffect, onCleanup, type JSX } from "solid-js";

export interface HorizontalScrollBarProps
	extends Omit<Partial<ScrollBarOptions>, "scrollBar" | "container">,
		JSX.HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement;
}

export const HorizontalScrollBar = (props: HorizontalScrollBarProps) => {
	let scrollBarRef: HTMLDivElement | undefined;

	const scrollBarInstance = new HorizontalScrollBarInstance({
		container: props.container,
		autoHide: props.autoHide,
		updateStyle: props.updateStyle,
		scrollBar: scrollBarRef,
		startOffset: props.startOffset,
		endOffset: props.endOffset,
	});

	createEffect(() => {
		scrollBarInstance.updateOptions({
			container: props.container,
			autoHide: props.autoHide,
			updateStyle: props.updateStyle,
			scrollBar: scrollBarRef,
			startOffset: props.startOffset,
			endOffset: props.endOffset,
		});

		onCleanup(() => {
			scrollBarInstance.unmount();
		});
	});

	return <div {...props} ref={scrollBarRef}></div>;
};
