export function throttle(fn, delay) {
	let lastCall = 0;
	let timer = null;

	return function (...args) {
		const now = Date.now();
		const remaining = delay - (now - lastCall);

		clearTimeout(timer);

		if (remaining <= 0) {
			lastCall = now;
			fn.apply(this, args);
		} else {
			timer = setTimeout(() => {
				lastCall = Date.now();
				fn.apply(this, args);
			}, remaining);
		}
	};
}