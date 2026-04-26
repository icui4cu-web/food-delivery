document.querySelectorAll('.checkout-options').forEach(options => {
	options.addEventListener('change', (e) => {
		const radio = e.target.closest('.checkout-options__radio');
		if (!radio) return;

		options.querySelectorAll('.checkout-options__dropdown').forEach(el => {
			el.hidden = true;
		});

		const item = radio.closest('.checkout-options__item');
		const dropdown = item.nextElementSibling;
		if (dropdown) dropdown.hidden = false;
	});
})
