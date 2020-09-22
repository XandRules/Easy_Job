easyjob.controller('LoginController', ['LoginModel', '$scope', '$state', '$rootScope',  '$localStorage', '$sessionStorage',
    function (LoginModel, $scope,$state ,$rootScope, $localStorage, $sessionStorage) {
        
        $scope.footerDefault = false;

        console.log('Login');

        $scope.user;
        $scope.password;
        $rootScope.loggedUser = '';
        $scope.enabledLogin = false;

        $("#password").keypress(function(event) { 
            if (event.keyCode === 13) { 
                $("#signin").click(); 
            } 
        });


        $scope.loginFreelancer = function(){
            
            data = {
                "email": $scope.user,
                "password": $scope.password
            }

            console.log(data);

            let route = '/sessionsfreelancer';

            LoginModel.login(data,route).then(function(response){
                console.log('data : ' + response.status);

                if(response.data.error == undefined){

                    sessionStorage.setItem('sessionValidated', JSON.stringify(response.data));

                    $state.go('salesfreelancer');
                }

                else{
                    swal("email ou senha incorreta!", "Tente redefinir sua senha!", "error");
                    console.log('usuário ou senha incorreta');
                }

            });
        }

        $scope.loginEstablish = function(){
            
            data = {
                "email": $scope.user,
                "password": $scope.password
            }

            console.log(data);

            let route = '/sessionsestablish';

            LoginModel.login(data,route).then(function(response){
                console.log('data : ' + response.status);

                if(response.data.error == undefined){
                    $state.go('salesfreelancer');
                }

                else{
                    swal("email ou senha incorreta!", "Tente redefinir sua senha!", "error");
                    console.log('usuário ou senha incorreta');
                }

            });
        }

    }
]);