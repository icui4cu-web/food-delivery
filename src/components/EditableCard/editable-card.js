import * as EditBtn from "@components/EditBtn/edit-btn"

function resolveEditBtn(card) {
	return card.querySelector('.editable-card__edit-btn')
}

function resolveCard(cardOrSelector) {
	return typeof cardOrSelector === 'string'
		? document.querySelector(cardOrSelector)
		: cardOrSelector
}

export function updatePreview(cardOrSelector, text) {
	const card = resolveCard(cardOrSelector)
	card.querySelector('.editable-card__preview-text').innerHTML = text
}

export function toggle(cardOrSelector) {
	const card = resolveCard(cardOrSelector)
	const editing = !card.classList.contains('editable-card_editing')
	card.classList.toggle('editable-card_editing', editing)
	card.dispatchEvent(new CustomEvent(
		editing ? 'editable-card:enter' : 'editable-card:exit',
		{ bubbles: true }
	))
}

export function close(cardOrSelector) {
	const card = resolveCard(cardOrSelector)
	const btn = resolveEditBtn(card)
	card.classList.remove('editable-card_editing')
	card.dispatchEvent(new CustomEvent('editable-card:exit', { bubbles: true }))
	if(btn) EditBtn.exitEditMode(btn)
}

document.querySelectorAll('.editable-card__edit-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		const card = btn.closest('.editable-card')
		toggle(card)
		EditBtn.toggleEditMode(btn)
	})
})