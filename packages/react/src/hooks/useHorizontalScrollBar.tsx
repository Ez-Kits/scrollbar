import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { useEffect, useState } from "react";

export function useHorizontalScrollBar(options: ScrollBarOptions) {
	const [horizontalScrollBarInstance] = useState<HorizontalScrollBarInstance>(
		() => {
			return new HorizontalScrollBarInstance(options);
		}
	);

	horizontalScrollBarInstance.updateOptions(options);

	useEffect(() => {
		horizontalScrollBarInstance.mount();

		return () => {
			horizontalScrollBarInstance.unmount();
		};
	}, [horizontalScrollBarInstance]);

	return horizontalScrollBarInstance;
}
