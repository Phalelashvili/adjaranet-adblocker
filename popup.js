document.getElementById("id-name--1").addEventListener("click", function(){
        chrome.storage.local.set({"enabled": document.getElementById('id-name--1').checked});
});

chrome.storage.local.get(["enabled"], function(items){
    document.getElementById('id-name--1').checked = items.enabled;
});