export function isServer() {
	return typeof window === "undefined" || typeof document === "undefined";
}

export function clearUndefinedProperties<T extends { [key: string]: any }>(
	object: T
) {
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			const value = object[key];
			if (value === undefined) {
				delete object[key];
			}
		}
	}

	return object;
}

export function kebabCaseToCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
