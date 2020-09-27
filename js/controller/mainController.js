easyjob.controller('MainController', [
  'MainModel',
  '$scope',
  '$rootScope',
  '$state',
  function (MainModel, $scope, $rootScope, $state) {
    console.log('Home');

    $rootScope.headerDefault = true;
    $rootScope.headerDefaultLogout = false;
    $rootScope.footerDefault = true;

    const LOGINFREELANCER = 'loginfreelancer';
    const LOGINESTABLISH = 'loginestablish';

    $scope.name = '';
    $scope.cpf = '';
    $scope.cnpj = '';
    $scope.email = '';
    $scope.repeatEmail = '';
    $scope.razaoSocial = '';
    $scope.birth = '';
    $scope.gender = '';
    $scope.password = '';
    $scope.repeatPassword = '';
    $scope.phone = '';
    $rootScope.specilities = [];
    $scope.speciality = '';
    $scope.cep = '';
    $scope.uf = '';
    $scope.city = '';
    $scope.numero = '';
    $scope.bairro = '';
    $rootScope.data = '';
    $scope.message = '';

    $scope.valor = '';

    $scope.loadDom = function () {
      document.addEventListener('DOMContentLoaded', function () {
        console.log('loaded');
      });
    }

    $scope.openTermos = function (role) {

      if (role == 'freelancer') {
        console.log('termos freelancer');
      } else {
        console.log('termos establish');
      }
    }

    $scope.getSpecilities = function () {

      MainModel.getSpecilities().then(function (response) {

        response.data.forEach((element) => {
          $rootScope.specilities.push(element);
        });

        console.log($scope.specilities);
      });

    };

    $scope.signInFreelancer = function () {
      $rootScope.data = [];

      var year = $scope.birth.getFullYear();
      var month = ($scope.birth.getMonth() + 1);
      var day = $scope.birth.getDay();

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      $scope.birth = year + '-' + month + '-' + day;

      $scope.gender = $scope.gender == 0 ? "Masculino" : "Feminino";

      $rootScope.data.push({
        "name": $scope.name,
        "cpf": $scope.cpf,
        "email": $scope.email,
        "birth": $scope.birth,
        "gender": $scope.gender,
        "password": $scope.password,
        "active": false,
        "terms_of_use": true,
      });

      localStorage.setItem("dataUser", JSON.stringify($rootScope.data[0]));

      $state.go('signfreelancer2');
    };

    $scope.signInStablish = function () {
      $rootScope.data = [];

      $rootScope.data.push({
        "company_name": $scope.name,
        "cnpj": $scope.cnpj,
        "email": $scope.email,
        "phone": $scope.phone,
        "password": $scope.password,
        "active": false,
        "terms_of_use": true,
      });

      localStorage.setItem("dataUser", JSON.stringify($rootScope.data[0]));

      $state.go('signestablish2');
    };

    $scope.buscaUFs = function () {
      MainModel.findUFs().then(function (response) {
        console.log($rootScope.data);
        $scope.ufs = [];
        response.data.forEach((element) => {
          $scope.ufs.push(element.sigla);
        });

        console.log($scope.ufs);

        $scope.findByCep();
      });
    };

    $scope.findCep = function () {
      $scope.buscaUFs();
    };

    $scope.findByCep = function () {
      let url = `https://viacep.com.br/ws/${$scope.cep}/json/`;

      MainModel.getCep(url).then(function (response) {
        console.log(response);
        $scope.uf = response.data.uf;
        $scope.city = response.data.localidade;
      });
    };

    $scope.createFreelancer = function () {
      console.log("teste");

      if ($rootScope.data == null) {
        $rootScope.data = [];
        $rootScope.data[0] = JSON.parse(localStorage.getItem("dataUser"));

      }

      $rootScope.data[0]["phone"] = $scope.phone;
      $rootScope.data[0]["speciality_id"] = $scope.speciality.id;

      MainModel.createFreelancer($rootScope.data[0]).then(function (response) {

        if (response.data.error != null) {
          swal("Usuário já Cadastrado!", "Realize o Login ou tente recuperar sua senha!", "error");
        } else {
          var data = {
            "freelancer_id": response.data.id,
            "uf": $scope.uf,
            "cep": $scope.cep,
            "public_place": $scope.logradouro,
            "neighborhood": $scope.bairro,
            "number": $scope.numero,
            "city": $scope.city,

          }

          $scope.saveFreelancerAddressToDataBase(data);

          $scope.freelancer_id = response.data.id;
        }

      })
    };

    $scope.saveFreelancerAddressToDataBase = function (data) {
      MainModel.saveAddress(data).then(function (response) {
        if (response.data.error != null) {
          swal("Ocorreu um erro!", "Não foi possível salvar seu endereço!", "error");
        }else{
          $state.go('signestablish3');

          //enviar email para conocluir o cadastro.
        }
      })
    };

    $rootScope.logout = function () {
      window.sessionStorage.clear();
      $state.go("home");
    };

    $scope.getSpecilities();

  },
]);