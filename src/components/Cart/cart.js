const VIEWS = ['cart_view_edit', 'cart_view_summary']

export function toggleView() {
	const cart = document.querySelector('.cart')

    cart.classList.toggle(VIEWS[0])
    cart.classList.toggle(VIEWS[1])
}