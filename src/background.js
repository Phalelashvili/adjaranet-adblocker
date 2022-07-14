const ADS_URL = 'https://phalelashvili.dev/adjaranet-adblocker/ads-v3.json';

function setLastUpdate(lastUpdate){
    console.log("last update:", lastUpdate)
    chrome.storage.local.set({"lastUpdate": lastUpdate})
}

function updateRules(rules){
    console.log("blocking", rules);
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules,
        // in case extension is reloaded, dynamically added rules should be removed first
        removeRuleIds: rules.map(rule => rule.id)
    });
}

function deserializeResponse(response){
    if (response.status !== 200)
        throw `${response.url} returned http ${response.status}`;

    return response.json();
}

function handleResponseContent(content) {
    setLastUpdate(content.last_update);
    updateRules(content.rules);
}

fetch(ADS_URL).then(deserializeResponse).then(handleResponseContent);
