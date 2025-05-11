import { createSignal, type JSX } from "solid-js";
import {
	HorizontalScrollBar,
	type HorizontalScrollBarProps,
} from "./HorizontalScrollBar";
import {
	VerticalScrollBar,
	type VerticalScrollBarProps,
} from "./VerticalScrollBar";

export interface ScrollBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
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

	/**
	 * Props for the scroller element
	 */
	scrollerProps?: JSX.HTMLAttributes<HTMLDivElement>;
}

export const ScrollBar = ({
	children,
	vertical = true,
	horizontal = true,
	scrollerProps,
	...props
}: ScrollBarProps) => {
	const [container, setContainer] = createSignal<HTMLDivElement>();

	return (
		<div {...props}>
			<div
				{...scrollerProps}
				ref={(el) => {
					setContainer(el);
				}}
			>
				{children}
			</div>
			{horizontal ? (
				<HorizontalScrollBar
					container={container()}
					{...(typeof horizontal === "object" ? horizontal : {})}
				/>
			) : null}
			{vertical ? (
				<VerticalScrollBar
					container={container()}
					{...(typeof vertical === "object" ? vertical : {})}
				/>
			) : null}
		</div>
	);
};
