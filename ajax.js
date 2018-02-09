function elementIsEmpty(element) {
	return !element.innerHTML.length;
}

function toggleDisplay(element) {
	if(element.style.display!=='none')
		element.style.display='none';
	else
		element.style.display='block';
}

// insert  file content on server with name serverFile into element with targetId
function requestDiv(targetId,serverFile) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		document.getElementById(targetId).innerHTML =
		this.responseText;
	  }
	};
	xhttp.open("GET", serverFile, true);
	xhttp.send();
}


function loadElement(elementId) {
	let element = document.getElementById(elementId);
	if(!elementIsEmpty(element)) {
		toggleDisplay(element);
		return false;
	}
	requestDiv(elementId,elementId+'.xml');
	return true;
}