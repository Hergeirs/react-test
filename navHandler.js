function onload () {
	let nav = document.getElementsByTagName('nav')[0];
	nav.addEventListener('click',handleNavAction,true);
}

function handleNavAction(e) {
	e = e || window.event;	// defineri eventina.
	let clickedOn = e.target || e.srcElement;
	if(clickedOn.tagName==='li')
		clickedOn=clickedOn.firstChild;
	let activeClassString = 'active-nav';
	let currentActiveNav = document.getElementsByClassName(activeClassString)[0];
	if(!!currentActiveNav) {	// um onnur hevur veri activ áðrenn
		loadElement(currentActiveNav.dataset.xmlName);
		currentActiveNav.classList.remove(activeClassString);
	}		
	clickedOn.classList.add(activeClassString);
	loadElement(clickedOn.dataset.xmlName);
}

window.addEventListener('load',onload,false);

