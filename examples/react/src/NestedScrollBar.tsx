import { ScrollBar } from "@ez-kits/scrollbar-react";

export function NestedScrollBar() {
	return (
		<ScrollBar
			style={{
				height: 600,
				width: 600,
				paddingRight: 10,
				overflowY: "auto",
				position: "relative",
				scrollbarWidth: "none",
				whiteSpace: "nowrap",
			}}
			vertical={{
				thumbProps: {
					className: "bg-gray-500 absolute top-0 w-1.25 min-h-4",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				},
				trackProps: {
					className: "bg-black absolute right-0 top-0 bottom-0 w-2",
				},
			}}
			horizontal={{
				thumbProps: {
					className: "bg-black absolute left-0 right-0 bottom-0 h-1",
				},
				trackProps: {
					className: "bg-black absolute left-0 right-0 bottom-0 h-1",
				},
			}}
		>
			<p
				style={{
					position: "sticky",
					top: 0,
					left: 0,
					background: "gray",
					height: 50,
					margin: 0,
					overflow: "hidden",
					maxWidth: "100%",
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
					<p key={index}>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						tempore doloribus numquam? Maiores nostrum quisquam officia modi
						quis, dolore dignissimos provident consequatur explicabo dicta
						pariatur assumenda ullam dolor vero repudiandae!
					</p>
				))}

			<ScrollBar
				style={{
					height: 300,
					width: 300,
					overflow: "auto",
					scrollbarWidth: "none",
				}}
				vertical={{
					style: {
						backgroundColor: "black",
						width: 5,
					},
				}}
				horizontal={{
					style: {
						backgroundColor: "black",
						height: 5,
					},
				}}
			>
				{Array(50)
					.fill(null)
					.map((_, index) => (
						<p
							key={index}
							style={{
								overflowX: "hidden",
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
						key={index}
						style={{
							overflowX: "hidden",
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
					height: 50,
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
