export function debounce(callback: (...args: never[]) => void, mills: number = 300): number {
	return setTimeout(callback, mills);
}
