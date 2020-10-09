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
    social_reason = '';
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
    $rootScope.announcement_item;
    $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");

    $scope.valor = '';

    $scope.show = 1;

    var i = 0;
    var input = document.getElementsByClassName('chat-box');
  
    $scope.showChat = function(){
  
        if(i == 0){
            $("#users").hide(100);
            i=1;
            console.log(input);
            input[0].style = "width: 180%";
        }else{
          $("#users").show(100);
          input[0].style = "width: 100%";
          i=0;
        }
    }

    window.onload = function () {
      console.log('loaded');
      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

      this.setInterval(()=>{
        if($scope.show == 1){
          $("#hide1").hide(1500);  $("#hide2").hide(1500);  $("#hide3").show(1500);  $("#hide4").show(1500); 
          $scope.show = 0;
        }else{
          $("#hide1").show(1500);  $("#hide2").show(1500);  $("#hide3").hide(1500);  $("#hide4").hide(1500); 
          $scope.show = 1;
        }
      },5000);


    };


    $scope.openTermos = function (role) {

      if (role == 'freelancer') {
        console.log('termos freelancer');
      } else {
        console.log('termos establish');
      }
    }

    $scope.getSpecilities = function () {

      MainModel.getSpecilities().then(function (response) {

        $rootScope.specilities = [];

        response.data.forEach((element) => {
          $rootScope.specilities.push(element);
        });

        localStorage.setItem("specialities",JSON.stringify($rootScope.specilities));

        console.log($scope.specilities);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
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
        "social_reason": $scope.social_reason,
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
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
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
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      });
    };

    $scope.createEstablish = function () {

      if ($rootScope.data == "") {
        $rootScope.data = [];
        $rootScope.data[0] = JSON.parse(localStorage.getItem("dataUser"));
      }

      MainModel.createEstablish($rootScope.data[0]).then(function (response) {

        if (response.data.error != null) {
          swal("Usuário já Cadastrado!", "Realize o Login ou tente recuperar sua senha!", "error");
        } else {
          var data = {
            "establish_id": response.data.id,
            "uf": $scope.uf,
            "cep": $scope.cep,
            "public_place": $scope.logradouro,
            "neighborhood": $scope.bairro,
            "number": $scope.numero,
            "city": $scope.city,

          }

          $scope.saveAddressToDataBase(data, 'establish');
        }

      })
    }

    $scope.createFreelancer = function () {

      if ($rootScope.data == "") {
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

          $scope.saveAddressToDataBase(data, 'freelancer');
        }

      })
    };

    $scope.saveAddressToDataBase = function (data, role) {

      MainModel.saveAddress(data).then(function (response) {
        if (response.data.error != null) {
          swal("Ocorreu um erro!", "Não foi possível salvar seu endereço!", "error");
        } else {

          if (role == 'freelancer') {
            $rootScope.data[0]["role"] = "freelancer";
            localStorage.setItem('dataUser', JSON.stringify($rootScope.data));
          } else {
            $rootScope.data[0]["role"] = "establish";
            localStorage.setItem('dataUser', JSON.stringify($rootScope.data));
          }

          MainModel.sendEmail($rootScope.data[0]).then(response => {
            console.log(response);

            if (role == 'freelancer') {
              $state.go('signfreelancer3');
            } else {
              $state.go('signestablish3');
            }
          });

          //enviar email para conocluir o cadastro.
        }
      })
    };

    $rootScope.logout = function () {
      window.sessionStorage.clear();
      $state.go("home");
    };

    $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

    $scope.getSpecilities();

  },
]);