class HeroSlider {
	constructor(root) {
		this.root = root;
		this.total = root.querySelectorAll('.hero__text-slide').length;
		this.current = 0;
		this.duration = 3000;
		this.paused = false;
		this.timer = null;
		this.elapsed = 0;
		this.lastTick = null;

		this.els = {
			bullets: root.querySelectorAll('.hero-pagination__bullet'),
			texts: root.querySelectorAll('.hero__text-slide'),
			previews: root.querySelectorAll('.hero-preview__img'),
			accordion: root.querySelectorAll('.hero-accordion__slide'),
			progress: root.querySelector('.hero-preview__progress'),
			btn: root.querySelector('.hero-btn'),
		};
		this.btns = JSON.parse(this.els.btn.dataset.btns);

		this._bindEvents();
		this._update();
		this._startTimer();
	}

	_bindEvents() {
		this.els.bullets.forEach(btn =>
			btn.addEventListener('click', () => this.goTo(+btn.dataset.slide))
		);
		this.els.accordion.forEach((slide, i) =>
			slide.querySelector('.hero-accordion__btn').addEventListener('click', () => {
				if (!slide.classList.contains('_open')) this.goTo(i);
			})
		);
		const pauseOn = [
			...this.els.accordion,
			...this.els.texts,
			...this.els.bullets,
			this.root.querySelector('.hero-btn'),
		];
		pauseOn.forEach(el => {
			el.addEventListener('pointerenter', (e) => {
				if (e.pointerType === 'mouse') this._pause();
			});
			el.addEventListener('pointerleave', (e) => {
				if (e.pointerType === 'mouse') this._resume();
			});
		});
	}

	goTo(index) {
		this._animateBtn(index);
		this.current = index;
		this.elapsed = 0;
		this._update();
		this._restartTimer();
	}

	_update() {
		const i = this.current;
		this.root.dataset.activeSlide = i + 1;
		this.els.bullets.forEach((el, idx) => el.classList.toggle('_active', idx === i));
		this.els.texts.forEach((el, idx) => el.classList.toggle('_active', idx === i));
		this.els.previews.forEach((el, idx) => el.classList.toggle('_active', idx === i));
		this.els.accordion.forEach((slide, idx) => slide.classList.toggle('_open', idx === i));
		this._resetProgress();
	}

	_resetProgress() {
		const el = this.els.progress;
		el.style.animation = 'none';
		el.offsetWidth;
		el.style.animation = '';
	}

	_pauseProgress() {
		this.els.progress.style.animationPlayState = 'paused';
	}

	_resumeProgress() {
		this.els.progress.style.animationPlayState = 'running';
	}

	_startTimer() {
		this.lastTick = performance.now();
		this.timer = setInterval(() => {
			if (this.paused) return;
			this.elapsed += performance.now() - this.lastTick;
			this.lastTick = performance.now();
			if (this.elapsed >= this.duration) {
				this.goTo((this.current + 1) % this.total);
			}
		}, 100);
	}

	_restartTimer() {
		clearInterval(this.timer);
		this._startTimer();
	}

	_pause() {
		this.paused = true;
		this.elapsed += performance.now() - this.lastTick;
		this._pauseProgress();
	}

	_resume() {
		this.paused = false;
		this.lastTick = performance.now();
		this._resumeProgress();
	}

	_animateBtn(index) {
		const btn = this.els.btn;
		const label = btn.querySelector('.hero-btn__label');

		btn.classList.add('_collapsed');

		btn.addEventListener('transitionend', (e) => {
			if (e.propertyName !== 'grid-template-columns') return;
			label.textContent = this.btns[index].label;
			btn.href = this.btns[index].href;
			btn.classList.remove('_collapsed');
		});
	}
}

const hero = document.querySelector('.hero');
if (hero) new HeroSlider(hero);