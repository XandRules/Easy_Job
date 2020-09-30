easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope','MainModel',
    function (EstablishModel, $scope, $rootScope, MainModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;
        $scope.speciality;

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
    }
]);