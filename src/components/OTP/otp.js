import { normalizePhone } from "@js/utils";

const block = document.querySelector('.otp');
let _restartTimer = null;

if (block) {
	const cells = block.querySelectorAll('.otp__cell');
	const countdown = block.querySelector('.otp__countdown');
	const btn = block.querySelector('.otp__resend-btn');
	const STORAGE_KEY = 'otp_end_time';
	const INITIAL = parseInt(countdown?.dataset.timeout, 10);
	const saved = localStorage.getItem(STORAGE_KEY);
	let interval = null;

	const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

	function startTimer(endTime) {
		clearInterval(interval);
		block.classList.add('otp_counting');
		countdown.textContent = formatTime(Math.round((endTime - Date.now()) / 1000));
		interval = setInterval(() => {
			const rem = Math.round((endTime - Date.now()) / 1000);
			if (rem <= 0) {
				clearInterval(interval);
				countdown.textContent = '0:00';
				block.classList.remove('otp_counting');
				localStorage.removeItem(STORAGE_KEY);
				return;
			}
			countdown.textContent = formatTime(rem);
		}, 1000);
	}

	function resetCells() {
		const form = block.closest('form');
		if (form) form.reset();
		else cells.forEach(cell => cell.value = '');
		cells[0]?.focus();
		setInvalid(block, false);
	}

	function restartTimer() {
		const endTime = Date.now() + INITIAL * 1000;
		localStorage.setItem(STORAGE_KEY, endTime);
		startTimer(endTime);
	}

	if (saved) {
		const endTime = parseInt(saved, 10);
		if (endTime > Date.now()) startTimer(endTime);
		else { localStorage.removeItem(STORAGE_KEY); block.classList.remove('otp_counting'); }
	}
	btn.addEventListener('click', () => {
		restartTimer();
		resetCells();
	});

	cells.forEach((cell, index) => {
		cell.addEventListener('focus', () => cell.select());
		cell.addEventListener('input', () => {
			cell.value = cell.value.slice(-1);
			if (cell.value && index < cells.length - 1) cells[index + 1].focus();
		});
		cell.addEventListener('keydown', (e) => {
			if (e.ctrlKey || e.metaKey) return;
			if (!/^\d$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) e.preventDefault();
			if (e.key === 'Backspace') {
				if (cell.value) cell.value = '';
				else if (index > 0) cells[index - 1].focus();
				e.preventDefault();
			}
		});
		cell.addEventListener('paste', (e) => {
			e.preventDefault();
			const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, cells.length).split('');
			digits.forEach((digit, i) => { if (cells[index + i]) cells[index + i].value = digit; });
			document.activeElement.blur();
		});
	});

	_restartTimer = restartTimer;
}

export function setInvalid(el, isInvalid) {
	el.classList.toggle('otp_invalid', isInvalid);
}

export function restartOtpTimer() {
	_restartTimer?.();
}

export function updatePhone(phone) {
	document.querySelector('.otp__phone').textContent = normalizePhone(phone)
}