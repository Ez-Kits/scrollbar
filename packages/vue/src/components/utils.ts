import type { HTMLAttributes, PropType } from "vue";

export interface AxisScrollBarProps {
	container?: HTMLElement;
	shouldAttachScrollBarStateToContainer?: boolean;
	trackProps?: HTMLAttributes;
	thumbProps?: HTMLAttributes;
}

export function axisScrollBarProps() {
	return {
		container: {
			type: Object as PropType<HTMLElement | null>,
			required: false,
		},
		shouldAttachScrollBarStateToContainer: {
			type: Boolean as PropType<boolean>,
			required: false,
		},
		trackProps: {
			type: Object as PropType<HTMLAttributes>,
			required: false,
		},
		thumbProps: {
			type: Object as PropType<HTMLAttributes>,
			required: false,
		},
	};
}
