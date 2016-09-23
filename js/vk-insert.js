var settings;
var applyFinished = false;

function addInMenu(element) {
    if (jQuery("#side_bar .side_bar_inner ol").children("div.more_div.l_main").length)
        jQuery("#side_bar .side_bar_inner ol .more_div.l_main").before(element);
    else {
        jQuery("#side_bar .side_bar_inner ol").append(element);
    }

}

function resetOldHeadShifts() {
    jQuery(".im-right-menu.ui_rmenu").css('top', '');
    jQuery("#side_bar_inner_fixed").css('top', '');
    jQuery(".im-page.im-page_classic .im-page--header").css('top', '');
    jQuery(".page_block .ui_search.ui_search_fixed").css('top', '');
    jQuery(".im-page.im-page_classic .im-page--header-chat").css('top', '');
    jQuery("#profile #narrow_column").removeClass("fixed");
    jQuery("#profile #narrow_column").css('margin-top', '15px');
}

function unlockTopMenu() {
    if (window.location.href.indexOf("com/im") == -1) {
        if (window.pageYOffset > 45) {
            jQuery("#side_bar_inner_fixed").css('top', '-10px');
            jQuery(".im-right-menu.ui_rmenu").css('top', '-10px');
            jQuery(".im-page.im-page_classic .im-page--header").css('top', 50);
            jQuery(".page_block .ui_search.ui_search_fixed").css('top', 0);
            jQuery(".im-page.im-page_classic .im-page--header-chat").css('top', 0);
        } else {
            resetOldHeadShifts();
        }
    } else {
        jQuery('html').addClass('imFixedHead');
    }
}

var functions = {
    "oldHead": function () {
        if (window.location.href.indexOf("/im") !== -1) {
            // если в диалоге - возвращаем шапку и сдвинутые меню на место
            resetOldHeadShifts();
            jQuery('html').addClass('imFixedHead');
        } else {
          jQuery('html').removeClass('imFixedHead');
        }
        $("html head title").bind("DOMSubtreeModified", function () {
            if (window.location.href.indexOf("/im") !== -1) {
                // если в диалоге - возвращаем шапку и сдвинутые меню на место
                resetOldHeadShifts();
                jQuery('html').addClass('imFixedHead');
            } else {
                jQuery('html').removeClass('imFixedHead');
            }
        });

        $(window).scroll(function () {
            unlockTopMenu();
        });

    },
    "fixMenu": function () {
        jQuery("#side_bar_inner").css("position", "fixed").attr("id", "side_bar_inner_fixed");
    },
    "returnDurov": function () {
        jQuery(".left_menu_nav_wrap").prepend("<a class='left_menu_nav' href='/durov'>Павел Дуров</a>");
    },
    "menuNotif": function () {
        addInMenu("<li><a href=\"/feed?section=notifications\" onclick=\"return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});\" class=\"left_row\"><span class=\"left_fixer\"><span class=\"left_count_wrap fl_r left_void\"><span class=\"inl_bl left_count_sign\"></span></span><span class=\"left_icon fl_l\"></span><span class=\"left_label inl_bl\">" + (jQuery("#l_pr .left_label.inl_bl").text() == "My Profile" ? "Notifications" : "Уведомления") + "</span></span></a><div class=\"left_settings\" onclick=\"menuSettings(0)\"><div class=\"left_settings_inner\"></div></div></li>");
    },
    "menuComm": function () {
        addInMenu("<li><a href=\"/feed?section=comments\" onclick=\"return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});\" class=\"left_row\"><span class=\"left_fixer\"><span class=\"left_count_wrap fl_r left_void\"><span class=\"inl_bl left_count_sign\"></span></span><span class=\"left_icon fl_l\"></span><span class=\"left_label inl_bl\">" + (jQuery("#l_pr .left_label.inl_bl").text() == "My Profile" ? "Comments" : "Комментарии") + "</span></span></a><div class=\"left_settings\" onclick=\"menuSettings(0)\"><div class=\"left_settings_inner\"></div></div></li>");
    },
    "menuUpd": function () {
        addInMenu("<li><a href=\"/feed?section=updates\" onclick=\"return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});\" class=\"left_row\"><span class=\"left_fixer\"><span class=\"left_count_wrap fl_r left_void\"><span class=\"inl_bl left_count_sign\"></span></span><span class=\"left_icon fl_l\"></span><span class=\"left_label inl_bl\">" + (jQuery("#l_pr .left_label.inl_bl").text() == "My Profile" ? "Updates" : "Обновления") + "</span></span></a><div class=\"left_settings\" onclick=\"menuSettings(0)\"><div class=\"left_settings_inner\"></div></div></li>");
    },
    "menuSett": function () {
        addInMenu("<li><a href=\"/settings\" onclick=\"return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});\" class=\"left_row\"><span class=\"left_fixer\"><span class=\"left_count_wrap fl_r left_void\"><span class=\"inl_bl left_count_sign\"></span></span><span class=\"left_icon fl_l\"></span><span class=\"left_label inl_bl\">" + (jQuery("#l_pr .left_label.inl_bl").text() == "My Profile" ? "Settings" : "Настройки") + "</span></span></a><div class=\"left_settings\" onclick=\"menuSettings(0)\"><div class=\"left_settings_inner\"></div></div></li>");
    },
    "fixNarrowColumn": function () {
        if (window.location.href.indexOf("/feed") !== -1) {
            jQuery("#narrow_column:has(#feed_rmenu)").addClass("position_right");
        }
        $("html head title").bind("DOMSubtreeModified", function () {
            if (window.location.href.indexOf("/feed") !== -1) {
                jQuery("#narrow_column:has(#feed_rmenu)").addClass("position_right");
            }
        });
    },
    "myMenu": function () {
        if (applyFinished) {
            jQuery("#side_bar .side_bar_inner ol").children("*").each(function (index) {
                if (!index)
                    return true;
                if (jQuery(this).is("div"))
                    return false;
                jQuery(this).find(".left_label.inl_bl").text("Мои " + jQuery(this).find(".left_label.inl_bl").text());

            });
        } else
            setTimeout(functions.myMenu, 100);
    },
    "editMenu": function () {
        jQuery("#side_bar .side_bar_inner ol #l_pr .left_label.inl_bl").html(jQuery("#side_bar .side_bar_inner ol #l_pr .left_label.inl_bl").text() + "<a class=\"f_red_p\" href=\"/edit\">ред.</a>");
    }
}

jQuery(function () {
    chrome.runtime.sendMessage({method: "getSettings"}, function (response) {
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
                applyFinished = true;
            } else {
                console.log("Настройки не найдены, запускается страница настроек");
                chrome.tabs.create({
                    url: "/html/settings.html"
                });
            }
        }
    });
});
