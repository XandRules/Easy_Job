easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope', 'MainModel',
    function (EstablishModel, $scope, $rootScope, MainModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;

        let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

        $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
        $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
        $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

        // 
        // Buscar dados do estabelecimento
        // 

        $scope.getEstablishment = function () {

        }




    }
]);