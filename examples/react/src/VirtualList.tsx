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
		<>
			<VerticalScrollBar
				container={parentRef}
				style={{
					width: 10,
					backgroundColor: "black",
					zIndex: 1000,
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
		</>
	);
}
