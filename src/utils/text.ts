export function capitalizeString(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function sentenceCase(str: string) {
	if (!str) return undefined;
	return str.replace(/([!?.:]\s+)([a-z])/g, match => match.toUpperCase());
}

// /(?:^|\s|[-"'([{])+\S/g
