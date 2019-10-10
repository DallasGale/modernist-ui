import { colorPicker } from './helpers'
import UserTheme from '~/modernist.config.js'
import ChangeObserver from '../_utils/change_observer'

const { DEVELOPING_PROJECT } = process.env

// if (DEVELOPING_PROJECT) {
// 	const localStorage = window.localStorage
// 	localStorage.setItem('accent', '#ff3985')
// }

export const colors = {
	dark: '#000000',
	light: '#ffffff'
}


function developingOrPublishing() {
	if (DEVELOPING_PROJECT) {
		return localStorage.accent
	} else {
		return UserTheme.theme.accentColor
	}
}

export const siteTheme = {
	accent: developingOrPublishing(),
	// mode: localStorage.toggledTheme,
}


export const modeTypes = {
	accent: {
		name: 'accent',
	},
	light: {
		name: 'light',
	},
	dark: {
		name: 'dark',
	}
}


// ? Set global style to DOM
const body = document.querySelector('body')
body.setAttribute('dev-accent', siteTheme.accent)
body.style.background = siteTheme.accent

const header = document.querySelector('header')
header.style.background = siteTheme.accent

function setBackgroundColor() {
	if (body.getAttribute('mode') === 'accent' && DEVELOPING_PROJECT) {
		let devAccent = body.getAttribute('dev-accent')
		return devAccent
	}

	if (body.getAttribute('mode') === 'accent' && !DEVELOPING_PROJECT) {
		return siteTheme.accent
	}

	if (body.getAttribute('mode') === 'light') {
		return colors.light
	}

	if (body.getAttribute('mode') === 'dark') {
		return colors.dark
	}
}


// ? Obseve <body /> for 'mode' attr. changes and then re-render the page with Mutation Observer.

function handleBodyObserver() {
	body.style.background = setBackgroundColor()
	body.style.color = colorPicker(body.style.background)
	body.style.borderColor = colorPicker(body.style.background)
}
ChangeObserver(body, () => handleBodyObserver())

function handleHeaderBackground() {
	body.style.background = setBackgroundColor()
	header.style.color = setBackgroundColor()
	header.style.background = colorPicker(body.style.background)
}
ChangeObserver(body, () => handleHeaderBackground())

// ? Obseve <input type="color" /> for 'value' attr. changes and then update the 'accent' color
if (DEVELOPING_PROJECT) {
	const picker = document.getElementById('accent-color-picker')

	ChangeObserver(picker, picker.addEventListener('change', () => {
		body.setAttribute('dev-accent', picker.value)
		body.style.background = picker.value
	})
	)
}

