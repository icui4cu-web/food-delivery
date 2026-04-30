function setState(btn, editing) {
	if (!btn.dataset.defaultHtml) {
		btn.dataset.defaultHtml = btn.innerHTML
	}
	btn.innerHTML = editing ? btn.dataset.collapseText : btn.dataset.defaultHtml
	btn.setAttribute('aria-pressed', String(editing))
}

export function enterEditMode(btn) {
	setState(btn, true)
}

export function exitEditMode(btn) {
	setState(btn, false)
}

export function toggleEditMode(btn) {
	const editing = btn.getAttribute('aria-pressed') === 'true'
	setState(btn, !editing)
}