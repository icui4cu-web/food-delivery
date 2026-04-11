import { throttle } from "@js/utils";

const header = document.querySelector('.header');
const SCROLL_THRESHOLD = 830;
const THROTTLE_DELAY = 100;
const CLASS_NAME = 'header_fixed'

const handleScroll = throttle(() => {
	header.classList.toggle(CLASS_NAME, window.scrollY >= SCROLL_THRESHOLD);
}, THROTTLE_DELAY);

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll()