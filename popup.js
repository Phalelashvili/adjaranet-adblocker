chrome.storage.local.get(["adsBlocked"], function(items){
    document.getElementById('adsBlocked').innerText = items.adsBlocked;
});