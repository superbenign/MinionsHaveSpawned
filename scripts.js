// Javascript portion of MinionsHaveSpawned Jungle Timer Web App

var max_channels = 10;
var audiochannels = new Array();
var buffs = {};
var a;
for (a = 0; a < max_channels; a++) {
    audiochannels[a] = new Array();
    audiochannels[a]['channel'] = new Audio();
    audiochannels[a]['finished'] = 0;
}

buffs['ourbluebuff'] = {};
buffs['ourredbuff'] = {};
buffs['baron'] = {};
buffs['dragon'] = {};
buffs['theirbluebuff'] = {};
buffs['theirredbuff'] = {};

buffs['ourbluebuff']['endTime'] = 0;
buffs['ourredbuff']['endTime'] = 0;
buffs['baron']['endTime'] = 0;
buffs['dragon']['endTime'] = 0;
buffs['theirbluebuff']['endTime'] = 0;
buffs['theirredbuff']['endTime'] = 0;

buffs['ourbluebuff']['soonAudio'] = "yourBlueSoonAudio";
buffs['ourredbuff']['soonAudio'] = "yourRedSoonAudio";
buffs['baron']['soonAudio'] = "baronSoonAudio";
buffs['dragon']['soonAudio'] = "dragonSoonAudio";
buffs['theirbluebuff']['soonAudio'] = "enemyBlueSoonAudio";
buffs['theirredbuff']['soonAudio'] = "enemyRedSoonAudio";

buffs['ourbluebuff']['respawnAudio'] = "yourBlueRespawnAudio";
buffs['ourredbuff']['respawnAudio'] = "yourRedRespawnAudio";
buffs['baron']['respawnAudio'] = "baronRespawnAudio";
buffs['dragon']['respawnAudio'] = "dragonRespawnAudio";
buffs['theirbluebuff']['respawnAudio'] = "enemyBlueRespawnAudio";
buffs['theirredbuff']['respawnAudio'] = "enemyRedRespawnAudio";

buffs['ourbluebuff']['text'] = "Blue";
buffs['ourredbuff']['text'] = "Red";
buffs['baron']['text'] = "Baron";
buffs['dragon']['text'] = "Dragon";
buffs['theirbluebuff']['text'] = "Blue";
buffs['theirredbuff']['text'] = "Red";

buffs['ourbluebuff']['warned'] = 0;
buffs['ourredbuff']['warned'] = 0;
buffs['baron']['warned'] = 0;
buffs['dragon']['warned'] = 0;
buffs['theirbluebuff']['warned'] = 0;
buffs['theirredbuff']['warned'] = 0;

function playSound(elemID) {
    var d = new Date();
    var curTime = d.getTime();
    var i;

    for (i = 0; i < audiochannels.length; i++) {
	if (audiochannels[i]['finished'] < curTime) {
	    audiochannels[i]['finished'] = curTime + 
		document.getElementById(elemID).duration * 1000;
	    audiochannels[i]['channel'].src = 
		document.getElementById(elemID).src;
	    audiochannels[i]['channel'].load();
	    audiochannels[i]['channel'].play();
	    break;
	}
    }
}

function changeText(elemID, newText) {
    var buff = document.getElementById(elemID);
    while(buff.childNodes.length >= 1) {
	buff.removeChild(buff.firstChild);
    }
    buff.appendChild(buff.ownerDocument.createTextNode(newText));
}

function activateCooldown(elemID, waitTime) {
    var d = new Date();
    var endTime = d.getTime() + waitTime;

    if (buffs[elemID]['endTime'] != 0) {
	buffs[elemID]['endTime'] = 0;
    } else {
	buffs[elemID]['endTime'] = d.getTime() + waitTime;
	runTimer(elemID);
    }
}

function runTimer(elemID) {
    var d = new Date();
    var t = d.getTime();
    var timeLeft = 0;
    var endTime;
    var text;

    if (t < buffs[elemID]['endTime']) {
	timeLeft = (buffs[elemID]['endTime'] - t) / 1000;
	changeText(elemID, timeLeft.toFixed(0));
	if (timeLeft < 30 && buffs[elemID]['warned'] != 1) {
	    buffs[elemID]['warned'] = 1;
	    playSound(buffs[elemID]['soonAudio']);
	}
	


	setTimeout(function() {runTimer(elemID);}, 300);
    } else {
	if (buffs[elemID]['endTime'] != 0) {
	    buffs[elemID]['endTime'] = 0;
	    playSound(buffs[elemID]['respawnAudio']);
	}
	buffs[elemID]['warned'] = 0;
	changeText(elemID, buffs[elemID]['text']);
    }
}
