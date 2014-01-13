// Javascript portion of MinionsHaveSpawned Jungle Timer Web App

function changeText(elemID, waitTime, newText) {
    setTimeout(function() {changeTextNow(elemID, newText);}, waitTime);
}

function changeTextNow(elemID, newText) {
    var buff = document.getElementById(elemID);
    while(buff.childNodes.length >= 1) {
	buff.removeChild(buff.firstChild);
    }
    buff.appendChild(buff.ownerDocument.createTextNode(newText));
}

