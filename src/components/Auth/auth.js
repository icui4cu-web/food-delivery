const auth = document.querySelector('.auth');

if (auth) {
	const methods = auth.querySelectorAll('.auth__method');
	const toggleBtns = auth.querySelectorAll('[data-method]');

	toggleBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const next = btn.dataset.method;
			methods.forEach(m => m.classList.toggle('auth__method_active', m.dataset.method === next));
			auth.dataset.currentMethod = next;
		});
	});
}