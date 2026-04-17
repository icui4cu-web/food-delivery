import * as filter from "@components/Filter/filter"

document.querySelector('[data-filter-open-btn]')?.addEventListener('click', () => {
	filter.toggle(true)
})