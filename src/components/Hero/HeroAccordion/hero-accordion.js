const slides = document.querySelectorAll('.hero-accordion__slide');

slides.forEach(slide => {
    slide.querySelector('.hero-accordion__btn').addEventListener('click', () => {
        if (slide.classList.contains('_open')) return;

        slides.forEach(other => other.classList.remove('_open'));
        slide.classList.add('_open');
    });
});