easyjob.controller('SelectController', [
  'SearchModel',
  '$scope',
  '$rootScope',
  function (EstablishModel, $scope, $rootScope) {
    console.log('Select');

    $rootScope.headerDefault = true;
    $rootScope.headerDefaultLogout = false;
    $rootScope.footerDefault = false;
  },
]);