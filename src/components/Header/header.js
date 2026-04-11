import { throttle } from "@js/utils";

const header = document.querySelector('.header');
const SCROLL_THRESHOLD = 830;
const THROTTLE_DELAY = 100;
const CLASS_NAME = 'header_fixed';
const CLASS_LEAVING = 'header_leaving';

let leaveTimer = null;
let isFixed = false;

const handleScroll = throttle(() => {
  const shouldBeFixed = window.scrollY >= SCROLL_THRESHOLD;

  if (shouldBeFixed && !isFixed) {
    // Вход: отменяем анимацию выхода если была
    clearTimeout(leaveTimer);
    header.classList.remove(CLASS_LEAVING);
    header.classList.add(CLASS_NAME);
    isFixed = true;
  } else if (!shouldBeFixed && isFixed) {
    // Выход: запускаем анимацию, потом убираем класс
    header.classList.add(CLASS_LEAVING);
    leaveTimer = setTimeout(() => {
      header.classList.remove(CLASS_NAME, CLASS_LEAVING);
    }, 300); // длительность CSS-анимации выхода
    isFixed = false;
  }
}, THROTTLE_DELAY);

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();