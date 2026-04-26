const SHOW_CLASS = 'city-selector_show-tooltip';

function onOutsideClick() {
	document.querySelectorAll(`.city-selector.${SHOW_CLASS}`).forEach(button => {
		button.classList.remove(SHOW_CLASS);
	});
	document.removeEventListener('click', onOutsideClick);
}

document.querySelectorAll('.city-selector').forEach(button => {
	button.addEventListener('click', (e) => {
		e.stopPropagation();
		const isOpen = button.classList.toggle(SHOW_CLASS);
		document[`${isOpen ? 'add' : 'remove'}EventListener`]('click', onOutsideClick);
	});
});