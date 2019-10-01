function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
};

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
};

function monkeyPatch(history){ 
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        // ... whatever else you want to do
        // maybe call onhashchange e.handler
        return pushState.apply(history, arguments);
    };
};

// ^ yay, stackoverflow

function patch(){
    checkElement('#player').then(() => {
		document.querySelector('#themovieDiv').remove(); // ხო, ძაან მარტივია :D 
	});
}

chrome.storage.local.get(["enabled"], function(items) {
	
	if (!items.hasOwnProperty("enabled")){
		chrome.storage.local.set({"enabled": true});
	} else {
		if (!items.enabled) return
    }

    var script = document.createElement('script');
    
    script.textContent = monkeyPatch.toString();
    script.textContent += rafAsync.toString()
    script.textContent += checkElement.toString();
    script.textContent += patch.toString();
    script.textContent += "monkeyPatch(window.history);";
    script.textContent += "window.onpopstate = history.onpushstate = patch;";
    script.textContent += "patch();";

    document.body.appendChild(script);
});
