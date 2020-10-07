easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope', 'MainModel',
    function (EstablishModel, $scope, $rootScope, MainModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;

        window.addEventListener("load", () => {

            let welcome = document.getElementById("welcomeUser");
           
            welcome.innerHTML = welcome.innerHTML + $rootScope.name;

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
            EstablishModel.getEstablish().then(response =>{
                console.log(response.data);
            })
        }        
    }
]);