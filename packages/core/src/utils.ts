export function isServer() {
	return typeof window === "undefined" || typeof document === "undefined";
}

export function clearUndefinedProperties<T extends { [key: string]: any }>(
	object: T,
) {
	return Object.fromEntries(
		Object.entries(object).filter(([, value]) => value !== undefined),
	);
}

export function kebabCaseToCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export function isEqual(first: any, second: any): boolean {
	if (first === second) return true;
	if (typeof first !== typeof second) return false;
	if (typeof first !== "object" || first === null || second === null)
		return false;

	if (Array.isArray(first) && Array.isArray(second)) {
		if (first.length !== second.length) return false;
		return first.every((value, index) => isEqual(value, second[index]));
	}

	if (Object.keys(first).length !== Object.keys(second).length) return false;
	return Object.keys(first).every((key) => isEqual(first[key], second[key]));
}

export function calculateThumbSizeAndOffset(
	scrollOffset: number,
	scrollSize: number,
	containerSize: number,
	trackSize: number,
	thumbMinSize: number,
) {
	let thumbSize = (containerSize / scrollSize) * trackSize;
	let thumbSizePadding = 0;

	if (thumbSize < thumbMinSize) {
		thumbSizePadding = thumbMinSize - thumbSize;
		thumbSize = thumbMinSize;
	}

	let thumbOffset =
		(scrollOffset / (scrollSize + thumbSizePadding)) *
		(trackSize - thumbSizePadding);

	if (thumbOffset < 0) {
		thumbOffset = 0;
	}

	if (thumbOffset > trackSize - thumbSize) {
		thumbOffset = trackSize - thumbSize;
	}

	return { thumbSize, thumbOffset };
}
