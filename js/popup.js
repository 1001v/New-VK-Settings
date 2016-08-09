function fillChanges() {
    if (typeof localStorage['changes_jsonp_'] !== 'undefined') {
        data = JSON.parse(localStorage['changes_jsonp_']);
        var html = "";
        if (data.changes.length) {
            html += "<h5>Изменено:</h5>\n<ul class=\"list-group\"><li class=\"list-group-item\">" + data.changes.join("</li><li class=\"list-group-item\">") + "</li></ul>";
        }
        if (data.features.length) {
            html += "<h5>Добавлено:</h5>\n<ul class=\"list-group\"><li class=\"list-group-item\">" + data.features.join("</li><li class=\"list-group-item\">") + "</li></ul>";
        }
        if (data.message) {
            document.getElementById("message").innerHTML = data.message;
        }
        document.getElementById("resp").innerHTML = html;
    } else {
        document.getElementById("resp").innerHTML = "Список изменений недоступен";
    }
}
chrome.browserAction.setBadgeText({text: ""});
document.getElementById("version").innerText = "v" + chrome.runtime.getManifest().version;

$.ajax({
    url: 'https://1001v.ru/vk/changes.json',
    dataType: 'JSONP',
    jsonpCallback: 'callback',
    type: 'GET',
    statusCode: {
        200: function(data) {
            localStorage["changes_jsonp_"] = JSON.stringify(data);
        }
    },
    complete: function() {
        fillChanges();
    }
});