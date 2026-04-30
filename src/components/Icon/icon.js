export function set(el, id) {
	const iconUse = el.querySelector('use')
	const spritePath = iconUse.getAttribute('href').split('#')[0]

	iconUse.setAttribute('href', `${spritePath}#${id}`)
}