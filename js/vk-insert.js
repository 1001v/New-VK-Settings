var settings;

var functions = {
  "fixMenu": function() {
    jQuery("#side_bar_inner").css("position", "fixed").attr("id", "side_bar_inner_fixed");
  },
  "returnDurov": function() {
    //console.log(jQuery("#bottom_nav .footer_copy.fl_l"));
    jQuery("#bottom_nav .footer_copy.fl_l").html(jQuery("#bottom_nav .footer_copy.fl_l").text() + " <a href='/durov'>Павел Дуров</a>");
  },
  "menuNotif": function() {
    jQuery("#side_bar .side_bar_inner ol").append("<li><a href=\"/feed?section=notifications\" onclick=\"return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});\" class=\"left_row\"><span class=\"left_fixer\"><span class=\"left_count_wrap fl_r left_void\"><span class=\"inl_bl left_count_sign\"></span></span><span class=\"left_icon fl_l\"></span><span class=\"left_label inl_bl\">" + (jQuery("#l_pr .left_label.inl_bl").text() == "My Profile" ? "Notifications" : "Уведомления") + "</span></span></a><div class=\"left_settings\" onclick=\"menuSettings(0)\"><div class=\"left_settings_inner\"></div></div></li>");
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
