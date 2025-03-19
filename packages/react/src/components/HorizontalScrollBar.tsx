import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { WithoutTrackProps, WithTrackProps } from "src/types";
import { maybeRefToValue } from "src/utilities";

export type HorizontalScrollBarProps = Omit<
	Partial<ScrollBarOptions>,
	"thumb" | "track" | "container"
> &
	(WithTrackProps | WithoutTrackProps);

export type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | RefObject<HTMLElement | null | undefined>;
};

export const HorizontalScrollBar = ({
	container,
	autoHide = true,
	startOffset,
	endOffset,
	withTrack = false,
	thumbProps = {},
	trackProps = {},
	...props
}: HorizontalScrollBarWithContainerProps) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	const [scrollBarInstance] = useState(
		() =>
			new HorizontalScrollBarInstance({
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
			<div {...props} ref={trackRef} {...trackProps}>
				<div ref={thumbRef} {...thumbProps} />
			</div>
		);
	}

	return <div {...props} ref={thumbRef} />;
};
