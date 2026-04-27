import * as Card from "@components/Card/card"

function collectFormData(formId) {
	const form = document.getElementById(formId);
	return [...form.querySelectorAll('input')]
		.map(input => {
			const value = input.value.trim();

			if ('phoneMask' in input.dataset) {
				return value.includes('_') ? '' : value;
			}
			return value;
		})
		.filter(Boolean)
		.join(' ');
}

function handleCardCollapse(btn, formId, label) {
	const card = btn.closest('.card');
	if (!card) return;

	const data = collectFormData(formId);
	Card.updatePreviewText(card, `<b>${label}:</b> ${data}`);
	Card.collapse(card, true);
}

document.getElementById('owner-save-btn')?.addEventListener('click', function () {
	handleCardCollapse(this, 'owner-form', 'Замовник');
});

document.getElementById('receiver-save-btn')?.addEventListener('click', function () {
	handleCardCollapse(this, 'receiver-form', 'Інший');
});

document.getElementById('keep-owner-btn')?.addEventListener('click', function () {
	handleCardCollapse(this, 'owner-form', 'Отримувач');
});