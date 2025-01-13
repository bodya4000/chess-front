export function debounce(callback: (...args: never[]) => void, mills: number = 700): number {
	return setTimeout(callback, mills);
}
