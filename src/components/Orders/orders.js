if (typeof Swiper !== "undefined") {
	new Swiper(".orders__filter", {
		slidesPerView: "auto",
		spaceBetween: 10,
		freeMode: true,
		focusableElements: 'input, select, option, textarea, video, label',
		breakpoints: {
			768: {
				spaceBetween: 20,
			}
		}
	});
}

document.querySelector(".orders__filter")?.addEventListener("click", (e) => {
	const btn = (e.target).closest(".orders__filter-btn");
	if (!btn) return;

	const ordersEl = document.querySelector(".orders");
	const ACTIVE_CLASS = 'orders__filter-btn_active'
	const activeBtn = document.querySelector(`.${ACTIVE_CLASS}`)

	activeBtn.classList.remove(ACTIVE_CLASS)
	activeBtn.disabled = false
	btn.classList.add(ACTIVE_CLASS)
	btn.disabled = true

	ordersEl.dispatchEvent(
		new CustomEvent("orders:filter", {
			detail: { filter: btn.dataset.filter },
		})
	);
});