import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";
import { Coordinate, ThumbDraggingActivatorInfo } from "src/types";
import { calculateThumbSizeAndOffset } from "src/utils";

export class VerticalScrollBarInstance extends BaseScrollBarInstance {
	protected prefix = "vertical";

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
		const shouldCalculate = containerStyle.overflowY !== "hidden";

		if (!shouldCalculate) {
			return { thumbSize: 0, thumbOffset: 0 };
		}

		const trackRect = track.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		const thumbStyle = window.getComputedStyle(thumb);
		let thumbMinHeight = Number(
			thumbStyle.getPropertyValue("min-height").replace("px", ""),
		);

		if (Number.isNaN(thumbMinHeight)) {
			thumbMinHeight = 0;
		}

		return calculateThumbSizeAndOffset(
			container.scrollTop,
			container.scrollHeight,
			containerRect.height,
			trackRect.height,
			thumbMinHeight,
		);
	}

	protected getTrackSize(): number {
		const track = this.getTrackElement();
		if (!track) return 0;
		return track.clientHeight;
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

		const offset = event.clientY - trackRect.top - thumbRect.height / 2;
		const offsetPercent = offset / trackRect.height;
		const scrollTop = offsetPercent * container.scrollHeight;

		container.scrollTop = scrollTop;
	}

	protected updateContainerScrollOffsetOnThumbDragging(
		activatorInfo: ThumbDraggingActivatorInfo,
		event: MouseEvent,
	): void {
		const container = this.getContainerElement();
		const thumb = this.getThumbElement();
		const track = this.getTrackElement();
		if (!container || !thumb || !track) {
			return;
		}

		const delta = event.clientY - activatorInfo.activatorEvent.clientY;
		const offsetPercent = (activatorInfo.offset + delta) / track.clientHeight;

		container.scrollTop = offsetPercent * container.scrollHeight;
	}

	protected isScrolling(lastScrollOffset: Coordinate): boolean {
		const container = this.getContainerElement();
		if (!container) return false;

		return lastScrollOffset.y !== container.scrollTop;
	}

	protected isScrollable(): boolean {
		const container = this.getContainerElement();
		if (!container) return false;

		return container.scrollHeight > container.clientHeight;
	}
}
