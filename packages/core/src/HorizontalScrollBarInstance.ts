import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";
import { Coordinate, ThumbDraggingActivatorInfo } from "src/types";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	protected calculateThumbSizeAndOffset(): {
		thumbSize: number;
		thumbOffset: number;
	} {
		const container = this.getContainerElement();
		const track = this.getTrackElement();
		const thumb = this.getThumbElement();

		if (!container || !track || !thumb) {
			return { thumbSize: 0, thumbOffset: 0 };
		}

		const containerStyle = window.getComputedStyle(container);
		const shouldCalculate = containerStyle.overflowX !== "hidden";

		if (!shouldCalculate) {
			return { thumbSize: 0, thumbOffset: 0 };
		}

		const trackRect = track.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		const thumbStyle = window.getComputedStyle(thumb);
		const thumbMinWidth = Number(
			thumbStyle.getPropertyValue("min-width").replace("px", "")
		);

		let thumbSize =
			(containerRect.width / container.scrollWidth) * trackRect.width;
		let thumbSizePadding = 0;

		if (thumbSize < thumbMinWidth) {
			thumbSizePadding = thumbMinWidth - thumbSize;
			thumbSize = thumbMinWidth;
		}

		let thumbOffset =
			(container.scrollLeft / (container.scrollWidth + thumbSizePadding)) *
			(trackRect.width - thumbSizePadding);

		if (thumbOffset < 0) {
			thumbOffset = 0;
		}

		if (thumbOffset > trackRect.width - thumbSize) {
			thumbOffset = trackRect.width - thumbSize;
		}

		return { thumbSize, thumbOffset };
	}

	protected updateContainerScrollOffsetOnTrackPress(event: MouseEvent): void {
		const track = this.getTrackElement();
		const thumb = this.getThumbElement();
		const container = this.getContainerElement();
		if (!track || !thumb || !container) {
			return;
		}

		const trackRect = track.getBoundingClientRect();
		const thumbRect = thumb.getBoundingClientRect();

		const offset = event.clientX - trackRect.left - thumbRect.width / 2;
		const offsetPercent = offset / trackRect.width;
		const scrollLeft = offsetPercent * container.scrollWidth;

		container.scrollLeft = scrollLeft;
	}

	protected updateContainerScrollOffsetOnThumbDragging(
		activatorInfo: ThumbDraggingActivatorInfo,
		event: MouseEvent
	): void {
		const container = this.getContainerElement();
		const thumb = this.getThumbElement();
		const track = this.getTrackElement();
		if (!container || !thumb || !track) {
			return;
		}

		const delta = event.clientX - activatorInfo.activatorEvent.clientX;
		const offsetPercent = (activatorInfo.offset + delta) / track.clientWidth;

		container.scrollLeft = offsetPercent * container.scrollWidth;
	}

	protected isScrolling(lastScrollOffset: Coordinate): boolean {
		const container = this.getContainerElement();
		if (!container) return false;

		return lastScrollOffset.x !== container.scrollLeft;
	}

	protected isScrollable(): boolean {
		const container = this.getContainerElement();
		if (!container) return false;

		return container.scrollWidth > container.clientWidth;
	}
}
