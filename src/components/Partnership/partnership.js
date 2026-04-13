document.querySelectorAll('.partnership__card').forEach(card => {
	card.addEventListener('click', (e) => {
		if(!e.target.closest('a')) {
			card.classList.toggle('_active')
		}
	})
})