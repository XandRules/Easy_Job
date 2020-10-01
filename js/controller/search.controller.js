easyjob.controller('SearchController', [
  'SearchModel',
  '$scope',
  '$rootScope',
  'MainModel',
  function (EstablishModel, $scope,$rootScope,MainModel) {
    console.log('Search');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;
    $scope.speciality_label = ["Freelancer","Garçom / Garçonete","Segurança","Recepcionista","Banda / Músico", "Motoboy"];
    $scope.speciality_label_writer = "";

    $scope.speciality = "";

        $scope.getSpecilities = function () {

            MainModel.getSpecilities().then(function (response) {
      
              $rootScope.specilities = [];
      
              response.data.forEach((element) => {
                $rootScope.specilities.push(element);
              });
      
              console.log($scope.specilities);
              $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
            });
      
        };

        if($rootScope.pageSelect == 'searchfreelancer'){
            $scope.getSpecilities();
        }
  },
]);