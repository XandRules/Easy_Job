easyjob.controller('LoginController', ['LoginModel', '$scope', '$state', '$rootScope',  '$localStorage', '$sessionStorage',
    function (LoginModel, $scope,$state ,$rootScope, $localStorage, $sessionStorage) {

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


        $scope.login = function(){
            
            data = {
                "email": $scope.user,
                "password": $scope.password
            }

            console.log(data);

            LoginModel.login(data).then(function(response){
                console.log('data : ' + response.status);

                if(response.data.error == undefined){
                    $state.go('salesfreelancer');
                }

                else{
                    console.log('usuário ou senha incorreta');
                }

            });
        }

    }
]);