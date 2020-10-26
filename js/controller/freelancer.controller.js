easyjob.controller('FreelancerController', [
  'FreelancerModel',
  'AddressModel',
  'MainModel',
  'SearchModel',
  '$scope',
  '$rootScope',
  '$state',
  function (FreelancerModel, AddressModel, MainModel,SearchModel, $scope, $rootScope, $state) {
    console.log('Freelancer');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;

    window.addEventListener("load", () => {

      if ($rootScope.pageSelect == 'profilefreelancer') {
        $scope.getFreelancerData();
      }

      
      let userLogin = document.getElementById("userlogin");
      userLogin.innerHTML = $rootScope.name;

    });

    $scope.cidade;
    $scope.descricao;
    $scope.name;
    $scope.email;
    $scope.phone;
    $scope.gender;
    $scope.bio;
    $scope.cpf;
    $scope.birth;
    $scope.salvar = document.getElementById('salvar');
    $scope.chatCount = 0;
    $scope.jobCount = 0;

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
    $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.freelancer.id_hash : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    $scope.updateFreelancer = function () {

      $scope.salvar.className = "fa fa-spinner fa-spin fa-fw";

      freelancer_data = {
        "gender": $scope.gender == 0 ? "Masculino" : "Feminino",
        "birth": $scope.birth,
        "name": $scope.name,
        "phone": $scope.phone,
        "bio": $scope.bio
      };

      freelancer_address = {
        "cep": $scope.cep,
        "uf": $scope.uf,
        "number": $scope.number,
        "city": $scope.city,
        "public_place": $scope.public_place,
        "neighborhood": $scope.neighborhood

      };


      console.log(freelancer_data);
      console.log(freelancer_address);

      FreelancerModel.updateFreelancer(freelancer_data, $rootScope.id).then(function (response) {
        console.log(response.data);
        $scope.updateFreelancerAddress();

      });

    }

    $scope.updateFreelancerAddress = function () {

      if($scope.addressId){
        AddressModel.updateAddress(freelancer_address, $scope.addressId).then(function (response) {
  
          if (typeof (response.data) !== "string" || response.data != 'Validation Fails' || response.data.error != null) {
            swal("Dados atualizados com sucesso!", "Seus dados foram atualizados!", "success");
          } else {
            swal("Ooops!", "Seus dados não foram atualizados!", "error");
          }
  
          $scope.salvar.className = "";
  
        })
      }else{
        freelancer_address["freelancer_id"] = $rootScope.id;
        MainModel.saveAddress(freelancer_address).then(function (response) {
          if (response.data.error != null) {
            swal("Ooops!", "Seus dados não foram atualizados!", "error");
          }else{
            swal("Dados atualizados com sucesso!", "Seus dados foram atualizados!", "success");
          }
        });
      }
    }

    $scope.findByCep = function () {
      let url = `https://viacep.com.br/ws/${$scope.cep}/json/`;

      MainModel.getCep(url).then(function (response) {
        console.log(response);
        $scope.uf = response.data.uf;
        $scope.city = response.data.localidade;
      });
    };

    $scope.buscaUFs = function (value) {
      MainModel.findUFs().then(function (response) {
        console.log($rootScope.data);
        $scope.ufs = [];
        response.data.forEach((element) => {
          $scope.ufs.push(element.sigla);
        });

        console.log($scope.ufs);

        if (value == 0) {
          $scope.findByCep();
        }

      });
    };

    $scope.findCep = function () {
      $scope.buscaUFs(0);
    };

    $scope.imageUploadPreview = function () {

      var preview = document.querySelector('#preview');

      if (this.files) {
        [].forEach.call(this.files, readAndPreview);
      }

      function readAndPreview(file) {

        // Make sure `file.name` matches our extensions criteria
        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
          return alert(file.name + " is not an image");
        } // else...

        var reader = new FileReader();

        reader.addEventListener("load", function () {
          var image = new Image();
          image.height = 100;
          image.title = file.name;
          image.src = this.result;
          preview.appendChild(image);
        });

        reader.readAsDataURL(file);

      }
    }

    $scope.formatDate = function (date) {

      let data = new Date(date);

      let year = parseInt(data.getUTCFullYear());
      let month = parseInt(data.getUTCMonth());
      let day = parseInt(data.getDay());

      month = (month + 1) < 10 ? "0" + (month + 1) : (month + 1);
      day = day  < 10 ? "0" + day : day ;

      let fullDate = year + '-' + month + '-' + day;

      return fullDate;

    }

    $scope.getFreelancerById = function () {

      FreelancerModel.getFreelancerById($rootScope.id).then((response) => {


        $scope.name = '';
        $scope.phone = '';
        $scope.gender = '';
        $scope.bio = '';
        $scope.birth = '';

        if (response.data[0] != null) {
          $scope.name = response.data[0].name;
          $scope.phone = response.data[0].phone;
          $scope.gender = response.data[0].gender == 'Masculino' ? "0" : "1";
          $scope.bio = response.data[0].bio;
          $scope.birth = new Date($scope.formatDate(response.data[0].birth) + ' 23:59:59');

          $scope.getAddressFromFreelancer();
        } else {
          swal("Erro ao buscar os dados", "Um erro inesperado aconteceu!", "error");
        }

      });

    }

    $scope.getAddressFromFreelancer = function () {

      AddressModel.getAddressFromFreelancer($rootScope.id).then((response) => {
        console.log(response.data);

        $scope.cep = '';
        $scope.addressId = '';
        $scope.uf = '';
        $scope.number = '';
        $scope.public_place = '';
        $scope.city = '';
        $scope.neighborhood = '';

        if (response.data[0] != null) {
          $scope.cep = response.data[0].cep;
          $scope.addressId = response.data[0].id;
          $scope.uf = response.data[0].uf;
          $scope.number = response.data[0].number;
          $scope.public_place = response.data[0].public_place;
          $scope.city = response.data[0].city;
          $scope.neighborhood = response.data[0].neighborhood;

         // $scope.$apply();
        }
        $scope.$apply();
      });

    }

    $scope.getSpecilities = function () {

      MainModel.getSpecilities().then(function (response) {

        $rootScope.specilities = [];

        response.data.forEach((element) => {
          $rootScope.specilities.push(element);
        });

        console.log($scope.specilities);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      });

    };

    $scope.getFreelancerData = async function () {
      $scope.getFreelancerById();
    }

    // 
    // Buscar notificações de novas mensagens e notificações de serviços
    // 

    $scope.fetchNotification = function(){
      if($rootScope.pageSelect === "salesfreelancer"){
        SearchModel.fetchNotificationChat($rootScope.id_hash).then(response =>{
          if(response.data){
            console.log(response.data)
            $scope.chatCount = response.data;
            
          }
        })

        SearchModel.fetchNotificationJob($rootScope.id_hash).then(response =>{
          if(response.data){
            console.log(response.data)
            $scope.jobCount = response.data;
            $scope.$apply();
          }
        })
      }

      setTimeout(() =>{
        $scope.fetchNotification();
      },10000);
    }

    $scope.fetchNotification();

    $scope.getFreelancerData();
    //SELECT  F.id, F.name, F.phone, F.speciality_id, F.birth, F.gender, F.cpf,F.bio, A.number, A.cep, A.public_place, A.uf, A.neighborhood, A.city FROM freelancers F INNER JOIN addresses A on A.freelancer_id = F.id where F.id = 9;

    let event = document.querySelector('#file-input') != null ? document.querySelector('#file-input').addEventListener("change", $scope.imageUploadPreview) : null;
  }
]);