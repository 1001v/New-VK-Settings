if (localStorage['settings'] === undefined) {
  chrome.tabs.create({
      url: "/html/settings.html"
  });
}

if (localStorage['lastKnowVersion'] === undefined || localStorage['lastKnowVersion'] !== chrome.runtime.getManifest().version) {
    localStorage['lastKnowVersion'] = chrome.runtime.getManifest().version;
    chrome.browserAction.setBadgeBackgroundColor({color: "red"});
    chrome.browserAction.setBadgeText({text: "NEW"});
}

/*
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({
      url: "/html/settings.html"
  });
});
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSettings")
    sendResponse({settings: localStorage['settings']});
  else
    sendResponse({});
});
