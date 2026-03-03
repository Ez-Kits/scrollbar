import { isEqual, kebabCaseToCamelCase } from "./utils";
import type { ScrollBarStore } from "./types";

/**
 * Handles attaching and detaching scrollbar state (data-*, CSS variables)
 * to DOM elements. Only applies changed properties to avoid unnecessary layout.
 */
export class ScrollBarStateAttachment {
	private lastAttachedStateByElement = new WeakMap<
		HTMLElement,
		Record<string, ScrollBarStore>
	>();

	constructor(private getStore: () => ScrollBarStore) {}

	attach(element: HTMLElement, prefix?: string): void {
		const current = { ...this.getStore() };
		const prefixKey = prefix ?? "";
		const last = this.lastAttachedStateByElement.get(element)?.[prefixKey];
		if (last && isEqual(current, last)) {
			return;
		}

		const computedPrefix = prefix ? `${prefix}-` : "";

		requestAnimationFrame(() => {
			const currentFrame = { ...this.getStore() };
			const lastFrame =
				this.lastAttachedStateByElement.get(element)?.[prefixKey];

			const changed = (key: keyof ScrollBarStore) =>
				lastFrame?.[key] !== currentFrame[key];
			const sizeChanged =
				changed("trackSize") || changed("thumbSize") || changed("thumbOffset");
			const trackSizePx = `${currentFrame.trackSize}px`;
			const thumbOffsetPx = `${currentFrame.thumbOffset}px`;
			const thumbSizePx = `${currentFrame.thumbSize}px`;

			if (sizeChanged) {
				element.dataset[kebabCaseToCamelCase(`${computedPrefix}size`)] =
					trackSizePx;
				element.dataset[
					kebabCaseToCamelCase(`${computedPrefix}thumb-offset`)
				] = thumbOffsetPx;
				element.dataset[kebabCaseToCamelCase(`${computedPrefix}thumb-size`)] =
					thumbSizePx;
				element.style.setProperty(
					`--${computedPrefix}thumb-offset`,
					thumbOffsetPx,
				);
				element.style.setProperty(
					`--${computedPrefix}thumb-size`,
					thumbSizePx,
				);
				element.style.setProperty(
					`--${computedPrefix}track-size`,
					trackSizePx,
				);
			}

			const setBoolDataset = (key: string, value: boolean) => {
				const dataKey = kebabCaseToCamelCase(key);
				if (value) {
					element.dataset[dataKey] = "true";
				} else {
					delete element.dataset[dataKey];
				}
			};

			if (lastFrame?.isHoveringTrack !== currentFrame.isHoveringTrack) {
				setBoolDataset(
					`is-hovering-${computedPrefix}track`,
					currentFrame.isHoveringTrack,
				);
			}
			if (lastFrame?.isHoveringThumb !== currentFrame.isHoveringThumb) {
				setBoolDataset(
					`is-hovering-${computedPrefix}thumb`,
					currentFrame.isHoveringThumb,
				);
			}
			if (lastFrame?.isDraggingThumb !== currentFrame.isDraggingThumb) {
				setBoolDataset(
					`is-dragging-${computedPrefix}thumb`,
					currentFrame.isDraggingThumb,
				);
			}
			if (lastFrame?.isScrolling !== currentFrame.isScrolling) {
				setBoolDataset(
					`is-${computedPrefix}scrolling`,
					currentFrame.isScrolling,
				);
			}
			if (lastFrame?.isScrollable !== currentFrame.isScrollable) {
				setBoolDataset(
					`is-${computedPrefix}scrollable`,
					currentFrame.isScrollable,
				);
			}

			const byElement = this.lastAttachedStateByElement.get(element) ?? {};
			this.lastAttachedStateByElement.set(element, {
				...byElement,
				[prefixKey]: { ...currentFrame },
			});
		});
	}

	detach(element: HTMLElement, prefix?: string): void {
		const prefixKey = prefix ?? "";
		const byElement = this.lastAttachedStateByElement.get(element);
		if (byElement) {
			const next = { ...byElement };
			delete next[prefixKey];
			if (Object.keys(next).length === 0) {
				this.lastAttachedStateByElement.delete(element);
			} else {
				this.lastAttachedStateByElement.set(element, next);
			}
		}

		const computedPrefix = prefix ? `${prefix}-` : "";
		delete element.dataset[
			kebabCaseToCamelCase(`is-${computedPrefix}scrollable`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-hovering-${computedPrefix}track`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-hovering-${computedPrefix}thumb`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-dragging-${computedPrefix}thumb`)
		];
		delete element.dataset[
			kebabCaseToCamelCase(`is-${computedPrefix}scrolling`)
		];

		element.style.removeProperty(`--${computedPrefix}thumb-offset`);
		element.style.removeProperty(`--${computedPrefix}thumb-size`);
		element.style.removeProperty(`--${computedPrefix}track-size`);
	}

	detachFromElements(
		elements: Iterable<HTMLElement | null | undefined>,
		prefix?: string,
	): void {
		for (const element of elements) {
			if (!element) continue;
			this.detach(element, prefix);
		}
	}
}
