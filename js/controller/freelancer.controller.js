easyjob.controller('FreelancerController', [
  'FreelancerModel',
  '$scope',
  '$rootScope',
  function (FreelancerModel, $scope, $rootScope) {
    console.log('Freelancer');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated.freelancer.name;
  },
]);