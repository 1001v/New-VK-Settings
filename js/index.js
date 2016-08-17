angular.module("vk-settings", ["ui.bootstrap", "ngAnimate", "toastr"])
.controller("settingsCtrl", function($scope, $uibModal, $rootScope, toastr){

  $scope.manifest = chrome.runtime.getManifest();

  if (localStorage['firstLaunch'] === undefined) {
    localStorage['firstLaunch'] = false;
    $scope.helloModal = $uibModal.open({
      animation: true,
      templateUrl: '/html/helloModal.html'
    });
  } else if (localStorage['feedback'] === undefined) {
    localStorage['feedback'] = false;
    $scope.active = 3;
    $scope.feedbackModal = $uibModal.open({
      animation: true,
      templateUrl: '/html/feedbackModal.html'
    });
  }

  $scope.stopNotify = function() {
    localStorage['neverNotify'] = true;
  }

  $rootScope.close = function() {
    if ($scope.helloModal !== undefined)
      $scope.helloModal.close();
    if ($scope.resetModal !== undefined)
      $scope.resetModal.close();
    if ($scope.applyModal !== undefined)
      $scope.applyModal.close();
    if ($scope.feedbackModal !== undefined)
      $scope.feedbackModal.close();
  }


  var initializing = true;
  $scope.changes = false;

  function getDefaultSettings() {
    return {
      fixMenu: false,
      fixNarrowColumn: false,
      sqrAvatars: false,
      noBackground: false,
      hideRightBlock: false,
      oldMessageBackground: false,
      oldFonts: false,
      highContrast: false,
      oldAudioSize: false,
      returnDurov: false,
      menuNotif: false,
      menuUpd: false,
      menuComm: false,
      hidePossibleFriends: false,
      hidePossibleGroups: false,
      hideUnderMenu: false,
      moveLikeRight: false
    };
  }

  function startWatching() {
    $scope.$watchCollection("settings", function() {
      if (! initializing) {
        $scope.changes = true;
        toastr.info('Требуется перезагрузить vk.com', 'Настройки применены');
        console.log("Настройка изменена.");
        $scope.writeSettings();
      } else
        initializing = false;
    });
  }

  function getSettings() {
    if (localStorage['settings'] === undefined) {
      console.log("Нет сохраненных настроек. Выставлены настройки по умолчанию.");
      localStorage['settings'] = JSON.stringify(getDefaultSettings());
      return getDefaultSettings();
    } else {
      console.log("Настройки успешно считаны.");
      var settings = JSON.parse(localStorage['settings']);
      var defaultSettings = getDefaultSettings();
      for (var setting in defaultSettings)
        if (settings[setting] === undefined) {
          initializing = false;
          console.log("Отсутствует настройка " + setting)
          settings[setting] = defaultSettings[setting];
        }
      return settings;
    }
  }

  $scope.writeSettings = function() {
    console.log("Настройки успешно обновлены.");
    localStorage['settings'] = JSON.stringify($scope.settings);
  }

  $rootScope.resetSettings = function() {
    initializing = true;
    console.log("Сброс настроек.");
    $scope.settings = getDefaultSettings();
    $scope.close();
    toastr.success('Требуется перезагрузить vk.com', 'Настройки сброшены');
    $scope.writeSettings();
  }

  $rootScope.applySettings = function() {
    initializing = true;
    console.log("Применение настроек.");
    for (setting in $scope.settings)
      $scope.settings[setting] = true;
    $scope.close();
    toastr.success('Требуется перезагрузить vk.com', 'Настройки применены');
    $scope.writeSettings();
  }

  $scope.deleteSettings = function() {
    console.log("Удаление настроек");
    delete localStorage['settings'];
  }

  $scope.logSettings = function() {
    console.log($scope.settings);
  }

  $scope.logDefaultSettings = function() {
    console.log(getDefaultSettings());
  }

  $scope.openResetModal = function() {
    $scope.resetModal = $uibModal.open({
      animation: true,
      templateUrl: '/html/resetModal.html'
    });
  }

  $scope.openApplyModal = function() {
    $scope.applyModal = $uibModal.open({
      animation: true,
      templateUrl: '/html/applyModal.html'
    });
  }

  $scope.settings = getSettings();
  startWatching();

}).config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: true,
    containerId: 'toast-container',
    maxOpened: 1,
    newestOnTop: true,
    positionClass: 'toast-bottom-left',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });
});
