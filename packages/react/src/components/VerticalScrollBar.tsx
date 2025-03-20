import { useRef, type HTMLAttributes, type RefObject } from "react";
import { useVerticalScrollBar } from "src/hooks/useVerticalScrollBar";
import { maybeRefToValue } from "src/utilities";

export type VerticalScrollBarProps = {
	trackProps?: HTMLAttributes<HTMLDivElement>;
	thumbProps?: HTMLAttributes<HTMLDivElement>;
};

export type VerticalScrollBarWithContainerProps = VerticalScrollBarProps & {
	container?: HTMLElement | RefObject<HTMLElement | null | undefined>;
};

export const VerticalScrollBar = ({
	container,
	thumbProps,
	trackProps,
}: VerticalScrollBarWithContainerProps) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	useVerticalScrollBar({
		getContainerElement: () => maybeRefToValue(container),
		getTrackElement: () => trackRef.current,
		getThumbElement: () => thumbRef.current,
	});

	return (
		<div {...trackProps} ref={trackRef}>
			<div {...thumbProps} ref={thumbRef} />
		</div>
	);
};
