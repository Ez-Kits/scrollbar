import { ScrollBar } from "@ez-kits/scrollbar-solid";

export const ScrollBarPositionAbsolute = () => {
	return (
		<div class="relative inline-block">
			<ScrollBar
				style={{
					height: "300px",
					width: "300px",
					overflow: "auto",
					"scrollbar-width": "none",
					"white-space": "nowrap",
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
						class:
							"!w-1.5 bg-blue-500 !absolute !top-[50px] !right-1 !left-auto",
					},
					thumbProps: {
						style: {
							"background-color": "gray",
							width: "5px",
						},
					},
					withTrack: true,
				}}
				horizontal={{
					startOffset: 50,
					endOffset: 50,
					trackProps: {
						class:
							"!h-1.5 bg-blue-500 !absolute !top-auto !bottom-1 !left-[50px]",
						// style: {
						// 	height: 5,
						// },
					},
					thumbProps: {
						style: {
							"background-color": "gray",
							height: "5px",
						},
					},
					withTrack: true,
				}}
			>
				{Array(50)
					.fill(null)
					.map((_, index) => (
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
							tempore doloribus numquam? Maiores nostrum quisquam officia modi
							quis, dolore dignissimos provident consequatur explicabo dicta
							pariatur assumenda ullam dolor vero repudiandae!
						</p>
					))}
			</ScrollBar>
		</div>
	);
};
