import { restartOtpTimer } from "@components/OTP/otp"

export function nextStep() {
	const STEP_ACTIVE_CLASSNAME = 'phone-login__step_active'
	const currentStep = document.querySelector(`.${STEP_ACTIVE_CLASSNAME}`)
	const nextStep = currentStep.nextElementSibling

	currentStep.classList.remove(STEP_ACTIVE_CLASSNAME)
	nextStep.classList.add(STEP_ACTIVE_CLASSNAME)
	restartOtpTimer()
}