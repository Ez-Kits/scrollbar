import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { createEffect, onCleanup, type JSX } from "solid-js";

export interface VerticalScrollBarProps
	extends Omit<Partial<ScrollBarOptions>, "scrollBar" | "container">,
		JSX.HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement;
}

export const VerticalScrollBar = (props: VerticalScrollBarProps) => {
	let scrollBarRef: HTMLDivElement | undefined;

	const scrollBarInstance = new VerticalScrollBarInstance({
		container: props.container,
		autoHide: props.autoHide,
		scrollBar: scrollBarRef,
		startOffset: props.startOffset,
		endOffset: props.endOffset,
	});
	scrollBarInstance.mount();
	onCleanup(() => {
		scrollBarInstance.unmount();
	});

	createEffect(() => {
		scrollBarInstance.updateOptions({
			container: props.container,
			autoHide: props.autoHide,
			scrollBar: scrollBarRef,
			startOffset: props.startOffset,
			endOffset: props.endOffset,
		});
	});

	return <div {...props} ref={scrollBarRef}></div>;
};
