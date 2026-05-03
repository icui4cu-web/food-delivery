const nav = document.querySelector('.nav')
const overlay = document.querySelector('.nav-overlay')

if (nav) {
	nav.addEventListener('click', () => {
		toggle(false)
	})

	overlay.addEventListener('click', () => {
		toggle(false)
	})
}



export function toggle(isOpen) {
	nav.classList.toggle('nav_open', isOpen)
	document.body.classList.toggle('nav-scroll-lock')
}