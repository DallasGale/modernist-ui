// ? Import user settings config and assign them.
// import UserConfig from '~/modern.config'
import './js/_config_widget'
import './sass/app.scss'


// ? Header

// ? Buttons
import './web-components/m-button/examples'

// ? Dropdown
import './web-components/nav-dropdown'

// ?Navigation

// Grid

// Side menu

// Typography ... H1 -> H6

// Images

// Lists

// Modals

// Form fields

// Branding


// const { theme } = UserConfig
// const { mode } = theme

const body = document.querySelector('body')

body.setAttribute('mode', localStorage.toggledTheme)

const header = document.querySelector('header')
const title = document.title
const heading = `<h1 class="site-title">${title}</h1>`

header.insertAdjacentHTML('afterBegin', `${heading}`)