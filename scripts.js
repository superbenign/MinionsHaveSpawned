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

function activateCooldown(elemID, text, waitTime) {
    var d = new Date();
    var endTime = d.getTime() + waitTime;

    runTimer(elemID, text, endTime);
}

function runTimer(elemID, text, endTime) {
    var d = new Date();
    var t = d.getTime();
    var timeLeft = 0;

    if (t < endTime) {
	timeLeft = (endTime - t) / 1000;
	changeTextNow(elemID, timeLeft.toFixed(0));

	setTimeout(function() {runTimer(elemID, text, endTime);}, 500);
    } else {
	changeTextNow(elemID, text);
    }
}
