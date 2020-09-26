easyjob.controller('FreelancerController', [
  'FreelancerModel',
  'AddressModel',
  '$scope',
  '$rootScope',
  '$state',
  function (FreelancerModel, AddressModel,$scope, $rootScope, $state) {
    console.log('Freelancer');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;

    $scope.amount = 0;
    $scope.period;
    $scope.day_of_week;
    $scope.description;
    $scope.freelancer_id;
    $scope.speciality_id;
    $scope.auxAmount;
    $scope.domingo;
    $scope.segunda;
    $scope.terca;
    $scope.quarta;
    $scope.quinta;
    $scope.sexta;
    $scope.sabado;
    $scope.manha;
    $scope.tarde;
    $scope.noite;
    $scope.cidade;
    $scope.descricao;

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    let token = 'Bearer ' + $rootScope.token;

      axios.interceptors.request.use(
        config =>{
          config.headers.authorization = token;
          return config;
        },
        error =>{
          return Promisse.reject(error);
        }
      )

    $scope.createAnnouncement = function () {
      console.log("criar anuncio");
    }

    $scope.setAmount = function (value) {

      $scope.auxAmount = $scope.amount;

      $scope.auxAmount += value;

      if ($scope.auxAmount > 0) {
        $scope.amount = $scope.auxAmount;
      } else if ($scope.auxAmount <= 0) {
        $scope.amount = 0;
        $scope.auxAmount = 0;
      }

    }

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

    $scope.getFreelancerById = function () {

      FreelancerModel.getFreelancerById($rootScope.id).then((response)=>{

        console.log(response.data);

        $scope.getAddressFromFreelancer();

      });

    }

    $scope.getAddressFromFreelancer = function(){

      AddressModel.getAddressFromFreelancer($rootScope.id).then((response) =>{
        console.log(response.data);

        $state.go("profilefreelancer");

      });

    }

    //SELECT  F.id, F.name, F.phone, F.speciality_id, F.birth, F.gender, F.cpf,F.bio, A.number, A.cep, A.public_place, A.uf, A.neighborhood, A.city FROM freelancers F INNER JOIN addresses A on A.freelancer_id = F.id where F.id = 9;

    let event = document.querySelector('#file-input') != null ? document.querySelector('#file-input').addEventListener("change", $scope.imageUploadPreview) : null;
  }
]);