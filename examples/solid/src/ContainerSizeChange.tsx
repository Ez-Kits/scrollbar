import { ScrollBar } from "@ez-kits/scrollbar-solid";
import { createEffect, createSignal, For } from "solid-js";

export function ContainerSizeChange() {
	const [containerSize, setContainerSize] = createSignal(300);

	createEffect(() => {
		const timer = setInterval(() => {
			setContainerSize(300 + Math.random() * 200);
		}, 1000);

		return () => clearInterval(timer);
	});

	return (
		<ScrollBar
			style={{
				height: `${containerSize()}px`,
				width: `${containerSize()}px`,
				overflow: "auto",
				"scrollbar-width": "none",
				"white-space": "nowrap",
				"margin-left": "500px",
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
				trackProps: {
					class: "w-1.5 bg-black absolute top-0 !right-0 left-auto h-full",
				},
				thumbProps: {
					class: "bg-gray-500 absolute top-0 !right-0 left-auto w-full",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				},
			}}
			horizontal={{
				trackProps: {
					class: "bg-black absolute bottom-0 !left-0 !right-auto w-full h-2",
				},
				thumbProps: {
					class: "bg-gray-500 absolute bottom-0 !left-0 !right-auto w-full h-2",
					style: {
						transform: "translateX(var(--thumb-offset))",
						width: "var(--thumb-size)",
					},
				},
			}}
		>
			<For each={Array(50).fill(null)}>
				{(_, index) => (
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						tempore doloribus numquam? Maiores nostrum quisquam officia modi
						quis, dolore dignissimos provident consequatur explicabo dicta
						pariatur assumenda ullam dolor vero repudiandae!
					</p>
				)}
			</For>
		</ScrollBar>
	);
}
