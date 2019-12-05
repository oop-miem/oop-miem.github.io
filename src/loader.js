const saveHash = () => {if (state.safe) location.replace(`#l${state.work+1}v${state.variant+1}`)}
function showVariant(index) {
	document.getElementById('var_selector').selectedIndex = index;
	document.querySelectorAll('[v]').forEach(x => {with (x.classList)(x.getAttribute('v').split(' ').includes(`${index+1}`) ? remove('hidden') : add('hidden'))})
	state.variant = index
	saveHash()
}
const changeVariant = event => showVariant(event.target.selectedIndex)
function showTab(index) {
	document.querySelectorAll('.tab').forEach((x, i) => i == index ? x.classList.add('current') : x.classList.remove('current'));
	if (index < 2)
		with (document.getElementsByClassName('work')[index])
			insertBefore(document.getElementById('var_header'), firstChild)
	if (window.pageYOffset >= document.getElementById('work_container').offsetTop)
		document.getElementById('work_container').scrollIntoView({block: "start"})
	document.body.style.setProperty('--index', index)
	state.work = index
	saveHash()
}
function onLoad() {
	document.querySelectorAll('a').forEach(x => x.setAttribute('target', '_blank'))
	document.querySelectorAll('.spoiler').forEach(x => (x.onclick = (() => x.classList.toggle('closed')))())
	document.querySelectorAll('.tab').forEach((x, i) => x.onclick = () => showTab(i))
	with (document.getElementById('var_selector'))
		[...Array(15).keys()].forEach(x => {let o = document.createElement('option'); o.innerText = x+1; appendChild(o)})
	relocate()
}
function relocate() {
	const info = /^#l(\d)v(\d+)/.exec(location.hash)
	const bound = (a, b, c) => Math.max(a, Math.min(b, c))
	state = info ? {work: bound(0, info[1]-1, 2), variant: bound(0, info[2]-1, 14)} : {work: 1, variant: 0}
	state.safe = false
	showTab(state.work)
	showVariant(state.variant)
	state.safe = true
	if (!info)
		saveHash()
}