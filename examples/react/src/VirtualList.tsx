import { VerticalScrollBar } from "@ez-kits/scrollbar-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export function VirtualList() {
	const parentRef = useRef(null);

	const rowVirtualizer = useVirtualizer({
		count: 100,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
		overscan: 5,
	});

	return (
		<div className="relative w-100">
			<VerticalScrollBar
				container={parentRef}
				thumbProps={{
					className: "bg-gray-500 absolute top-0 w-2 min-h-4",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				}}
				trackProps={{
					className: "bg-black absolute right-0 top-0 bottom-0 w-2 z-10",
				}}
			/>
			<div
				ref={parentRef}
				className="List"
				style={{
					height: `200px`,
					width: `400px`,
					overflow: "auto",
					scrollbarWidth: "none",
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
							key={virtualRow.index}
							className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
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
