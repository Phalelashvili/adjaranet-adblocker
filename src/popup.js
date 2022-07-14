chrome.storage.local.get(["lastUpdate"], function (items) {
    document.getElementById('lastUpdate').innerText = items.lastUpdate ?? "-";
});