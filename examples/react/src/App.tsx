import { ScrollBar } from "@ez-kits/scrollbar-react";
import { VirtualList } from "./VirtualList";
const App = () => {
	return <VirtualList />;
	return (
		<ScrollBar
			style={{
				height: "100dvh",
				width: "100dvw",
				overflowY: "auto",
				position: "relative",
				scrollbarWidth: "none",
				whiteSpace: "nowrap",
			}}
			vertical={{
				style: {
					backgroundColor: "black",
					width: 5,
				},
				startOffset: 50,
				endOffset: 50,
			}}
			horizontal={{
				style: {
					backgroundColor: "black",
					height: 5,
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
					position: "relative",
					scrollbarWidth: "none",
					whiteSpace: "nowrap",
					marginLeft: 500,
					border: "4px solid black",
				}}
				vertical={{
					style: {
						backgroundColor: "gray",
						width: 5,
					},
					startOffset: 50,
					endOffset: 50,
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
};

export default App;
