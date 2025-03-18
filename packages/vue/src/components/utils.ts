import type { HTMLAttributes, PropType, StyleValue } from "vue";

type ClassValue = string | Record<string, boolean>;

export interface AxisScrollBarProps {
	class?: ClassValue | ClassValue[];
	container?: HTMLElement;
	autoHide?: boolean;
	style?: StyleValue;
	startOffset?: number;
	endOffset?: number;
	withTrack?: boolean;
	trackProps?: HTMLAttributes;
	thumbProps?: HTMLAttributes;
}

export function axisScrollBarProps() {
	return {
		class: {
			type: [String, Object, Array] as PropType<ClassValue | ClassValue[]>,
			required: false,
		},
		container: {
			type: Object as PropType<HTMLElement>,
			required: false,
		},
		autoHide: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: true,
		},
		startOffset: {
			type: Number as PropType<number>,
			required: false,
		},
		endOffset: {
			type: Number as PropType<number>,
			required: false,
		},
		style: {
			type: [String, Object, Array] as PropType<StyleValue>,
			required: false,
			default: true,
		},
		withTrack: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: true,
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
