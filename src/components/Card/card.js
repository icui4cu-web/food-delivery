document.querySelectorAll('.card').forEach(card => {
	const editBtn = card.querySelector('.card__edit-btn')
	editBtn?.addEventListener('click', () => toggle(card))
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
	card.dispatchEvent(new CustomEvent('card:toggle', {
		bubbles: true,
		detail: { editing: isEdit }
	}))
}

export function collapse(card) {
	card.classList.remove('card_edit-mode')
	const editBtn = card.querySelector('.card__edit-btn')
	if (editBtn?.dataset.defaultHtml) {
		editBtn.innerHTML = editBtn.dataset.defaultHtml
	}
	card.dispatchEvent(new CustomEvent('card:toggle', {
		bubbles: true,
		detail: { editing: false }
	}))
}

export function updatePreviewText(card, text) {
	card.querySelector('.card__preview-label').innerHTML = text
}