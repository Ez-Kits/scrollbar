import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@ez-kits/scrollbar-core";
import type { ToMaybeRefObject } from "src/types";
import { computed, onBeforeMount, onMounted, toValue, watch } from "vue";

export function useHorizontalScrollBar(
	options: Partial<ToMaybeRefObject<ScrollBarOptions>>
) {
	const computedOptions = computed(() => ({
		...options,
		shouldAttachScrollBarStateToContainer: toValue(
			options.shouldAttachScrollBarStateToContainer
		),
	}));
	const horizontalScrollBarInstance = new HorizontalScrollBarInstance(
		computedOptions.value
	);

	watch(
		() => computedOptions.value,
		(value) => {
			horizontalScrollBarInstance.updateOptions(value);
		}
	);

	onMounted(() => {
		horizontalScrollBarInstance.mount();
	});

	onBeforeMount(() => {
		horizontalScrollBarInstance.unmount();
	});

	return horizontalScrollBarInstance;
}
