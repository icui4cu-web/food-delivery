

export function loading(state) {
	const filter = document.querySelector('.filter');
	state ? filter.setAttribute('inert', '') : filter.removeAttribute('inert');
}

export function toggle(isOpen) {
	document.querySelector('.filter').classList.toggle('_open', isOpen)
	document.body.classList.toggle('filter-scroll-lock', isOpen)
}

function init() {
	const rangeEl = document.getElementById('filter-price-range');
	const inputMin = document.querySelector('[data-filter-price-min]');
	const inputMax = document.querySelector('[data-filter-price-max]');
	const closeBtn = document.querySelector('.filter__close-btn')
	const overlay = document.querySelector('.filter-overlay')

	const min = +rangeEl.dataset.min;
	const max = +rangeEl.dataset.max;

	noUiSlider.create(rangeEl, {
		start: [+inputMin.value, +inputMax.value],
		connect: true,
		range: { min, max },
		step: 1,
	});

	let prevMin = +inputMin.value;
	let prevMax = +inputMax.value;

	function dispatchChange() {
		const curMin = +inputMin.value;
		const curMax = +inputMax.value;
		if (curMin === prevMin && curMax === prevMax) return;
		prevMin = curMin;
		prevMax = curMax;
		rangeEl.dispatchEvent(new CustomEvent('filter:change', { bubbles: true }));
	}

	rangeEl.noUiSlider.on('update', (values, handle) => {
		(handle === 0 ? inputMin : inputMax).value = Math.round(values[handle]);
	});

	rangeEl.noUiSlider.on('change', () => dispatchChange(rangeEl));

	function syncSlider(input, handle) {
		const val = +input.value;
		if (!isNaN(val)) rangeEl.noUiSlider.setHandle(handle, val);
	}

	[inputMin, inputMax].forEach((input, handle) => {
		input.addEventListener('input', (e) => {
			e.target.value = e.target.value.replace(/\D/g, '');
			syncSlider(input, handle);
		});

		input.addEventListener('change', (e) => {
			let val = +e.target.value || (handle === 0 ? min : max);
			val = Math.min(Math.max(val, min), max);
			e.target.value = val;
			rangeEl.noUiSlider.setHandle(handle, val);
		});

		input.addEventListener('blur', () => dispatchChange(rangeEl));
		input.addEventListener('focus', () => input.select());
	});

	closeBtn.addEventListener('click', () => toggle(false))
	overlay.addEventListener('click', () => toggle(false))
}

if (document.querySelector('.filter')) {
	init();
}