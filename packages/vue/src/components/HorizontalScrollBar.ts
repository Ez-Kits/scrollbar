import { axisScrollBarProps } from "src/components/utils";
import { useHorizontalScrollBar } from "src/composables";
import { computed, defineComponent, h, ref, watch } from "vue";

export const HorizontalScrollBar = defineComponent({
	inheritAttrs: true,
	props: axisScrollBarProps(),
	setup(props, { attrs }) {
		const trackRef = ref<HTMLDivElement>();
		const thumbRef = ref<HTMLDivElement>();

		const shouldAttachScrollBarStateToContainer = computed(() => {
			return props.shouldAttachScrollBarStateToContainer ?? true;
		});

		const horizontalScrollBarInstance = useHorizontalScrollBar({
			getContainerElement: () => props.container,
			getTrackElement: () => trackRef.value,
			getThumbElement: () => thumbRef.value,
			shouldAttachScrollBarStateToContainer,
		});

		watch(
			() => props.container,
			(value) => {
				horizontalScrollBarInstance.updateOptions({
					getContainerElement: () => value,
				});
			}
		);

		return () =>
			h(
				"div",
				{
					ref: trackRef,
					...attrs,
					...props.trackProps,
				},
				h("div", {
					ref: thumbRef,
					...attrs,
					...props.thumbProps,
				})
			);
	},
});
