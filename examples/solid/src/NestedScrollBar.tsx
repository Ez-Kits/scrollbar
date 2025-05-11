import { ScrollBar } from "@ez-kits/scrollbar-solid";
import { For } from "solid-js";

export function NestedScrollBar() {
	return (
		<ScrollBar
			style={{
				height: "600px",
				width: "600px",
				"padding-right": "10px",
				"overflow-y": "auto",
				position: "relative",
				"scrollbar-width": "none",
				"white-space": "nowrap",
			}}
			scrollerProps={{
				style: {
					overflow: "auto",
					"scrollbar-width": "none",
					height: "100%",
					width: "100%",
				},
			}}
			vertical={{
				thumbProps: {
					class: "bg-gray-500 absolute top-0 w-2 min-h-4",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				},
				trackProps: {
					class: "bg-black absolute right-0 top-0 bottom-0 w-2",
				},
			}}
			horizontal={{
				thumbProps: {
					class: "bg-gray-500 absolute left-0 right-0 bottom-0 h-2",
					style: {
						transform: "translateX(var(--thumb-offset))",
						width: "var(--thumb-size)",
					},
				},
				trackProps: {
					class: "bg-black absolute left-0 right-0 bottom-0 h-2",
				},
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
			<For each={Array(5).fill(null)}>
				{() => (
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						tempore doloribus numquam? Maiores nostrum quisquam officia modi
						quis, dolore dignissimos provident consequatur explicabo dicta
						pariatur assumenda ullam dolor vero repudiandae!
					</p>
				)}
			</For>

			<ScrollBar
				style={{
					height: "300px",
					width: "300px",
					"scrollbar-width": "none",
					position: "relative",
				}}
				scrollerProps={{
					style: {
						overflow: "auto",
						"scrollbar-width": "none",
						height: "100%",
						width: "100%",
					},
				}}
				vertical={{
					thumbProps: {
						class:
							"bg-gray-500 absolute top-0 w-2 min-h-25 group-data-[is-dragging-thumb]:bg-gray-700",
						style: {
							transform: "translateY(var(--thumb-offset))",
							height: "var(--thumb-size)",
						},
					},
					trackProps: {
						class:
							"group bg-black absolute right-0 top-0 bottom-0 w-2 overflow-hidden",
					},
				}}
				horizontal={{
					thumbProps: {
						class:
							"bg-gray-500 absolute left-0 right-0 bottom-0 h-2 group-data-[is-dragging-thumb]:bg-gray-700",
						style: {
							transform: "translateX(var(--thumb-offset))",
							width: "var(--thumb-size)",
						},
					},
					trackProps: {
						class: "group bg-black absolute left-0 right-0 bottom-0 h-2",
					},
				}}
			>
				<For each={Array(50).fill(null)}>
					{() => (
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
							tempore doloribus numquam? Maiores nostrum quisquam officia modi
							quis, dolore dignissimos provident consequatur explicabo dicta
							pariatur assumenda ullam dolor vero repudiandae!
						</p>
					)}
				</For>
			</ScrollBar>

			<For each={Array(5).fill(null)}>
				{() => (
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
				)}
			</For>
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
