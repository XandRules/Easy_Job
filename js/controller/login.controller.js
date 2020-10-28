easyjob.controller('LoginController', ['LoginModel', '$scope', '$state', '$rootScope', '$localStorage', '$sessionStorage',
    function (LoginModel, $scope, $state, $rootScope, $localStorage, $sessionStorage) {

        console.log('Login');

        $scope.user;
        $scope.password;
        $rootScope.loggedUser = '';
        $scope.enabledLogin = false;

        $rootScope.headerDefault = true;
        $rootScope.headerDefaultLogout = false;
        $rootScope.footerDefault = false;

        $("#password").keypress(function (event) {
            if (event.keyCode === 13) {
                $("#signin").click();
            }
        });


        $scope.loginFreelancer = function () {

            // let entrar = document.getElementById('entrar')

            $scope.entrar = "fa fa-spinner fa-spin fa-fw";

            data = {
                "email": $scope.user,
                "password": $scope.password
            }

            console.log(data);

            let route = '/sessionsfreelancer';

            LoginModel.login(data, route).then(function (response) {
                console.log('data : ' + response.status);

                if (response.data.error == undefined) {

                    sessionStorage.setItem('sessionValidated', JSON.stringify(response.data));

                    $scope.entrar = "";

                    $state.go('salesfreelancer');
                } else {
                    swal("email ou senha incorreta!", "Tente redefinir sua senha!", "error");
                    console.log('usuário ou senha incorreta');
                    $scope.entrar = "";
                }

            });
        }

        $scope.loginEstablish = function () {

            $scope.entrar = "fa fa-spinner fa-spin fa-fw";

            data = {
                "email": $scope.user,
                "password": $scope.password
            }

            console.log(data);

            let route = '/sessionsestablishment';

            LoginModel.login(data, route).then(function (response) {
                console.log('data : ' + response.status);

                if (response.data.error == undefined) {
                    sessionStorage.setItem('sessionValidated', JSON.stringify(response.data));

                    $scope.entrar = "";

                    $state.go('salesestablish');
                } else {
                    swal("email ou senha incorreta!", "Tente redefinir sua senha!", "error");
                    console.log('usuário ou senha incorreta');
                    $scope.entrar = "";
                }

            });
        }

        $scope.verifyEmailFreelancer = function () {

            // let entrar = document.getElementById('entrar')

            $scope.entrar = "fa fa-spinner fa-spin fa-fw";

            data = {
                "email": $scope.user                
            }

            console.log(data);

            let route = '/emailfreelancer';

            LoginModel.verifyEmail(data, route).then(function (response) {
                console.log('data : ' + response.status);

                if (response.data.error == undefined) {

                    $scope.entrar = "";
                    console.log(response.data);

                    swal(`${response.data.name}`, "Você receberá um email com as informações para redefinir sua senha", "info");

                } else {
                    swal("email ou senha incorreta!", "Tente redefinir sua senha!", "error");
                    console.log('usuário ou senha incorreta');
                    $scope.entrar = "";
                }

            });
        }

        $scope.VerifyEmailEstablish = function () {

            $scope.entrar = "fa fa-spinner fa-spin fa-fw";

            data = {
                "email": $scope.user
            }

            console.log(data);

            let route = '/emailestablishment';

            LoginModel.verifyEmail(data, route).then(function (response) {
                
                if (response.data.error == undefined) {

                    $scope.entrar = "";
                    console.log(response.data);
                    swal(`${response.data.name}`, "Você receberá um email com as informações para redefinir sua senha", "info");

                } else {
                    swal("email ou senha incorreta!", "Tente redefinir sua senha!", "error");
                    console.log('usuário ou senha incorreta');
                    $scope.entrar = "";
                }

            });
        }

    }
]);