import { HorizontalScrollBarInstance } from "@ez-kits/scrollbar-core";
import { axisScrollBarProps } from "src/components/utils";
import { defineComponent, h, onBeforeUnmount, ref, watch } from "vue";

export const HorizontalScrollBar = defineComponent({
	inheritAttrs: true,
	props: axisScrollBarProps(),
	setup(props, { attrs }) {
		const trackRef = ref<HTMLDivElement>();
		const thumbRef = ref<HTMLDivElement>();

		const scrollBar = new HorizontalScrollBarInstance({
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

		console.log(props);

		return () =>
			props.withTrack
				? h(
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
				  )
				: h("div", {
						ref: thumbRef,
						...attrs,
				  });
	},
});
