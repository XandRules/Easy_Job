easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope', 'MainModel', 'AddressModel',
    function (EstablishModel, $scope, $rootScope, MainModel,AddressModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;

        $scope.establishName; 
        $scope.establishPhone; 
        $scope.establishSocialReason;

        $scope.cep = '';
        $scope.addressId = '';
        $scope.uf = '';
        $scope.number = '';
        $scope.public_place = '';
        $scope.city = '';
        $scope.neighborhood = '';

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
        // Buscar Endereço do estabelecimento
        // 

        $scope.getAddressFromStablishment = function(){

            AddressModel.getAddressFromEstablish($rootScope.id).then((response) => {
                console.log(response.data);

                if (response.data[0] != null) {
                    $scope.cep = response.data[0].cep;
                    $scope.addressId = response.data[0].id;
                    $scope.uf = response.data[0].uf;
                    $scope.number = response.data[0].number;
                    $scope.public_place = response.data[0].public_place;
                    $scope.city = response.data[0].city;
                    $scope.neighborhood = response.data[0].neighborhood;
          
                    $scope.$apply();
                  }
            })

        }


        // 
        // Buscar dados do estabelecimento
        // 
        $scope.getEstablishment = function () {
            EstablishModel.getEstablish($rootScope.id).then(response =>{
               

                if(response.data[0] != null){
                    
                    $scope.establishName = response.data[0].company_name;
                    $scope.establishPhone = response.data[0].phone;
                    $scope.establishSocialReason = response.data[0].social_reason;
                    $scope.establishBio = response.data[0].bio;

                    $scope.getAddressFromStablishment();    
                   
                }

            })
        }    
        
        if($rootScope.pageSelect == "profileestablish"){
            $scope.getEstablishment();
        }
    }
]);