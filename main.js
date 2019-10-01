function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}

// ^ yay, stackoverflow

chrome.storage.local.get(["enabled"], function(items) {
	
	if (!items.hasOwnProperty("enabled")){
		chrome.storage.local.set({"enabled": true});
	} else {
		if (!items.enabled) return
	}
	
	checkElement('#player').then(() => {
		document.querySelector('#themovieDiv').remove(); // ხო, ძაან მარტივია :D 
	});
});
