import { ScrollBar } from "@ez-kits/scrollbar-solid";

export function NestedScrollBar() {
	return (
		<ScrollBar
			style={{
				height: "600px",
				width: "600px",
				"overflow-y": "auto",
				position: "relative",
				"scrollbar-width": "none",
				"white-space": "nowrap",
			}}
			vertical={{
				style: {
					"background-color": "black",
					width: "5px",
				},
				startOffset: 50,
				endOffset: 50,
			}}
			horizontal={{
				style: {
					"background-color": "black",
					height: "5px",
				},
				startOffset: 50,
				endOffset: 50,
			}}
		>
			<p
				style={{
					position: "sticky",
					top: 0,
					left: 0,
					background: "gray",
					height: "50px",
					margin: 0,
					overflow: "hidden",
					"max-width": "100%",
				}}
			>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			{Array(5)
				.fill(null)
				.map((_, index) => (
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						tempore doloribus numquam? Maiores nostrum quisquam officia modi
						quis, dolore dignissimos provident consequatur explicabo dicta
						pariatur assumenda ullam dolor vero repudiandae!
					</p>
				))}

			<ScrollBar
				style={{
					height: "300px",
					width: "300px",
					overflow: "auto",
					"scrollbar-width": "none",
				}}
				vertical={{
					style: {
						"background-color": "black",
						width: "5px",
					},
				}}
				horizontal={{
					style: {
						"background-color": "black",
						height: "5px",
					},
				}}
			>
				{Array(50)
					.fill(null)
					.map((_, index) => (
						<p
							style={{
								"overflow-x": "hidden",
							}}
						>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
							tempore doloribus numquam? Maiores nostrum quisquam officia modi
							quis, dolore dignissimos provident consequatur explicabo dicta
							pariatur assumenda ullam dolor vero repudiandae!
						</p>
					))}
			</ScrollBar>

			{Array(5)
				.fill(null)
				.map((_, index) => (
					<p
						style={{
							"overflow-x": "hidden",
						}}
					>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						tempore doloribus numquam? Maiores nostrum quisquam officia modi
						quis, dolore dignissimos provident consequatur explicabo dicta
						pariatur assumenda ullam dolor vero repudiandae!
					</p>
				))}
			<p
				style={{
					position: "sticky",
					bottom: 0,
					left: 0,
					background: "gray",
					height: "50px",
					margin: 0,
					overflow: "hidden",
				}}
			>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
		</ScrollBar>
	);
}
