import { ScrollBar } from "@ez-kits/scrollbar-solid";
import { createEffect, createSignal } from "solid-js";

export function ContainerSizeChange() {
	const [containerSize, setContainerSize] = createSignal(300);

	createEffect(() => {
		const timer = setInterval(() => {
			setContainerSize(300 + Math.random() * 200);
		}, 1000);

		return () => clearInterval(timer);
	});

	return (
		<div class="relative inline-block">
			<ScrollBar
				style={{
					height: `${containerSize()}px`,
					width: `${containerSize()}px`,
					overflow: "auto",
					"scrollbar-width": "none",
					"white-space": "nowrap",
					"margin-left": "500px",
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
							"!w-1.5 bg-blue-500 !absolute !top-[50px] !right-0 !left-auto",
						// style: {
						// 	width: 5,
						// 	backgroundColor: "blue",
						// },
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
						style: {
							height: "5px",
						},
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
					.map(() => (
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
}
