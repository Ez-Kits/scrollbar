import { axisScrollBarProps } from "src/components/utils";
import { useVerticalScrollBar } from "src/composables/useVerticalScrollBar";
import { computed, defineComponent, h, ref, watch } from "vue";

export const VerticalScrollBar = defineComponent({
	inheritAttrs: true,
	props: axisScrollBarProps(),
	setup(props, { attrs }) {
		const trackRef = ref<HTMLDivElement>();
		const thumbRef = ref<HTMLDivElement>();

		const shouldAttachScrollBarStateToContainer = computed(() => {
			return props.shouldAttachScrollBarStateToContainer ?? true;
		});

		const verticalScrollBarInstance = useVerticalScrollBar({
			getContainerElement: () => props.container,
			getTrackElement: () => trackRef.value,
			getThumbElement: () => thumbRef.value,
			shouldAttachScrollBarStateToContainer,
			getElementsToAttachScrollBarStateTo:
				props.getElementsToAttachScrollBarStateTo,
		});

		watch(
			() =>
				[props.container, props.getElementsToAttachScrollBarStateTo] as const,
			([container, getElementsToAttachScrollBarStateTo]) => {
				verticalScrollBarInstance.updateOptions({
					getContainerElement: () => container,
					getElementsToAttachScrollBarStateTo,
				});
			},
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
					...props.thumbProps,
				}),
			);
	},
});
