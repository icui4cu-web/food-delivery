document.querySelectorAll('.search__close').forEach(btn => {
	btn.addEventListener('click', () => {
		const search = btn.closest('.search')
		toggle(search, false)
	})
})

export function toggle(search, isOpen) {
	search.classList.toggle('search_open', isOpen)
}