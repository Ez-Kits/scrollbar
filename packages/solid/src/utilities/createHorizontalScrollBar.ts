import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { createEffect, onCleanup, onMount } from "solid-js";
import type { ToMaybeAccessorObject } from "src/types";
import { getValueFromAccessor } from "src/utilities/accessor";

export function createHorizontalScrollBar(
	options: Partial<ToMaybeAccessorObject<ScrollBarOptions>>
) {
	const horizontalScrollBarInstance = new HorizontalScrollBarInstance({
		...options,
		shouldAttachScrollBarStateToContainer: getValueFromAccessor(
			options.shouldAttachScrollBarStateToContainer
		),
	});

	createEffect(() => {
		horizontalScrollBarInstance.updateOptions({
			...options,
			shouldAttachScrollBarStateToContainer: getValueFromAccessor(
				options.shouldAttachScrollBarStateToContainer
			),
		});
	});

	onMount(() => {
		horizontalScrollBarInstance.mount();
	});

	onCleanup(() => {
		horizontalScrollBarInstance.unmount();
	});

	return horizontalScrollBarInstance;
}
