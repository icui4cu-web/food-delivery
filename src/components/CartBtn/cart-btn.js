const ADDED_LABEL_TEXT = 'додано';
const ACTIVE_CLASS_NAME = '_active'
const LOADING_CLASS_NAME = '_loading'

function ensureAddedLabel(btn) {
	if (!btn.querySelector('[data-added]')) {
		const label = document.createElement('span');
		label.className = 'cart-btn__label';
		label.dataset.added = '';
		label.textContent = ADDED_LABEL_TEXT;
		btn.appendChild(label);
	}
}

function getActive(btn) {
	return btn.classList.contains(ACTIVE_CLASS_NAME);
}

function setActive(btn, isActive) {
	if (isActive) {
		ensureAddedLabel(btn);
		btn.classList.add(ACTIVE_CLASS_NAME);
	} else {
		btn.classList.remove(ACTIVE_CLASS_NAME);
	}
}

function setLoading(btn, isLoading) {
	btn.classList.toggle(LOADING_CLASS_NAME, isLoading);
	btn.disabled = isLoading;
}

export { setActive, getActive, setLoading }