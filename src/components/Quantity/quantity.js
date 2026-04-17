document.addEventListener("click", (e) => {
	const btn = e.target.closest(".quantity__btn");
	if (!btn) return;

	const widget = btn.closest(".quantity");
	const input = widget.querySelector(".quantity__input");
	const step = parseFloat(widget.dataset.step) || 1;
	const min = widget.dataset.min ? parseFloat(widget.dataset.min) : null;
	const max = widget.dataset.max ? parseFloat(widget.dataset.max) : null;
	const units = input.dataset.units || "";
	const decimals = step < 1 ? 1 : 0;

	const getValue = () => parseFloat(input.dataset.raw) || 1;
	const setValue = (val) => {
		const rounded = parseFloat(val.toFixed(decimals));
		let clamped = Math.max(min !== null ? min : step, rounded);
		if (max !== null) clamped = Math.min(max, clamped);
		input.dataset.raw = clamped;
		input.value = units ? `${clamped} ${units}` : clamped;
	};

	if (btn.classList.contains("_minus")) setValue(getValue() - step);
	if (btn.classList.contains("_plus")) setValue(getValue() + step);
});

document.addEventListener("focus", (e) => {
	if (!e.target.closest) return;
	
	const input = e.target.closest(".quantity__input");
	if (!input) return;
	input.value = parseFloat(input.dataset.raw) || 1;
	input.select();
}, true);

document.addEventListener("blur", (e) => {
	if (!e.target.closest) return;

	const input = e.target.closest(".quantity__input");
	if (!input) return;

	const widget = input.closest(".quantity");
	const step = parseFloat(widget.dataset.step) || 1;
	const min = widget.dataset.min ? parseFloat(widget.dataset.min) : null;
	const max = widget.dataset.max ? parseFloat(widget.dataset.max) : null;
	const units = input.dataset.units || "";
	const decimals = step < 1 ? 1 : 0;
	const getValue = () => parseFloat(input.dataset.raw) || 1;

	const setValue = (val) => {
		const rounded = parseFloat(val.toFixed(decimals));
		let clamped = Math.max(min !== null ? min : step, rounded);
		if (max !== null) clamped = Math.min(max, clamped);
		input.dataset.raw = clamped;
		input.value = units ? `${clamped} ${units}` : clamped;
	};

	const parsed = parseFloat(input.value);
	setValue(isNaN(parsed) ? getValue() : parsed);
}, true);

document.addEventListener("keydown", (e) => {
	const input = e.target.closest(".quantity__input");
	if (!input) return;
	const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", ".", ","];
	if (!e.key.match(/^\d$/) && !allowed.includes(e.key)) e.preventDefault();
});

document.addEventListener("input", (e) => {
	const input = e.target.closest(".quantity__input");
	if (!input) return;
	input.value = input.value.replace(/[^0-9.,]/g, "").replace(",", ".");
});