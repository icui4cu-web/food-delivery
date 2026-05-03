import { throttle } from "@js/utils";
import * as Nav from "@components/Nav/nav";
import * as Search from "@components/Search/search";

const header = document.querySelector('.header');
const search = header.querySelector('.header__search')
const SCROLL_THRESHOLD = 830;
const THROTTLE_DELAY = 100;
const CLASS_NAME = 'header_sticky'

const handleScroll = throttle(() => {
	header.classList.toggle(CLASS_NAME, window.scrollY >= SCROLL_THRESHOLD);
}, THROTTLE_DELAY);

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll()

document.querySelector('.header__nav-btn')?.addEventListener('click', () => Nav.toggle(true))
document.querySelector('.header__search-btn')?.addEventListener('click', () => Search.toggle(search, true))