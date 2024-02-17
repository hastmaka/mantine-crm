export const filterUndefined = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => ![undefined, null].includes(value))
	);
}