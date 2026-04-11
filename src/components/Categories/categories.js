import { connectExternalNav, mountResponsiveSwiper } from '@js/swiper-utils.js'

document.querySelectorAll('.categories').forEach(el => {
	mountResponsiveSwiper({
		el,
		enableQuery: '(max-width: 991.98px)',
		options: {
			spaceBetween: 14,
			slidesPerView: 2.2,
			breakpoints: {
				// breakpoints дублюються в scss для запобігання cumulative shift layout
				390: { slidesPerView: 2.5 },
				576: { slidesPerView: 3.5 },
				768: { slidesPerView: 2.5 },
			},
		},
		onMount: (swiper) => connectExternalNav(swiper),
	})
})
