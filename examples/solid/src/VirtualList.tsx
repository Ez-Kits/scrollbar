import { VerticalScrollBar } from "@ez-kits/scrollbar-solid";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { createSignal } from "solid-js";

export function VirtualList() {
	const [container, setContainer] = createSignal<HTMLDivElement>();
	let parentEl: HTMLDivElement | null = null;

	const rowVirtualizer = createVirtualizer({
		count: 100,
		getScrollElement: () => parentEl,
		estimateSize: () => 35,
		overscan: 5,
	});

	return (
		<div class="relative w-100">
			<VerticalScrollBar
				container={container()}
				thumbProps={{
					class: "bg-gray-500 absolute top-0 w-2 min-h-4",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				}}
				trackProps={{
					class: "bg-black absolute right-0 top-0 bottom-0 w-2 z-10",
				}}
			/>
			<div
				ref={(el) => {
					setContainer(el);
					parentEl = el;
				}}
				class="List"
				style={{
					height: `200px`,
					width: `400px`,
					overflow: "auto",
					"scrollbar-width": "none",
					position: "relative",
				}}
			>
				<div
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
				>
					{rowVirtualizer.getVirtualItems().map((virtualRow) => (
						<div
							class={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: `${virtualRow.size}px`,
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							Row {virtualRow.index}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
