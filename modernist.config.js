export default {
	theme: {
		accent: handleAccent(),
		dark: '#000',
		light: '#fff',
		mode: localStorage.toggledTheme,
	}
}

function handleAccent() {
	if (localStorage.accent === null || typeof 'undefined') {
		return '#ccc'
	} else {
		return localStorage.accent
	}
}