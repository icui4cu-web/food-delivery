document.querySelectorAll('.card').forEach(card => {
	const editBtn = card.querySelector('.card__edit-btn')
	const saveBtn = card.querySelector('.card__save-btn')

	editBtn?.addEventListener('click', () => toggle(card))
	saveBtn?.addEventListener('click', () => {
		card.dispatchEvent(new CustomEvent('card:save', { bubbles: true }))
	})
})

export function toggle(card) {
	const editBtn = card.querySelector('.card__edit-btn')
	const isEdit = card.classList.toggle('card_edit-mode')

	if (editBtn) {
		if (!editBtn.dataset.defaultHtml) {
			editBtn.dataset.defaultHtml = editBtn.innerHTML
		}

		editBtn.innerHTML = isEdit
			? editBtn.dataset.collapseText
			: editBtn.dataset.defaultHtml
	}
}

export function collapse(card) {
	card.classList.remove('card_edit-mode')
	const editBtn = card.querySelector('.card__edit-btn')
	if (editBtn?.dataset.defaultHtml) {
		editBtn.innerHTML = editBtn.dataset.defaultHtml
	}
}

export function setLoading(card, loading) {
	const btn = card.querySelector('.card__save-btn')
	if (!btn) return
	btn.disabled = loading
	btn.classList.toggle('btn_loading', loading)
}

export function updatePreviewText(card, text) {
	card.querySelector('.card__preview-label').innerHTML = text
}