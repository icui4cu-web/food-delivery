import * as cartBtn from "@components/CartBtn/cart-btn"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Приклад роботи з кнопкою додавання товару до кошика
document.querySelectorAll('.cart-btn').forEach(btn => {
	btn.addEventListener('click', async () => {
		cartBtn.setLoading(btn, true)

		// запит до сервера
		await delay(1000)

		const isActive = cartBtn.getActive(btn)
		cartBtn.setActive(btn, !isActive)
		cartBtn.setLoading(btn, false)
	})
})