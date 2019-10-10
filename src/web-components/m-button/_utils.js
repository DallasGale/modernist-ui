import { colors, modeTypes } from '../../js/init_state'
import { colorPicker } from '../../js/helpers'

/**
 * 
 * @param {String} buttonMode - Button attribute. eg <button mode='primary' />.
 * @param {String} accentColor - User defined accent HEX color.
 */
export const setButtonBackground = (buttonMode, accentColor) => {
	if (buttonMode === modeTypes.accent.name) return accentColor
	if (buttonMode === modeTypes.dark.name) return colors.dark
	if (buttonMode === modeTypes.light.name) return colors.light
}

/**
 * 
 * @param {String} siteMode - User defined mode assigned  to the <body /> 'mode' attr. via ./constants.js
 * @param {String} buttonMode - Button attribute. eg <button mode='primary' />.
 * @param {String} accentColor - User defined accent HEX color. 
 */
export const setButtonBorderColor = (siteMode, buttonMode, accentColor) => {
	// * An 'accent' background and button.
	if (siteMode === 'accent' && buttonMode === 'accent') {
		console.log('hit it')
		const color = colorPicker(accentColor)
		return color
	}
	// * An not 'accent' background but 'accent' button.
	if (siteMode !== 'accent' && buttonMode === 'accent') {
		const color = 'transparent'
		return color
	}


	// * A 'light' background and button.
	if (siteMode === 'light' && buttonMode === 'light') {
		const color = colorPicker(accentColor)
		return color
	}
	// * A not a 'light' background but 'light' button.
	if (siteMode !== 'light' && buttonMode === 'light') {
		const color = 'transparent'
		return color
	}
}


// * Set styles for 'focus' and 'mouseover' events.

/**
 * 
 * @param {Element} button  - this Element
 * @param {String} background - Button background color
 * @param {String} color - Button color
 */
export const activeButtonStyle = (button, background, borderColor, color) => {
	let thisButton = button.shadowRoot.querySelector('button')
	thisButton.style.background = background
	thisButton.style.bordrColor = borderColor
	thisButton.style.color = color
}

/**
 * 
 * @param {Element} button  - this Element
 * @param {String} background - Button background color
 * @param {String} color - Button color
 */
export const defaultButtonStyle = (button, background, color) => {
	let thisButton = button.shadowRoot.querySelector('button')
	thisButton.style.background = background
	thisButton.style.color = color
}

/**
 * 
 * @param {Element} button - this Element
 * @param {String} accent - User defined accent color
 */
export const setAccentButtonStyleReset = (button, accent, border) => {
	button.style.borderColor = accent
	button.style.background = accent
	button.style.color = colorPicker(button.style.background)
	button.style.borderColor = border
}


/**
 * 
 * @param {Element} button 
 * @param {String} background 
 * @param {String} accent 
 * @param {String} borderColor 
 */
export const setButtonStyle = (button, background, color, borderColor) => {
	let thisButton = button.shadowRoot.querySelector('button')
	thisButton.style.background = background
	thisButton.style.color = color
	thisButton.style.borderColor = borderColor
}


/**
 * 
 * @param {Element} el - this
 * @param {Element} root - body
 * @param {String} accent - color
 * @param {String} activeBackground - color
 * @param {String} activeColors - color
 */
export const handleButtonFocusMouseOver = (el, root, accent, activeBackground, activeColors) => {
	let buttonShadowRoot = el.shadowRoot.querySelector('button')
	accent = root.getAttribute('dev-accent')

	// * A 'ACCENT' background and 'ACCENT' Button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'accent') {
		setButtonStyle(el, colorPicker(accent), accent, colorPicker(accent))
	}

	// * An 'ACCENT' background and 'light' button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'light') {
		setButtonStyle(el, colors.dark, colors.light, colors.dark)
	}

	// * An 'ACCENT' background and 'dark' button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'dark') {
		setButtonStyle(el, activeBackground, colors.dark, 'transparent')
	}

	// * A 'light' background and 'ACCENT' Button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'accent') {
		let button = el.shadowRoot.querySelector('button')
		// ? If accent is too light make background dark
		if (button.style.color === '#fff' || button.style.color === 'rgb(255, 255, 255)') {
			setButtonStyle(el, colorPicker(accent), accent, accent)
		} else {
			setButtonStyle(el, colorPicker(accent), accent, colors.light)
		}
	}

	// * A 'light' background and 'dark' Button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'dark') {
		setButtonStyle(el, colors.light, colors.dark, colors.dark)
	}

	// * A 'light' background and 'light' Button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'light') {
		buttonShadowRoot.style.borderColor = colors.dark
		buttonShadowRoot.style.background = colors.dark
		buttonShadowRoot.style.color = colors.light
	}

	// * A 'dark' background and 'ACCENT' Button.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'accent') {
		let button = el.shadowRoot.querySelector('button')
		// ? If accent is too light make background dark
		if (button.style.color === '#000' || button.style.color === 'rgb(0, 0, 0)') {
			buttonShadowRoot.style.borderColor = accent
			buttonShadowRoot.style.background = colors.dark
			buttonShadowRoot.style.color = accent
		} else {
			buttonShadowRoot.style.borderColor = colors.light
			buttonShadowRoot.style.background = colors.light
			buttonShadowRoot.style.color = accent
		}
	}

	// * A 'dark' background and 'dark' buttons.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'dark') {
		setButtonStyle(el, colors.light, colors.dark, colors.light)
	}

	// * A 'dark' background and 'light' buttons.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'light') {
		buttonShadowRoot.style.borderColor = colors.light
		buttonShadowRoot.style.background = colors.dark
		buttonShadowRoot.style.color = colors.light
	}
}


/**
 * 
 * @param {Element} el - this 
 * @param {Element} root - body
 * @param {String} accent - color
 */
export const handleButtonFocusMouseOut = (el, root, accent) => {
	let buttonShadowRoot = el.shadowRoot.querySelector('button')
	accent = root.getAttribute('dev-accent')

	// * A 'ACCENT' background and 'ACCENT' Button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'accent') {
		buttonShadowRoot.style.borderColor = accent
		buttonShadowRoot.style.background = accent
		buttonShadowRoot.style.color = colorPicker(buttonShadowRoot.style.background)
		buttonShadowRoot.style.borderColor = colorPicker(buttonShadowRoot.style.background)
	}

	// * A 'ACCENT' background and 'dark' Button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'dark') {
		setButtonStyle(el, colors.dark, colors.light, colors.dark)
	}

	// * An 'ACCENT' background and 'light' button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'light') {
		setButtonStyle(el, colors.light, colors.dark, 'transparent')
	}

	// * A 'light' background and 'light' button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'light') {
		setButtonStyle(el, colors.light, colors.dark, colors.dark)
	}

	// * A 'light' background and 'dark' button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'dark') {
		setButtonStyle(el, colors.dark, colors.light, colors.dark)
	}

	// * A 'light' background and 'ACCENT' Button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'accent') {
		setAccentButtonStyleReset(buttonShadowRoot, accent, accent)
	}

	// * A 'dark' background and 'light' button.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'light') {
		setButtonStyle(el, colors.light, colors.dark, colors.light)
	}
	// * A 'dark' background and 'dark' button.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'dark') {
		setButtonStyle(el, colors.dark, colors.light, colors.light)
	}

	// * A 'dark' background and 'ACCENT' Button.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'accent') {
		setAccentButtonStyleReset(buttonShadowRoot, accent, accent)
		buttonShadowRoot.style.borderColor = accent
	}

}

/**
 * 
 * @param {Element} root - Body
 * @param {ELement} el  Web Component
 * @param {Element} shadowEl = Button
 * @param {String} siteTheme - Mode
 * @param {String} buttonMode - Mode
 * @param {String} accent - Color
 */

export const setButtonBorderColorFromBodyMode = (root, el, shadowEl, siteTheme, buttonMode, accent) => {
	// ? <body mode='ACCENT'>
	// * Set complimentary color to accent button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'accent') {
		shadowEl.style.borderColor = colorPicker(shadowEl.style.background)
	}

	// ! <body mode='ACCENT'>
	if (root.getAttribute('mode') !== 'accent' && el.getAttribute('mode') === 'accent') {
		shadowEl.style.borderColor = 'transparent'
	}


	// * Set 'dark' border to 'dark' button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'dark') {
		shadowEl.style.borderColor = colors.dark
	}

	// * Set 'dark' border to light button.
	if (root.getAttribute('mode') === 'accent' && el.getAttribute('mode') === 'light') {
		shadowEl.style.borderColor = 'transparent'
	}

	// ! <body mode='dark'>
	// * Set 'light' border to 'dark' button.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'dark') {
		shadowEl.style.borderColor = colors.light
	}
	// * Set 'light' border to 'light' button.
	if (root.getAttribute('mode') === 'dark' && el.getAttribute('mode') === 'light') {
		shadowEl.style.borderColor = colors.light
	}


	// ! <body mode='light'>
	// * Set 'dark' border to 'light' button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'light') {
		shadowEl.style.borderColor = colors.dark
	}


	// * Set 'dark' border to 'dark' button.
	if (root.getAttribute('mode') === 'light' && el.getAttribute('mode') === 'dark') {
		shadowEl.style.borderColor = colors.dark
	}
}