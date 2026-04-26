import { preventZoomIOS } from "@js/utils";
import IMask from "imask";

// відключення авто-зуму в IOS для полів з розміром шрифту менше 16px
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
isIOS && preventZoomIOS()

// маска телефону
document.querySelectorAll('[data-phone-mask]').forEach(input => {
	const phoneMask = IMask(input, {
		mask: "+{38\\0} (00) 000-00-00",
		lazy: false,
	});

	function updatePhoneMaskValidity() {
		input.setCustomValidity(
			phoneMask.masked.isComplete ? "" : "Будь ласка, введіть повний номер телефону"
		);
	}

	phoneMask.on("accept", updatePhoneMaskValidity);
	updatePhoneMaskValidity();
});
