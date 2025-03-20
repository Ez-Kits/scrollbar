import { useRef, type HTMLAttributes, type RefObject } from "react";
import { useHorizontalScrollBar } from "src/hooks/useHorizontalScrollBar";
import { maybeRefToValue } from "src/utilities";

export type HorizontalScrollBarProps = {
	trackProps?: HTMLAttributes<HTMLDivElement>;
	thumbProps?: HTMLAttributes<HTMLDivElement>;
};

export type HorizontalScrollBarWithContainerProps = HorizontalScrollBarProps & {
	container?: HTMLElement | RefObject<HTMLElement | null | undefined>;
};

export const HorizontalScrollBar = ({
	container,
	trackProps,
	thumbProps,
}: HorizontalScrollBarWithContainerProps) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	useHorizontalScrollBar({
		getContainerElement: () => maybeRefToValue(container),
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
	});

	return (
		<div ref={trackRef} {...trackProps}>
			<div ref={thumbRef} {...thumbProps} />
		</div>
	);
};
