import type { RefObject } from "react";

export function maybeRefToValue<T>(value: T | RefObject<T>): T | null {
	return typeof value === "object" && value && "current" in value
		? value.current
		: value;
}

export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	wait: number
): T {
	let timeout: NodeJS.Timeout;

	return ((...args: Parameters<T>) => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn(...args);
		}, wait);
	}) as T;
}
