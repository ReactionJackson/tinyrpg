export const replaceAt = (string, index, replace) =>
	string.substring(0, index) + replace + string.substring(index + replace.length)
