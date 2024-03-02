import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import {
	useEffect,
	useRef,
	useState,
	type HTMLAttributes,
	type RefObject,
} from "react";
import { maybeRefToValue } from "src/utilities";

export interface HorizontalScrollBarProps
	extends Omit<Partial<ScrollBarOptions>, "scrollBar" | "container">,
		HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement | RefObject<HTMLElement | null | undefined>;
}

export const HorizontalScrollBar = ({
	container,
	autoHide = true,
	startOffset,
	endOffset,
	updateStyle,
	...props
}: HorizontalScrollBarProps) => {
	const scrollBarRef = useRef<HTMLDivElement>(null);

	const [scrollBarInstance] = useState(
		() =>
			new HorizontalScrollBarInstance({
				container: maybeRefToValue(container) || undefined,
				scrollBar: scrollBarRef.current || undefined,
				startOffset,
				endOffset,
				autoHide,
				updateStyle,
			})
	);

	scrollBarInstance.updateOptions({
		container: maybeRefToValue(container) || undefined,
		scrollBar: scrollBarRef.current || undefined,
		startOffset,
		endOffset,
		autoHide,
		updateStyle,
	});

	useEffect(() => {
		return () => {
			scrollBarInstance.unmount();
		};
	}, []);

	return <div {...props} ref={scrollBarRef} />;
};
