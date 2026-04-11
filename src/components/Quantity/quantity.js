document.querySelectorAll(".quantity").forEach((widget) => {
	const input = widget.querySelector(".quantity__input");
	const btnMinus = widget.querySelector(".quantity__btn._minus");
	const btnPlus = widget.querySelector(".quantity__btn._plus");
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

	setValue(getValue());

	input.addEventListener("focus", () => {
		input.value = getValue();
		input.select();
	});

	input.addEventListener("blur", () => {
		const parsed = parseFloat(input.value);
		setValue(isNaN(parsed) ? getValue() : parsed);
	});

	input.addEventListener("keydown", (e) => {
		const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", ".", ","];
		if (!e.key.match(/^\d$/) && !allowed.includes(e.key)) e.preventDefault();
	});

	input.addEventListener("input", () => {
		input.value = input.value.replace(/[^0-9.,]/g, "").replace(",", ".");
	});

	btnMinus.addEventListener("click", () => setValue(getValue() - step));
	btnPlus.addEventListener("click", () => setValue(getValue() + step));
});