import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import type { ToMaybeRefObject } from "src/types";
import { computed, onBeforeUnmount, onMounted, toValue, watch } from "vue";

export function useVerticalScrollBar(
	options: Partial<ToMaybeRefObject<ScrollBarOptions>>
) {
	const computedOptions = computed(() => ({
		...options,
		shouldAttachScrollBarStateToContainer: toValue(
			options.shouldAttachScrollBarStateToContainer
		),
	}));
	const verticalScrollBarInstance = new VerticalScrollBarInstance(
		computedOptions.value
	);

	watch(
		() => computedOptions.value,
		(value) => {
			verticalScrollBarInstance.updateOptions(value);
		}
	);

	onMounted(() => {
		verticalScrollBarInstance.mount();
	});

	onBeforeUnmount(() => {
		verticalScrollBarInstance.unmount();
	});

	return verticalScrollBarInstance;
}
