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
	ref?: Ref<HTMLDivElement | null>;
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
	ref,
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
			debounceUpdateContainer(el);
			if (!ref) {
				return;
			}

			if (typeof ref === "function") {
				ref(el);
			} else {
				(ref as MutableRefObject<HTMLDivElement | null>).current = el;
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
