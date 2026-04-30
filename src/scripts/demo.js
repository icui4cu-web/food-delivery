import { collectFormData, setFormLoading, showFieldErrors, clearFieldErrors } from "@js/utils"
import * as CartBtn from "@components/CartBtn/cart-btn"
import * as Filter from "@components/Filter/filter"
import * as PhoneLogin from "@components/PhoneLogin/phone-login"
import * as Otp from "@components/OTP/otp"
import * as Cart from "@components/Cart/cart"
import * as EditableCard from "@components/EditableCard/editable-card"
import * as EditBtn from "@components/EditBtn/edit-btn"

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

// Перемикання режиму редагування кошика (/checkout)
const cartViewToggler = document.getElementById('cart-view-toggler')
cartViewToggler?.addEventListener('click', () => {
	EditBtn.toggleEditMode(cartViewToggler)
	Cart.toggleView()
})

document.querySelectorAll('[data-form]').forEach(form => {
	form.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formId = form.dataset.form
		const formData = new FormData(form)

		clearFieldErrors(form);

		// обработка форм до отправки на сервер
		if (formId === 'change-password') {
			const newPassword = formData.get('new-password');
			const confirmPassword = formData.get('confirm-password');

			if (newPassword !== confirmPassword) {
				showFieldErrors([
					{ name: 'confirm-password', message: 'Паролі не співпадають' }
				], form);
				setFormLoading(form, false);
				return;
			}
		} else if (formId === 'otp') {
			Otp.setInvalid(form, false)
		}

		setFormLoading(form, true)

		// fetch(form.action, {
		// 	method: "POST",
		// 	body: formData
		// })
		await delay(1000);

		// fetch success
		const card = form.closest('.editable-card')

		if (formId === 'phone-login') {
			Otp.updatePhone(formData.get('phone'))
			PhoneLogin.nextStep()
		} else if (formId === 'email-login') {

		} else if (formId === 'forgot-password') {

		} else if (formId === 'account-personal-data') {
			if (card) EditableCard.updatePreview(card, '<b>--Відповідь із сервера--</b>')
		} else if (formId === 'primary-address') {
			if (card) EditableCard.updatePreview(card, '<b>--Відповідь із сервера--</b>')
		} else if (formId === 'additional-address') {
			if (card) EditableCard.updatePreview(card, '<b>--Відповідь із сервера--</b>')
		}

		if (card) EditableCard.close(card)

		// fetch error
		if (formId === 'otp') {
			Otp.setInvalid(form, true)
		}

		// fetch finally
		setFormLoading(form, false)
	})
})

// Зв'язок між формами "Персональні дані"/"Отримувач" (/checkout)
// та оновлення прев'ю на клієнті з потрібних полів
function saveCheckoutCard(btn, sourceId, cardId, label, fields) {
	document.getElementById(btn)?.addEventListener('click', () => {
		const source = document.getElementById(sourceId);
		const card = document.getElementById(cardId);
		const formData = collectFormData(source, fields);
		EditableCard.close(card);
		EditableCard.updatePreview(card, `<b>${label}:</b> ${formData}`);
	});
}

const customerFields = ['customer-lastname', 'customer-firstname', 'customer-middlename', 'customer-phone'];
const recipientFields = ['recipient-lastname', 'recipient-firstname', 'recipient-middlename', 'recipient-phone'];

saveCheckoutCard('customer-save-btn', 'customer', 'customer', 'Замовник', customerFields);
saveCheckoutCard('recipient-save-btn', 'recipient', 'recipient', 'Інший', recipientFields);
saveCheckoutCard('keep-customer-btn', 'customer', 'recipient', 'Отримувач', customerFields);

// Видалення додаткових адрес доставки (/account/address)
document.querySelectorAll('[data-remove-address]').forEach(btn => {
	btn.addEventListener('click', async () => {
		const addressId = btn.dataset.removeAddress

		btn.disabled = true
		btn.classList.add('btn_loading')

		// fetch
		await delay(1000);

		// fetch success
		// оновлюємо сторінку, щоб отримати актуальний список
		location.reload()
	})
})

// Фільтрування замовлень (/account/orders)
document.querySelector('.orders')?.addEventListener('orders:filter', e => {
	const { filter } = e.detail; // all, processing, confirmed, delivered, cancelled
	console.log(filter);
	
})