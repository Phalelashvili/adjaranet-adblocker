function increaseCount(){
    chrome.storage.local.get(["adsBlocked"], function(items) {
        chrome.storage.local.set({"adsBlocked": items.adsBlocked + 1})
    })
}

function blockRequest() {
    increaseCount();
    return {cancel: true};
}

function updateFilters(urls) {
    if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
        chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
        
    chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: urls}, ['blocking']);    
}

chrome.storage.local.get(["adsBlocked"], function(items) {
	if (!items.hasOwnProperty('adsBlocked')) chrome.storage.local.set({"adsBlocked": 0})
})

fetch('https://steamboost.ge/ads.json').then(r => r.json()).then(response => {
    updateFilters(response.ads)
})