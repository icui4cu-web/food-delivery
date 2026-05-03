const nav = document.querySelector('.mobile-nav')


if (nav) {
	const closeBtn = document.querySelector('.mobile-nav__close-btn')
	const overlay = document.querySelector('.mobile-nav-overlay')

	closeBtn.addEventListener('click', () => toggle(false))
	overlay.addEventListener('click', () => toggle(false))
}

export function toggle(isOpen) {
	nav.classList.toggle('mobile-nav_open', isOpen)
	document.body.classList.toggle('mobile-nav-scroll-lock')
}