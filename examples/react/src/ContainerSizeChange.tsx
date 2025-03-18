import { useState } from "react";

import { ScrollBar } from "@ez-kits/scrollbar-react";
import { useEffect } from "react";

export function ContainerSizeChange() {
	const [containerSize, setContainerSize] = useState(300);

	useEffect(() => {
		const timer = setInterval(() => {
			setContainerSize(300 + Math.random() * 200);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative inline-block">
			<ScrollBar
				style={{
					height: containerSize,
					width: containerSize,
					overflow: "auto",
					scrollbarWidth: "none",
					whiteSpace: "nowrap",
					marginLeft: 500,
					border: "4px solid black",
				}}
				// vertical={{
				// 	style: {
				// 		backgroundColor: "gray",
				// 		width: 5,
				// 	},
				// 	startOffset: 50,
				// 	endOffset: 50,
				// }}
				// horizontal={{
				// 	startOffset: 50,
				// 	endOffset: 50,
				// 	style: {
				// 		height: 5,
				// 		backgroundColor: "gray",
				// 	},
				// }}
				vertical={{
					startOffset: 50,
					endOffset: 50,
					trackProps: {
						className:
							"!w-1.5 bg-blue-500 !absolute !top-[50px] !right-0 !left-auto",
						// style: {
						// 	width: 5,
						// 	backgroundColor: "blue",
						// },
					},
					thumbProps: {
						style: {
							backgroundColor: "gray",
							width: 5,
						},
					},
					withTrack: true,
				}}
				horizontal={{
					startOffset: 50,
					endOffset: 50,
					trackProps: {
						style: {
							height: 5,
						},
					},
					thumbProps: {
						style: {
							backgroundColor: "gray",
							height: 5,
						},
					},
					withTrack: true,
				}}
			>
				{Array(50)
					.fill(null)
					.map((_, index) => (
						<p key={index}>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
							tempore doloribus numquam? Maiores nostrum quisquam officia modi
							quis, dolore dignissimos provident consequatur explicabo dicta
							pariatur assumenda ullam dolor vero repudiandae!
						</p>
					))}
			</ScrollBar>
		</div>
	);
}
