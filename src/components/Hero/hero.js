class HeroSlider {
	constructor(root) {
		this.root = root;
		this.total = root.querySelectorAll(".hero__text-slide").length;
		this.current = 0;
		this.duration = 8000;
		this.staggerDelay = 300;
		this.paused = false;
		this.timer = null;
		this.elapsed = 0;
		this.lastTick = null;
		this.isAnimating = false;
		this.pendingSlide = null;

		this.els = {
			bullets: root.querySelectorAll(".hero-pagination__bullet"),
			texts: root.querySelectorAll(".hero__text-slide"),
			previews: root.querySelectorAll(".hero-preview__img"),
			accordion: root.querySelectorAll(".hero-accordion__slide"),
			progress: root.querySelector(".hero-preview__progress"),
			btn: root.querySelector(".hero-btn")
		};

		this.btns = JSON.parse(this.els.btn.dataset.btns);

		this._bindEvents();
		this._setInitialState();
		this._startTimer();
	}

	_bindEvents() {
		this.els.bullets.forEach((bullet) => {
			bullet.addEventListener("click", () => this.goTo(+bullet.dataset.slide));
		});

		this.els.accordion.forEach((item, index) => {
			item.querySelector(".hero-accordion__btn").addEventListener("click", () => {
				if (!item.classList.contains("_open")) {
					this.goTo(index);
				}
			});
		});

		[
			...this.els.accordion,
			...this.els.texts,
			...this.els.bullets,
			this.els.btn
		].forEach((el) => {
			if (!el) return;
			el.addEventListener("mouseenter", () => this._pause());
			el.addEventListener("mouseleave", () => this._resume());
		});
	}

	_setInitialState() {
		this.root.dataset.activeSlide = String(this.current + 1);

		this.els.bullets.forEach((el, index) => {
			el.classList.toggle("_active", index === this.current);
		});

		this.els.texts.forEach((el, index) => {
			el.classList.remove("is-entering", "is-leaving");
			el.classList.toggle("_active", index === this.current);
		});

		this.els.previews.forEach((el, index) => {
			el.classList.remove("is-entering", "is-leaving");
			el.classList.toggle("_active", index === this.current);
		});

		this.els.accordion.forEach((el, index) => {
			el.classList.toggle("_open", index === this.current);
		});

		const initialTheme = this._getThemeColorByIndex(this.current);
		this.els.btn.style.setProperty("--hero-btn-bg", initialTheme);
		this.els.btn.style.setProperty("--hero-btn-icon-color", initialTheme);

		this._resetProgress();
	}

	async goTo(index) {
		if (index === this.current && !this.isAnimating) return;

		if (this.isAnimating) {
			this.pendingSlide = index;
			return;
		}

		const prev = this.current;
		const next = index;

		this.isAnimating = true;
		this.pendingSlide = null;
		this.current = next;
		this.elapsed = 0;

		this._runPhaseOne(next);
		this._restartTimer();

		const delay = this.staggerDelay;
		const textDuration = this._getCssTime("--hero-text-duration", this.root);
		const previewDuration = this._getCssTime("--hero-preview-duration", this.root);
		const btnDuration = this._getGridTransitionTime(this.els.btn, 500);

		this._startTextLeave(prev);

		setTimeout(() => {
			this._startTextEnter(next);
		}, delay);

		setTimeout(() => {
			this._animatePreview(prev, next);
			this._animateBtn(next);
		}, delay * 2);

		const totalDuration = Math.max(
			delay + textDuration,
			delay * 2 + previewDuration,
			delay * 2 + btnDuration * 2
		);

		await this._wait(totalDuration);

		this.isAnimating = false;

		if (!this.paused) {
			this._resumeProgress();
		}

		if (this.pendingSlide !== null && this.pendingSlide !== this.current) {
			const pending = this.pendingSlide;
			this.pendingSlide = null;
			this.goTo(pending);
		}
	}

	_runPhaseOne(next) {
		this.root.dataset.activeSlide = String(next + 1);

		this.els.bullets.forEach((el, index) => {
			el.classList.toggle("_active", index === next);
		});

		this.els.accordion.forEach((el, index) => {
			el.classList.toggle("_open", index === next);
		});

		this._resetProgress();
		this._pauseProgress();
	}

	_startTextLeave(prev) {
		if (prev === this.current) return;

		const currentText = this.els.texts[prev];
		currentText.classList.remove("is-entering");
		currentText.classList.add("is-leaving");

		const duration = this._getCssTime("--hero-text-duration", this.root);

		setTimeout(() => {
			currentText.classList.remove("_active", "is-leaving");
		}, duration);
	}

	_startTextEnter(next) {
		const nextText = this.els.texts[next];
		const duration = this._getCssTime("--hero-text-duration", this.root);

		nextText.classList.remove("is-leaving", "_active");
		nextText.classList.add("is-entering");

		setTimeout(() => {
			this.els.texts.forEach((el, index) => {
				el.classList.remove("is-entering", "is-leaving");
				el.classList.toggle("_active", index === next);
			});
		}, duration);
	}

	async _animatePreview(prev, next) {
		if (prev === next) return;

		const currentPreview = this.els.previews[prev];
		const nextPreview = this.els.previews[next];
		const duration = this._getCssTime("--hero-preview-duration", this.root);

		currentPreview.classList.remove("is-entering");
		nextPreview.classList.remove("is-leaving");

		currentPreview.classList.add("is-leaving");
		nextPreview.classList.add("is-entering");

		await this._wait(duration);

		currentPreview.classList.remove("_active", "is-leaving");
		nextPreview.classList.remove("is-entering");
		nextPreview.classList.add("_active");
	}

	async _animateBtn(next) {
		const btn = this.els.btn;
		const label = btn.querySelector(".hero-btn__label");
		const collapseDuration = this._getGridTransitionTime(btn, 500);
		const nextTheme = this._getThemeColorByIndex(next);

		btn.classList.add("_collapsed");
		await this._wait(collapseDuration);

		label.textContent = this.btns[next].label;
		btn.href = this.btns[next].href;
		btn.style.setProperty("--hero-btn-bg", nextTheme);
		btn.style.setProperty("--hero-btn-icon-color", nextTheme);

		btn.classList.remove("_collapsed");
		await this._wait(collapseDuration);
	}

	_getThemeColorByIndex(index) {
		const styles = getComputedStyle(this.root);
		return styles.getPropertyValue(`--hero-slide-color-${index + 1}`).trim();
	}

	_resetProgress() {
		const progress = this.els.progress;
		progress.style.animation = "none";
		progress.offsetWidth;
		progress.style.animation = "";
	}

	_pauseProgress() {
		this.els.progress.style.animationPlayState = "paused";
	}

	_resumeProgress() {
		this.els.progress.style.animationPlayState = "running";
	}

	_startTimer() {
		this.lastTick = performance.now();

		this.timer = setInterval(() => {
			if (this.paused || this.isAnimating) {
				this.lastTick = performance.now();
				return;
			}

			const now = performance.now();
			this.elapsed += now - this.lastTick;
			this.lastTick = now;

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
		if (this.paused) return;
		this.paused = true;
		this.elapsed += performance.now() - this.lastTick;
		this._pauseProgress();
	}

	_resume() {
		if (!this.paused) return;
		this.paused = false;
		this.lastTick = performance.now();
		this._resumeProgress();
	}

	_wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	_getCssTime(variableName, scopeEl) {
		const value = getComputedStyle(scopeEl).getPropertyValue(variableName).trim();

		if (!value) return 0;
		if (value.endsWith("ms")) return parseFloat(value);
		if (value.endsWith("s")) return parseFloat(value) * 1000;

		return parseFloat(value) || 0;
	}

	_getGridTransitionTime(el, fallback = 500) {
		const styles = getComputedStyle(el);
		const properties = styles.transitionProperty.split(",").map((item) => item.trim());
		const durations = styles.transitionDuration.split(",").map((item) => item.trim());
		const delays = styles.transitionDelay.split(",").map((item) => item.trim());

		const toMs = (value) => {
			if (value.endsWith("ms")) return parseFloat(value);
			if (value.endsWith("s")) return parseFloat(value) * 1000;
			return 0;
		};

		let max = 0;

		properties.forEach((property, index) => {
			const duration = durations[index] ?? durations[0] ?? "0s";
			const delay = delays[index] ?? delays[0] ?? "0s";

			if (property === "grid-template-columns" || property === "all") {
				max = Math.max(max, toMs(duration) + toMs(delay));
			}
		});

		return max || fallback;
	}
}

const hero = document.querySelector(".hero");

if (hero) {
	new HeroSlider(hero);
}