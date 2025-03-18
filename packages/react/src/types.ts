import type { HTMLAttributes } from "react";

export type WithTrackProps = {
	withTrack: true;
	thumbProps?: HTMLAttributes<HTMLDivElement>;
	trackProps?: HTMLAttributes<HTMLDivElement>;
};

export type WithoutTrackProps = {
	withTrack?: false;
	thumbProps?: undefined;
	trackProps?: undefined;
} & HTMLAttributes<HTMLDivElement>;
