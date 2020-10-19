easyjob.controller('EstablishController', ['EstablishModel', '$scope', '$rootScope', 'MainModel', 'AddressModel','SearchModel',
    function (EstablishModel, $scope, $rootScope, MainModel,AddressModel,SearchModel) {

        $rootScope.headerDefault = false;
        $rootScope.headerDefaultLogout = true;
        $rootScope.footerDefault = false;

        $scope.establishName; 
        $scope.establishPhone; 
        $scope.establishSocialReason;
        $scope.establishBio;

        $scope.cep = '';
        $scope.addressId = '';
        $scope.uf = '';
        $scope.number = '';
        $scope.public_place = '';
        $scope.city = '';
        $scope.neighborhood = '';
        $scope.salvar = document.getElementById('salvar');
        $scope.chatCount = 0;


        window.addEventListener("load", () => {

            let userLogin = document.getElementById("userlogin");
            userLogin.innerHTML = $rootScope.name;

        });

        let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

        $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name : null;
        $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
        $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.establishment.id_hash : null;
        $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

        // 
        // Update dados do estabelecimento
        // 
        $scope.updateEstablish = function () {

            $scope.salvar.className = "fa fa-spinner fa-spin fa-fw";
      
            establish_data = {
              "company_name": $scope.establishName,
              "social_reason": $scope.establishSocialReason,
              "phone": $scope.establishPhone,
              "bio": $scope.establishBio
            };
      
            establish_address = {
              "cep": $scope.cep,
              "uf": $scope.uf,
              "number": $scope.number,
              "city": $scope.city,
              "public_place": $scope.public_place,
              "neighborhood": $scope.neighborhood
      
            };
      
      
            console.log(establish_data);
            console.log(establish_address);
      
            EstablishModel.updateStablish(establish_data, $rootScope.id).then(function (response) {
              console.log(response.data);
              $scope.updateStablishAddress();
      
            });
      
          }
      
          $scope.updateStablishAddress = function () {
      
            if($scope.addressId){
              AddressModel.updateAddress(establish_address, $scope.addressId).then(function (response) {
        
                if (typeof (response.data) !== "string" || response.data != 'Validation Fails' || response.data.error != null) {
                  swal("Dados atualizados com sucesso!", "Seus dados foram atualizados!", "success");
                } else {
                  swal("Ooops!", "Seus dados não foram atualizados!", "error");
                }
        
                $scope.salvar.className = "";
        
              })
            }else{
              establish_address["stablish_id"] = $rootScope.id;
              MainModel.saveAddress(establish_address).then(function (response) {
                if (response.data.error != null) {
                  swal("Ooops!", "Seus dados não foram atualizados!", "error");
                }else{
                  swal("Dados atualizados com sucesso!", "Seus dados foram atualizados!", "success");
                }
              });
            }
          }
      

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

        // 
        // Buscar notificações de novas mensagens
        // 

        $scope.fetchNotification = function(){
          if($rootScope.pageSelect === "salesestablish"){
            SearchModel.fetchNotificationChat($rootScope.id_hash).then(response =>{
              if(response.data){
                console.log(response.data)
                $scope.chatCount = response.data.length;

                $rootScope.chatRoom = response.data[0].room;

                $scope.$apply();
                
              }
            })
          }

          setTimeout(() =>{
            $scope.fetchNotification();
          },5000);
        }

        // 
        // Carregar mensagens
        // 

        
        $scope.fetchNotification();
        
        if($rootScope.pageSelect == "profileestablish"){
            $scope.getEstablishment();
        }
    }
]);