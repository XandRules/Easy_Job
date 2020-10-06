easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope', 'MainModel',
    function (EstablishModel, $scope, $rootScope, MainModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;

        let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

        $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name : null;
        $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
        $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

        // 
        // Buscar dados do estabelecimento
        // 

        $scope.getEstablishment = function () {

        }

        $scope.$apply();




    }
]);