var settings;

var functions = {
  "fixMenu": function() {
    jQuery("#side_bar_inner").css("position", "fixed").attr("id", "side_bar_inner_fixed");
  }
}

jQuery(function(){
  chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
    settings = response.settings;
    if (jQuery("#footer").length == 0) {
      console.log("New VK Settings запущен");
      console.log("Проверка настроек");
      if (settings !== undefined) {
        settings = JSON.parse(settings);
        console.log("Настройки применяются");
        for (var setting in settings)
          if (settings[setting]) {
            jQuery("html").addClass(setting);
            if (functions[setting] !== undefined)
              functions[setting]();
          }
        console.log("Настройки применены");
      } else {
        console.log("Настройки не найдены, запускается страница настроек");
        chrome.tabs.create({
            url: "/html/settings.html"
        });
      }
    }
  });
});
