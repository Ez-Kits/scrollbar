import { VerticalScrollBarInstance } from "@ez-kits/scrollbar-core";
import { axisScrollBarProps } from "src/components/utils";
import { defineComponent, h, onBeforeUnmount, ref, watch } from "vue";

export const VerticalScrollBar = defineComponent({
	inheritAttrs: true,
	props: axisScrollBarProps(),
	setup(props) {
		const trackRef = ref<HTMLDivElement>();
		const thumbRef = ref<HTMLDivElement>();

		const scrollBar = new VerticalScrollBarInstance({
			...props,
			thumb: thumbRef.value,
			track: trackRef.value,
		});
		scrollBar.mount();

		watch(
			() => [
				props.container,
				props.autoHide,
				props.startOffset,
				props.endOffset,
				trackRef.value,
				thumbRef.value,
			],
			() => {
				scrollBar.updateOptions({
					...props,
					thumb: thumbRef.value,
					track: trackRef.value,
				});
			}
		);

		onBeforeUnmount(() => {
			scrollBar.unmount();
		});

		return () =>
			props.withTrack
				? h(
						"div",
						{
							ref: trackRef,
							class: props.class,
							style: props.style,
							...props.trackProps,
						},
						() =>
							h("div", {
								ref: thumbRef,
								class: props.class,
								style: props.style,
								...props.thumbProps,
							})
				  )
				: h("div", {
						ref: thumbRef,
						class: props.class,
						style: props.style,
						...props.thumbProps,
				  });
	},
});
