easyjob.controller('JobController', [
  '$scope','$rootScope',
  function ($scope,$rootScope) { 

    console.log("Job");

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;


  },
]);