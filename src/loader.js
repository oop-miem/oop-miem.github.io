const saveHash = () => {if (state.safe) location.replace(`#l${state.work+1}v${state.variant+1}`)}
function showVariant(index) {
	document.querySelectorAll('.var-selector').forEach(x => x.selectedIndex = index);
	document.querySelectorAll('[v]').forEach(x => {with (x.classList)(x.getAttribute('v').split(' ').includes(`${index+1}`) ? remove('hidden') : add('hidden'))})
	state.variant = index
	saveHash()
}
const changeVariant = event => showVariant(event.target.selectedIndex)
function showTab(index) {
	document.querySelectorAll('.tab').forEach((x, i) => i == index ? x.classList.add('current') : x.classList.remove('current'));
	if (window.pageYOffset >= document.getElementById('work-container').offsetTop)
		document.getElementById('work-container').scrollIntoView(true)
	document.body.style.setProperty('--index', index)
	state.work = index
	saveHash()
}
function onLoad() {
	document.documentElement.className = 'js'
	document.querySelectorAll('a').forEach((x, i) =>
		x.className == 'tab'
			? (x.removeAttribute("href"), x.onclick = () => showTab(i))
			: x.setAttribute('target', '_blank'))
	document.querySelectorAll('.spoiler').forEach(x => (x.onclick = (() => x.classList.toggle('closed')))())
	document.querySelectorAll('.var-selector').forEach(x => 
		[...Array(15).keys()].forEach(n => {
			let o = document.createElement('option')
			o.innerText = n+1
			x.appendChild(o)}))
	relocate()
}
function relocate() {
	const info = /^#l(\d)v?(\d+)?/.exec(location.hash)
	const bound = (a, b, c) => Math.max(a, Math.min(b, c))
	state = {work: info ? bound(0, info[1]-1, 2) : 1, variant: info && info[2] ? bound(0, info[2]-1, 14) : 0}
	state.safe = false
	showTab(state.work)
	showVariant(state.variant)
	state.safe = true
	if (!info)
		saveHash()
}