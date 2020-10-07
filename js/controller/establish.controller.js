easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope', 'MainModel',
    function (EstablishModel, $scope, $rootScope, MainModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;

        $scope.establishName; 
        $scope.establishPhone; 
        $scope.establishSocialReason;

        window.addEventListener("load", () => {

            if($rootScope.pageSelect == "profileestablish"){
                $scope.getEstablishment();
            }

            let userLogin = document.getElementById("userlogin");
            userLogin.innerHTML = $rootScope.name;

        });

        let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

        $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name : null;
        $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
        $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

        // 
        // Buscar dados do estabelecimento
        // 
        $scope.getEstablishment = function () {
            EstablishModel.getEstablish($rootScope.id).then(response =>{
                console.log(response.data);

                $scope.establishName = response.data[0].company_name;
                $scope.establishPhone = response.data[0].phone;
                $scope.establishSocialReason = response.data[0].social_reason;

                $scope.$apply();
            })
        }    
        
        if($rootScope.pageSelect == "profileestablish"){
            $scope.getEstablishment();
        }
    }
]);