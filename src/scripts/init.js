import { preventZoomIOS } from "@js/utils";
import * as EditableCard from "@components/EditableCard/editable-card"
import * as EditBtn from "@components/EditBtn/edit-btn"
import IMask from "imask/esm/imask";
import "imask/esm/masked/pattern";

// відключення авто-зуму в IOS для полів з розміром шрифту менше 16px
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
isIOS && preventZoomIOS()

// маска телефону
document.querySelectorAll('[data-phone-mask]').forEach(input => {
	const phoneMask = IMask(input, {
		mask: "+{38\\0} (00) 000-00-00",
		lazy: false,
	});

	function updatePhoneMaskValidity() {
		if (!input.required) return;

		input.setCustomValidity(
			phoneMask.masked.isComplete ? "" : "Будь ласка, введіть повний номер телефону"
		);
	}

	phoneMask.on("accept", updatePhoneMaskValidity);
	updatePhoneMaskValidity();
});

// logout
document.querySelectorAll('[data-logout-btn]').forEach(btn => {
	btn.addEventListener('click', () => {
		alert('Видалення токена або ssid (init.js)')
	})
})

// Зв'язує зовнішні кнопки редагування з "editable-card" через data-target-card:
// клік на кнопці перемикає стан картки, події картки синхронізують вигляд кнопки.
document.querySelectorAll('.edit-btn[data-target-card]').forEach(btn => {
	const card = document.getElementById(btn.dataset.targetCard)
	if (!card) return

	btn.addEventListener('click', () => EditableCard.toggle(card))
	card.addEventListener('editable-card:enter', () => EditBtn.enterEditMode(btn))
	card.addEventListener('editable-card:exit', () => EditBtn.exitEditMode(btn))
})