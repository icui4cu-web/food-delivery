import * as Icon from "@components/Icon/icon";

const passwordInputs = document.querySelectorAll('.input-password');

passwordInputs.forEach(wrapper => {
	const btn = wrapper.querySelector('.input-password__btn')
	const input = wrapper.querySelector('.input-password__control')

	btn.addEventListener('click', () => {
		const isHidden = input.type === 'password'

		input.type = isHidden ? 'text' : 'password'
		Icon.set(btn, isHidden ? 'eye' : 'eye-blocked')
	})
})