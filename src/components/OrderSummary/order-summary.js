document.querySelectorAll('.order-summary__comment-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		const targetId = btn.getAttribute('aria-controls')
		const targetEl = document.getElementById(targetId)

		if(targetEl) {
			targetEl.hidden = false
			targetEl.querySelector('textarea')?.focus()
		}
		
		btn.remove()
	})
})