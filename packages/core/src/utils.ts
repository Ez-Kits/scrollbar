export function debounce<T extends Function>(cb: T, wait: number) {
	let h: NodeJS.Timeout;
	const callable = (...args: any) => {
		clearTimeout(h);
		h = setTimeout(() => cb(...args), wait);
	};
	return <T>(<any>callable);
}
