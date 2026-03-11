import { type AxisScrollBarProps } from "src/components/utils";
import {
	defineComponent,
	h,
	ref,
	type HTMLAttributes,
	type PropType,
} from "vue";
import { HorizontalScrollBar } from "./HorizontalScrollBar";
import { VerticalScrollBar } from "./VerticalScrollBar";

export const ScrollBar = defineComponent({
	inheritAttrs: true,
	props: {
		horizontal: {
			type: [Boolean, Object] as PropType<
				boolean | Omit<AxisScrollBarProps, "container">
			>,
			required: true,
			default: () => true,
		},
		vertical: {
			type: [Boolean, Object] as PropType<
				boolean | Omit<AxisScrollBarProps, "container">
			>,
			required: true,
			default: () => true,
		},
		scrollerProps: {
			type: Object as PropType<HTMLAttributes>,
			default: () => ({}),
		},
	},
	setup(props, { slots, attrs }) {
		const containerRef = ref<HTMLDivElement>();

		return () =>
			h(
				"div",
				{
					...attrs,
				},
				[
					h(
						"div",
						{
							ref: containerRef,
							...props.scrollerProps,
						},
						slots.default?.(),
					),
					props.vertical
						? h(VerticalScrollBar, {
								container: containerRef.value,
								...(typeof props.vertical === "object" ? props.vertical : {}),
							})
						: null,
					props.horizontal
						? h(HorizontalScrollBar, {
								container: containerRef.value,
								...(typeof props.horizontal === "object"
									? props.horizontal
									: {}),
							})
						: null,
				],
			);
	},
});
