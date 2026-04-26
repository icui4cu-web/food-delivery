import { setFormLoading } from "@js/utils"
import * as CartBtn from "@components/CartBtn/cart-btn"
import * as Filter from "@components/Filter/filter"
import * as PhoneLogin from "@components/PhoneLogin/phone-login"
import * as Otp from "@components/OTP/otp"
import * as Card from "@components/Card/card"
import * as Cart from "@components/Cart/cart"

// имитация запроса к серверу
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Приклад роботи з кнопкою додавання товару до кошика (/catalog-grid)
document.querySelectorAll('.cart-btn').forEach(btn => {
	btn.addEventListener('click', async () => {
		CartBtn.setLoading(btn, true)

		// запит до сервера
		await delay(1000)

		// активація/деактивація (якщо потрібно)
		const isActive = CartBtn.getActive(btn)
		CartBtn.setActive(btn, !isActive)
		CartBtn.setLoading(btn, false)
	})
})

// Приклад роботи з фільтром (/catalog-grid)
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

		// fetch (отправка формы)
		await delay(1000);

		// fetch success (переход к шагу ввода OTP-кода и передача туда номера телефона)
		Otp.updatePhone(formData.get('phone'))
		PhoneLogin.nextStep()

		// fetch finally (включаем возможность повторной отправки формы)
		setFormLoading(phoneLoginForm, false)
	})
}

// Форма OTP-коду (/checkout-login)
const otpLoginForm = document.getElementById('otp-login-form')
if (otpLoginForm) {
	otpLoginForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formData = new FormData(otpLoginForm)

		// блокируем форму до завершения запроса
		setFormLoading(otpLoginForm, true)

		// сброс сообщения об ошибке OTP-кода
		Otp.setInvalid(otpLoginForm, false)

		// fetch (отправка формы)
		await delay(1000);

		// fetch success
		// location.redirect = '/'

		// fetch error (вывод сообщения о невалидном коде)
		Otp.setInvalid(otpLoginForm, true)

		// fetch finally (включаем возможность повторной отправки формы)
		setFormLoading(otpLoginForm, false)
	})
}

// редактирование карточки (/profile)
// для демо используется один и тот же обработчик для всех карточек
document.querySelectorAll('.card').forEach(card => {
	// слушаем клик по кнопке сохранения
	card.addEventListener('card:save', async (e) => {
		const form = card.querySelector('form')
		const formData = new FormData(form)

		// блок формы и показ лоадера. Ожидание окончания запроса
		Card.setLoading(card, true)

		// fetch
		await delay(1000)

		// fetch success
		// обновление превью карточки данными с сервера
		Card.updatePreviewText(card, '<b>--Відповідь із сервера--</b>')
		// свернуть карточку
		Card.collapse(card)
		// разблокировать кнопку и убрать лоадер
		Card.setLoading(card, false)
	})
})

// активация редактирования корзины (/checkout)
const checkoutCart = document.getElementById('checkout-cart')
if (checkoutCart) {
	checkoutCart.addEventListener('card:toggle', (e) => {
		const { editing } = e.detail
		const cart = checkoutCart.querySelector('.cart')

		if(editing) {
			Cart.setView(cart, 'edit')
		} else {
			Cart.setView(cart, 'summary')
		}
	})
}