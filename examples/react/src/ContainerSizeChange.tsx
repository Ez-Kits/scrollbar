import { ScrollBar } from "@ez-kits/scrollbar-react";
import { useEffect, useState } from "react";

export function ContainerSizeChange() {
	const [containerSize, setContainerSize] = useState(300);

	useEffect(() => {
		const timer = setInterval(() => {
			setContainerSize(300 + Math.random() * 200);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<ScrollBar
			style={{
				height: containerSize,
				width: containerSize,
				overflow: "auto",
				scrollbarWidth: "none",
				whiteSpace: "nowrap",
				marginLeft: 500,
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
				trackProps: {
					className: "w-1.5 bg-black absolute top-0 !right-0 left-auto h-full",
				},
				thumbProps: {
					className: "bg-gray-500 absolute top-0 !right-0 left-auto w-full",
					style: {
						transform: "translateY(var(--thumb-offset))",
						height: "var(--thumb-size)",
					},
				},
			}}
			horizontal={{
				trackProps: {
					className:
						"bg-black absolute bottom-0 !left-0 !right-auto w-full h-2",
				},
				thumbProps: {
					className:
						"bg-gray-500 absolute bottom-0 !left-0 !right-auto w-full h-2",
					style: {
						transform: "translateX(var(--thumb-offset))",
						width: "var(--thumb-size)",
					},
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
	);
}
