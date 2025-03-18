import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { WithoutTrackProps, WithTrackProps } from "src/types";
import { maybeRefToValue } from "src/utilities";

export type VerticalScrollBarProps = Omit<
	Partial<ScrollBarOptions>,
	"thumb" | "track" | "container"
> &
	(WithTrackProps | WithoutTrackProps);

export type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement | RefObject<HTMLElement | null | undefined>;
};

export const VerticalScrollBar = ({
	container,
	startOffset,
	endOffset,
	autoHide = true,
	withTrack = false,
	thumbProps = {},
	trackProps = {},
	...props
}: VerticalScrollBarWithContainerProps) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	const [scrollBarInstance] = useState(
		() =>
			new VerticalScrollBarInstance({
				container: maybeRefToValue(container) || undefined,
				thumb: thumbRef.current || undefined,
				track: trackRef.current || undefined,
				startOffset,
				endOffset,
				autoHide,
			})
	);

	scrollBarInstance.updateOptions({
		container: maybeRefToValue(container) || undefined,
		thumb: thumbRef.current || undefined,
		track: trackRef.current || undefined,
		startOffset,
		endOffset,
		autoHide,
	});

	useEffect(() => {
		return scrollBarInstance.mount();
	}, [scrollBarInstance]);

	if (withTrack) {
		return (
			<div {...trackProps} ref={trackRef}>
				<div {...thumbProps} ref={thumbRef} />
			</div>
		);
	}

	return <div {...props} ref={thumbRef}></div>;
};
