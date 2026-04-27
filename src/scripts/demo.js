import { setFormLoading } from "@js/utils"
import * as CartBtn from "@components/CartBtn/cart-btn"
import * as Filter from "@components/Filter/filter"
import * as PhoneLogin from "@components/PhoneLogin/phone-login"
import * as Otp from "@components/OTP/otp"
import * as Card from "@components/Card/card"
import * as Cart from "@components/Cart/cart"

// Імітація запиту до сервера
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Приклад роботи кнопки додавання товару до кошика (/catalog-grid)
document.querySelectorAll('.cart-btn').forEach(btn => {
	btn.addEventListener('click', async () => {
		CartBtn.setLoading(btn, true)

		// Виконуємо запит до сервера
		await delay(1000)

		// Перемикаємо активний стан кнопки (за потреби)
		const isActive = CartBtn.getActive(btn)
		CartBtn.setActive(btn, !isActive)
		CartBtn.setLoading(btn, false)
	})
})

// Приклад роботи фільтра (/catalog-grid)
document.querySelector('[data-filter]')?.addEventListener('filter:change', async () => {
	Filter.loading(true);
	await delay(1000);
	Filter.loading(false);
});

// Форма логіну  (/checkout-login)
const phoneLoginForm = document.getElementById('phone-login-form')
if (phoneLoginForm) {
	phoneLoginForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formData = new FormData(phoneLoginForm)

		// блокируем форму до завершения запроса
		setFormLoading(phoneLoginForm, true)

		// fetch Надсилаємо форму на сервер
		await delay(1000);

		// fetch success (переходимо до введення OTP-коду та передаємо номер телефону)
		Otp.updatePhone(formData.get('phone'))
		PhoneLogin.nextStep()

		// fetch finally (розблоковуємо форму для повторного надсилання)
		setFormLoading(phoneLoginForm, false)
	})
}

// Форма введення OTP-коду (/checkout-login)
const otpLoginForm = document.getElementById('otp-login-form')
if (otpLoginForm) {
	otpLoginForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formData = new FormData(otpLoginForm)

		// Блокуємо форму до завершення запиту
		setFormLoading(otpLoginForm, true)

		// Скидаємо повідомлення про помилку OTP-коду
		Otp.setInvalid(otpLoginForm, false)

		// fetch (Надсилаємо форму на сервер)
		await delay(1000);

		// fetch success
		// location.redirect = '/'

		// fetch error (показуємо повідомлення про неправильний код)
		Otp.setInvalid(otpLoginForm, true)

		// fetch finally (розблоковуємо форму)
		setFormLoading(otpLoginForm, false)
	})
}

// Перемикання режиму редагування кошика (/checkout)
const checkoutCartCard = document.getElementById('checkout-cart-card')
if (checkoutCartCard) {
	checkoutCartCard.addEventListener('card:toggle', (e) => {
		const { editing } = e.detail
		const cart = checkoutCartCard.querySelector('.cart')

		if (editing) {
			Cart.setView(cart, 'edit')
		} else {
			Cart.setView(cart, 'summary')
		}
	})
}

// Редагування форми персональних даних із збереженням на сервері (/checkout-login)
const personalDataForm = document.getElementById('personal-data-form')
personalDataForm?.addEventListener('submit', async (e) => {
	e.preventDefault()

	setFormLoading(personalDataForm, true)

	// fetch
	await delay(1000);

	// fetch success
	const card = personalDataForm.closest('.card')
	if (card) {
		Card.collapse(card)
		Card.updatePreviewText(card, '<b>--Відповідь із сервера--</b>')
	}

	// fetch finally
	setFormLoading(personalDataForm, false)
})