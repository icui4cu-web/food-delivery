document.querySelectorAll('.hero-accordion__slide').forEach(details => {
	details.querySelector('.hero-accordion__btn').addEventListener('click', (e) => {
		if (details.open) {
			e.preventDefault();
		}
	});
});