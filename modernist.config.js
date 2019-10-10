function handleAccent() {
	if (localStorage.accent === null || typeof 'undefined') {
		return '#ccc'
	} else {
		return localStorage.accent
	}
}
export default {
	theme: {
		//  The only color allowed.
		accentColor: handleAccent(),

		// ? Mode: 'brand, 'negative' or 'positive'
		mode: localStorage.toggledTheme,
	}
}
