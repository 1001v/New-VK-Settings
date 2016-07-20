if (localStorage['settings'] === undefined || localStorage['feedback'] === undefined) {
  chrome.tabs.create({
      url: "/html/settings.html"
  });
}

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({
      url: "/html/settings.html"
  });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSettings")
    sendResponse({settings: localStorage['settings']});
  else
    sendResponse({});
});
