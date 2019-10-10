import ChangeObserver from '../_utils/change_observer'
const body = document.querySelector('body')
const defaultMode = body.getAttribute('mode')
const devAccent = body.getAttribute('dev-accent')
const hexView = document.getElementById('hex')
const widget = document.getElementById('config-widget')
const radios = widget.querySelectorAll('input[type=radio]')




// * Color picker
hexView.value = devAccent
hexView.addEventListener('click', () => {
	hexView.select()
	hexView.setSelectionRange(0, 9999)

	document.execCommand('copy')
})


// * Display picked color hex
const displayHexValue = () => {
	let hexValue = document.getElementById('hex')
	let devAccent = body.getAttribute('dev-accent')
	let colorPicker = document.getElementById('color-picker')
	hexValue.value = devAccent

	localStorage.clear('accent')
	localStorage.setItem('accent', hexValue.value)
	colorPicker.value = localStorage.accent

}

ChangeObserver(body, () => displayHexValue())



// * Theme toggler
radios.forEach(radio => {
	if (radio.value === localStorage.toggledValue) {
		radio.setAttribute('checked', true)
		console.log(radio.value)
		localStorage.setItem('toggledTheme', radio.value)
	}
	radio.addEventListener('click', () => {
		body.setAttribute('mode', radio.value.toLowerCase())
		localStorage.setItem('toggledTheme', radio.value)
		console.log(radio.value)
		console.log('localStorage', localStorage)
	})

	// localStorage.setItem('toggledTheme', toggledValue) = 
})


