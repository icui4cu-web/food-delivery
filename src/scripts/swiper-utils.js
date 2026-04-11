export const swiperInstances = new Map()

export function mountSwiper(el, options) {
	const key = el.id || el
	if (!swiperInstances.has(key)) {
		swiperInstances.set(key, new Swiper(el, options))
	}
}

export function unmountSwiper(el) {
	const key = el.id || el
	swiperInstances.get(key)?.destroy(true, true)
	swiperInstances.delete(key)
}

export function mountResponsiveSwiper({ el, enableQuery, options, onMount }) {
	const mql = matchMedia(enableQuery)
	const checker = ({ matches }) => {
		if (matches) {
			mountSwiper(el, options)
			onMount?.(swiperInstances.get(el.id || el))
		} else {
			unmountSwiper(el)
		}
	}
	mql.addEventListener('change', checker)
	checker({ matches: mql.matches })
}

export function connectExternalNav(swiper) {
	const id = swiper.el?.id
	const nav = document.querySelector(`.swiper-nav[data-slider="${id}"]`)
	if (!nav) return

	nav.addEventListener('click', (e) => {
		const btn = e.target.closest('[data-action]')
		const action = btn?.dataset.action
		if (!btn || typeof swiper[action] !== 'function') return
		swiper[action]()
	})
}