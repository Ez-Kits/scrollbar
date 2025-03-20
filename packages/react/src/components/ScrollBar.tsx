import { useMemo, useState, type HTMLAttributes } from "react";
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
		<div {...props}>
			<div
				style={{
					overflow: "auto",
					height: "100%",
					width: "100%",
					scrollbarWidth: "none",
				}}
				ref={debounceUpdateContainer}
			>
				{children}
			</div>
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
