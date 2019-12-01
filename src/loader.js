const showVar = index => document.querySelectorAll('[v]').forEach(x => {with (x.classList)(x.getAttribute('v').split(' ').includes(`${index+1}`) ? remove('hidden') : add('hidden'))})
const changeVar = event => showVar(event.target.selectedIndex)
function onLoad() {
document.querySelectorAll('a').forEach(x => x.setAttribute('target', '_blank'))
document.getElementById('problems').setAttribute('style', 'list-style: none;')
document.querySelectorAll('.nojs').forEach(x => x.classList.toggle('hidden'))
document.querySelectorAll('[hint]').forEach(x => x.removeAttribute('hint'))
document.querySelectorAll('.spoiler').forEach(x => (x.onclick = (() => x.classList.toggle('closed')))())
with (document.getElementById('selector')) [...Array(15).keys()].forEach(x => {let o = document.createElement('option'); o.innerText = x+1; o.value="#test"; appendChild(o)})
showVar(0)
}