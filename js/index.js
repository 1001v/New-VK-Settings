angular.module("vk-settings", ["ui.bootstrap"])
.controller("settingsCtrl", function($scope, $uibModal, $rootScope){

  $scope.manifest = chrome.runtime.getManifest();

  if (localStorage['firstLaunch'] === undefined) {
    localStorage['firstLaunch'] = false;
    $scope.helloModal = $uibModal.open({
      animation: true,
      size: 'sm',
      templateUrl: '/html/helloModal.html'
    });
  }

  $rootScope.close = function() {
    if ($scope.helloModal !== undefined)
      $scope.helloModal.close();
    if ($scope.resetModal !== undefined)
      $scope.resetModal.close();
  }


  var initializing = true;
  $scope.changes = false;

  function getDefaultSettings() {
    return {
      fixMenu: false,
      sqrAvatars: false,
      noBackground: false,
      hideRightBlock: false,
      oldMessageBackground: false,
      oldFonts: false,
      highContrast: false
    };
  }

  function startWatching() {
    $scope.$watchCollection("settings", function() {
      if (! initializing) {
        $scope.changes = true;
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
    console.log("Сброс настроек.");
    $scope.settings = getDefaultSettings();
    $scope.writeSettings();
    $scope.close();
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
      size: 'sm',
      templateUrl: '/html/resetModal.html'
    });
  }

  $scope.settings = getSettings();
  startWatching();

});
