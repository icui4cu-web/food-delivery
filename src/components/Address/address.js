import * as Icon from "@components/Icon/icon"

const address = document.querySelector('.address')

if (address) {
	const addForm = address.querySelector('.address__add-form')
	const addBtn = address.querySelector('.address__add-btn')

	addBtn.addEventListener('click', () => {
		const isHidden = addForm.hasAttribute('hidden')
		addForm.toggleAttribute('hidden')
		address.classList.toggle('address_add-mode', isHidden)
		Icon.set(addBtn, isHidden ? 'minus-square' : 'plus-square')
	})
}