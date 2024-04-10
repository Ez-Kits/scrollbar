import {
	VerticalScrollBarInstance,
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

export interface VerticalScrollBarProps
	extends Omit<Partial<ScrollBarOptions>, "scrollBar" | "container">,
		HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement | RefObject<HTMLElement | null | undefined>;
}

export const VerticalScrollBar = ({
	container,
	startOffset,
	endOffset,
	autoHide = true,
	...props
}: VerticalScrollBarProps) => {
	const scrollBarRef = useRef<HTMLDivElement>(null);

	const [scrollBarInstance] = useState(
		() =>
			new VerticalScrollBarInstance({
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
		scrollBarInstance.updateOptions({
			container: maybeRefToValue(container) || undefined,
			scrollBar: scrollBarRef.current || undefined,
			startOffset,
			endOffset,
			autoHide,
		});

		return () => {
			scrollBarInstance.unmount();
		};
	}, []);

	return <div {...props} ref={scrollBarRef}></div>;
};
