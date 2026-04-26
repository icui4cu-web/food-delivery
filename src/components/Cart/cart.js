const VIEWS = {
	edit: 'cart_view_edit',
	summary: 'cart_view_summary',
}

export function setView(el, view) {
	el.classList.remove(...Object.values(VIEWS))
	el.classList.add(VIEWS[view])
}