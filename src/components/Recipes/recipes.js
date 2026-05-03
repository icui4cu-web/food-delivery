import { connectExternalNav, mountResponsiveSwiper } from '@js/swiper-utils.js'

document.querySelectorAll('.recipes').forEach(el => {
	mountResponsiveSwiper({
		el,
		enableQuery: '(max-width: 859.98px)',
		options: {
			slidesPerView: 'auto',
			spaceBetween: 10
		},
		onMount: (swiper) => connectExternalNav(swiper),
	})
})
