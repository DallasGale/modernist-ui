/**
 * 
 * @param {Element} targetNode - document.querySelector('body') or document.getElementById('app)
 * 
 * @param {Function} outputFn - Use arrrow unction. eg () => myFunction()
 */

const ChangeObserver = (targetNode, outputFn) => {
	// console.log('targetNode', targetNode)
	const config = {
		attributes: true,
	}
	const callback = (mutationsList) => {
		for (let mutation of mutationsList) {
			if (mutation.type === 'attributes') {
				// console.log('mutation type: ', mutation.attributeName)
				outputFn()
			}
		}
	}

	const observer = new MutationObserver(callback)
	observer.observe(targetNode, config)
}

export default ChangeObserver
