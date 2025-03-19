import type { JSX } from "solid-js";

export type WithTrackProps = {
	withTrack: true;
	thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
	trackProps?: JSX.HTMLAttributes<HTMLDivElement>;
};

export type WithoutTrackProps = {
	withTrack?: false;
	thumbProps?: undefined;
	trackProps?: undefined;
} & JSX.HTMLAttributes<HTMLDivElement>;
