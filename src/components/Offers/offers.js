import { connectExternalNav } from "@js/swiper-utils"

document.querySelectorAll('.offers').forEach(el => {
	const swiper = new Swiper(el, {
		loop: true,
		slidesPerView: 1.2,
		spaceBetween: 20,
		breakpoints: {
			// breakpoints дублюються в scss для запобігання cumulative shift layout
			390: { slidesPerView: 1.5, spaceBetween: 20 },
			520: { slidesPerView: 1.8, spaceBetween: 20 },
			620: { slidesPerView: 2.4, spaceBetween: 20},
			860: { slidesPerView: 3, spaceBetween: 30},
			992: { slidesPerView: 3.5, spaceBetween: 30},
			1200: { slidesPerView: 4, spaceBetween: 30},
		},
	})
	connectExternalNav(swiper)
})