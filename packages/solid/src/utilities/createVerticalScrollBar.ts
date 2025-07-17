import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import { createEffect, onCleanup, onMount } from "solid-js";
import type { ToMaybeAccessorObject } from "src/types";
import { getValueFromAccessor } from "src/utilities/accessor";

export function createVerticalScrollBar(
	options: Partial<ToMaybeAccessorObject<ScrollBarOptions>>
) {
	const verticalScrollBarInstance = new VerticalScrollBarInstance({
		...options,
		shouldAttachScrollBarStateToContainer: getValueFromAccessor(
			options.shouldAttachScrollBarStateToContainer
		),
	});

	createEffect(() => {
		verticalScrollBarInstance.updateOptions({
			...options,
			shouldAttachScrollBarStateToContainer: getValueFromAccessor(
				options.shouldAttachScrollBarStateToContainer
			),
		});
	});

	onMount(() => {
		verticalScrollBarInstance.mount();
	});

	onCleanup(() => {
		verticalScrollBarInstance.unmount();
	});

	return verticalScrollBarInstance;
}
