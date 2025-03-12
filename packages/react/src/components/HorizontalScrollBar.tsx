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
			})
	);

	scrollBarInstance.updateOptions({
		container: maybeRefToValue(container) || undefined,
		scrollBar: scrollBarRef.current || undefined,
		startOffset,
		endOffset,
		autoHide,
	});

	useEffect(() => {
		return scrollBarInstance.mount();
	}, [scrollBarInstance]);

	return <div {...props} ref={scrollBarRef} />;
};
