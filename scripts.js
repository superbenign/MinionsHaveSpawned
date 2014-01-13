// Javascript portion of MinionsHaveSpawned Jungle Timer Web App

var ourBlueEndTime = 0;
var ourRedEndTime = 0;
var baronEndTime = 0;
var dragonEndTime = 0;
var theirBlueEndTime = 0;
var theirRedEndTime = 0;

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

function activateCooldown(elemID, waitTime) {
    var d = new Date();
    var endTime = d.getTime() + waitTime;

    if (elemID.localeCompare('ourbluebuff') == 0) {
	if (ourBlueEndTime != 0) {
	    ourBlueEndTime = 0;
	} else {
	    ourBlueEndTime = d.getTime() + waitTime;
	    runTimer(elemID);
	}
    } 
    if (elemID.localeCompare('ourredbuff') == 0) {
	if (ourRedEndTime != 0) {
	    ourRedEndTime = 0;
	} else {
	    ourRedEndTime = d.getTime() + waitTime;
	    runTimer(elemID);
	}
    } 
    if (elemID.localeCompare('baron') == 0) {
	if (baronEndTime != 0) {
	    baronEndTime = 0;
	} else {
	    baronEndTime = d.getTime() + waitTime;
	    runTimer(elemID);
	}
    } 
    if (elemID.localeCompare('dragon') == 0) {
	if (dragonEndTime != 0) {
	    dragonEndTime = 0;
	} else {
	    dragonEndTime = d.getTime() + waitTime;
	    runTimer(elemID);
	}
    } 
    if (elemID.localeCompare('theirbluebuff') == 0) {
	if (theirBlueEndTime != 0) {
	    theirBlueEndTime = 0;
	} else {
	    theirBlueEndTime = d.getTime() + waitTime;
	    runTimer(elemID);
	}
    } 
    if (elemID.localeCompare('theirredbuff') == 0) {
	if (theirRedEndTime != 0) {
	    theirRedEndTime = 0;
	} else {
	    theirRedEndTime = d.getTime() + waitTime;
	    runTimer(elemID);
	}
    } 
}

function runTimer(elemID) {
    var d = new Date();
    var t = d.getTime();
    var timeLeft = 0;
    var endTime;
    var text;

    if (elemID.localeCompare('ourbluebuff') == 0) {
	endTime = ourBlueEndTime;
	text = 'Blue';
    }
    if (elemID.localeCompare('ourredbuff') == 0) {
	endTime = ourRedEndTime;
	text = 'Red';
    }
    if (elemID.localeCompare('baron') == 0) {
	endTime = baronEndTime;
	text = 'Baron';
    }
    if (elemID.localeCompare('dragon') == 0) {
	endTime = dragonEndTime;
	text = 'Dragon';
    }
    if (elemID.localeCompare('theirbluebuff') == 0) {
	endTime = theirBlueEndTime;
	text = 'Blue';
    }
    if (elemID.localeCompare('theirredbuff') == 0) {
	endTime = theirRedEndTime;
	text = 'Red';
    }
    if (t < endTime) {
	timeLeft = (endTime - t) / 1000;
	changeTextNow(elemID, timeLeft.toFixed(0));

	setTimeout(function() {runTimer(elemID, text, endTime);}, 300);
    } else {
	changeTextNow(elemID, text);
    }
}
