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
			scrollerProps={{
				style: {
					overflow: "auto",
					scrollbarWidth: "none",
					height: "100%",
					width: "100%",
				},
			}}
			vertical={{
				thumbProps: {
					className: "bg-gray-500 absolute top-0 w-2 min-h-4",
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
					className: "bg-gray-500 absolute left-0 right-0 bottom-0 h-2",
					style: {
						transform: "translateX(var(--thumb-offset))",
						width: "var(--thumb-size)",
					},
				},
				trackProps: {
					className: "bg-black absolute left-0 right-0 bottom-0 h-2",
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
					scrollbarWidth: "none",
					position: "relative",
				}}
				scrollerProps={{
					style: {
						overflow: "auto",
						scrollbarWidth: "none",
						height: "100%",
						width: "100%",
					},
				}}
				vertical={{
					thumbProps: {
						className:
							"bg-gray-500 absolute top-0 w-2 min-h-25 group-data-[is-dragging-thumb]:bg-gray-700",
						style: {
							transform: "translateY(var(--thumb-offset))",
							height: "var(--thumb-size)",
						},
					},
					trackProps: {
						className:
							"group bg-black absolute right-0 top-0 bottom-0 w-2 overflow-hidden",
					},
				}}
				horizontal={{
					thumbProps: {
						className:
							"bg-gray-500 absolute left-0 right-0 bottom-0 h-2 group-data-[is-dragging-thumb]:bg-gray-700",
						style: {
							transform: "translateX(var(--thumb-offset))",
							width: "var(--thumb-size)",
						},
					},
					trackProps: {
						className: "group bg-black absolute left-0 right-0 bottom-0 h-2",
					},
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
