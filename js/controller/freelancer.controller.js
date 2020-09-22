easyjob.controller('FreelancerController', [
  'FreelancerModel',
  '$scope',
  '$rootScope',
  function (FreelancerModel, $scope, $rootScope) {
    console.log('Freelancer');

    $rootScope.headerDefault = false;
    $rootScope.footerDefault = false;

  },
]);