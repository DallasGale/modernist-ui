import { siteTheme } from '../../js/init_state'
import {
	setButtonBackground,
	setButtonBorderColor,
	handleButtonFocusMouseOver,
	handleButtonFocusMouseOut,
	setButtonBorderColorFromBodyMode
} from './_utils'
import { colorPicker } from '../../js/helpers'
import ChangeObserver from '../../_utils/change_observer'

const body = document.querySelector('body')
const { DEVELOPING_PROJECT } = process.env

// * Modern Button Template + styles
const template = document.createElement('template')
template.innerHTML = `
	<style>
		.modern-button {
			border-style: solid;
			border-radius: 0px;
			border-width: 3px;
			border-color: transparent;
			box-sizing: border-box;
			cursor: pointer;
			display: inline-block;
			font-size: 1.4rem;
			font-weight: normal;
			letter-spacing: 1px;
			font-family: $fontFamily;
			margin-bottom: 1rem;
			min-width: 10vw;
			overflow: hidden;
			padding: 1.2rem 3rem;
			position: relative;
			text-transform: uppercase;
		}
	</style>
	
	<button class="modern-button">button label</button>
`

let accent = null

if (DEVELOPING_PROJECT) accent = body.getAttribute('dev-accent')
else accent = siteTheme.accent


// * Start Button Class
class MButton extends HTMLElement {
	constructor() {
		super()

		// * Assign template to a constant
		const button = template.content.querySelector('button')

		// * Set label text
		const label = this.textContent
		button.textContent = label

		// * Grab the 'theme' attr from the actual DOM wrapper element '<swiss-button'>
		const buttonMode = this.getAttribute('mode')

		// * Apply CSS
		const bs = button.style
		bs.background = setButtonBackground(buttonMode, accent)
		bs.color = colorPicker(bs.background)
		bs.borderColor = setButtonBorderColor(siteTheme.mode, buttonMode, accent)

		const activeButtonBackground = bs.color
		const activeButtonColor = bs.background


		this.addEventListener('mouseover', () => {
			handleButtonFocusMouseOver(this, body, accent, activeButtonBackground, activeButtonColor)
		})

		this.addEventListener('focus', () => {
			handleButtonFocusMouseOver(this, body, accent, activeButtonBackground, activeButtonColor)
		})

		this.addEventListener('focusout', () => {
			handleButtonFocusMouseOut(this, body, accent)
		})

		this.addEventListener('mouseout', () => {
			handleButtonFocusMouseOut(this, body, accent)
		})

		// * Shadow DOM
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(template.content.cloneNode(true))

		// * Handle <body /> attr changes and react to them in the DOM
		// * Update button border colors to match the user chosen mode.
		// ? ie: if <body mode="accent"... then the <button mode="accent"... will have a border off 'dark'

		const thisButton = this
		const thisButtonShadow = this.shadowRoot.querySelector('button')

		ChangeObserver(body, () => setButtonBorderColorFromBodyMode(body, thisButton, thisButtonShadow, siteTheme.mode, buttonMode, accent))



		function accentColor() {
			if (thisButton.getAttribute('mode') === 'accent') {
				let devAccent = body.getAttribute('dev-accent')
				thisButtonShadow.style.background = devAccent
				thisButtonShadow.style.color = colorPicker(thisButtonShadow.style.background)
				accent = body.style.background
			}
		}

		if (DEVELOPING_PROJECT) {
			ChangeObserver(body, () => accentColor())
		}
	}
}

customElements.define('m-button', MButton)