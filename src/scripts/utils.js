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

export function preventZoomIOS() {
	const viewport = document.head.querySelector('meta[name=viewport]')

	if (!viewport) return

	let content = viewport.getAttribute('content')
	let re = /maximum\-scale=[0-9\.]+/g

	if (re.test(content)) {
		content = content.replace(re, 'maximum-scale=1.0')
	} else {
		content = [content, 'maximum-scale=1.0'].join(', ')
	}

	viewport.setAttribute('content', content);
}

export function normalizePhone(phone) {
	return phone.replace(/[^\d+]/g, '');
}

export function setFormLoading(form, isLoading) {
	const submitButtons = form.querySelectorAll('button[type="submit"], button:not([type])')

	submitButtons.forEach(btn => {
		btn.disabled = isLoading
		btn.classList.toggle('btn_loading', isLoading)
	})
}

/**
 * Показує помилки полів у контейнері форми
 * @param {Array<{name: string, message: string}>} errors
 * @param {HTMLElement} container
 */
export function showFieldErrors(errors, container) {
	errors.forEach(({ name, message }) => {
		const field = container.querySelector(`[name="${name}"]`);
		if (!field) return;

		const existing = field.parentElement.querySelector('.field__error');
		if (existing) return;

		const error = document.createElement('span');
		error.classList.add('field__error');
		error.dataset.errorFor = name;
		error.textContent = message;

		field.insertAdjacentElement('afterend', error);
	});
}

/**
 * Прибирає всі помилки полів у контейнері
 * @param {HTMLElement} container
 */
export function clearFieldErrors(container) {
	container
		.querySelectorAll('.field__error')
		.forEach((el) => el.remove());
}

// 
export function collectFormData(container, fields) {
	return fields
		.map(name => {
			const input = container.elements?.[name]
				?? container.querySelector(`[name="${name}"]`);
			if (!input) return '';

			const value = input.value.trim();
			if ('phoneMask' in input.dataset) {
				return value.includes('_') ? '' : value;
			}
			return value;
		})
		.filter(Boolean)
		.join(' ');
}