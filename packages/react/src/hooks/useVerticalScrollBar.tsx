import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { useEffect, useState } from "react";

export function useVerticalScrollBar(options: ScrollBarOptions) {
	const [verticalScrollBarInstance] = useState<VerticalScrollBarInstance>(
		() => {
			return new VerticalScrollBarInstance(options);
		}
	);

	verticalScrollBarInstance.updateOptions(options);

	useEffect(() => {
		verticalScrollBarInstance.mount();

		return () => {
			verticalScrollBarInstance.unmount();
		};
	}, [verticalScrollBarInstance]);

	return verticalScrollBarInstance;
}
