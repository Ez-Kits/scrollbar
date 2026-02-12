import { useMemo, useState, type HTMLAttributes, type MutableRefObject, type Ref } from "react";
import { debounce } from "src/utilities";
import {
	HorizontalScrollBar,
	type HorizontalScrollBarProps,
} from "./HorizontalScrollBar";
import {
	VerticalScrollBar,
	type VerticalScrollBarProps,
} from "./VerticalScrollBar";

export interface ScrollBarProps extends HTMLAttributes<HTMLDivElement> {
	containerRef?: Ref<HTMLDivElement | null>;
	/**
	 * Horizontal scrollbar props
	 * @default true
	 */
	horizontal?: boolean | HorizontalScrollBarProps;

	/**
	 * Vertical scrollbar props
	 * @default true
	 */
	vertical?: boolean | VerticalScrollBarProps;
}

export const ScrollBar = ({
	children,
	vertical = true,
	horizontal = true,
	containerRef,
	...props
}: ScrollBarProps) => {
	const [container, setContainer] = useState<HTMLDivElement>();

	const debounceUpdateContainer = useMemo(
		() =>
			debounce((el: HTMLDivElement | null): void => {
				setContainer(el || undefined);
			}, 100),
		[]
	);

	return (
		<div {...props} ref={(el) => {
			console.log("elll", containerRef)
			debounceUpdateContainer(el);
			if (!containerRef) {
				return;
			}
			
			if (typeof containerRef === "function") {
				containerRef(el);
			} else {
				(containerRef as MutableRefObject<HTMLDivElement | null>).current = el;
			}
		}}>
			{children}
			{horizontal ? (
				<HorizontalScrollBar
					container={container}
					{...(typeof horizontal === "object" ? horizontal : {})}
				/>
			) : null}
			{vertical ? (
				<VerticalScrollBar
					container={container}
					{...(typeof vertical === "object" ? vertical : {})}
				/>
			) : null}
		</div>
	);
};
