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
    $scope.name; 
    $scope.email; 
    $scope.phone; 
    $scope.gender; 
    $scope.bio; 
    $scope.cpf; 
    $scope.birth; 

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $scope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

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

    $scope.formatDate = function(date){

      let data = new Date(date);

      let year = parseInt(data.getUTCFullYear());
      let month = parseInt(data.getUTCMonth());
      let day = parseInt(data.getUTCDay());

      let fullDate = year + '-' + (month +1) + '-' + day;

      return fullDate;

    }

    $scope.getFreelancerById = function () {

      FreelancerModel.getFreelancerById($rootScope.id).then((response)=>{

        console.log(response.data);
        $scope.name   = document.getElementById('username');
        $scope.phone  = document.getElementById('sp_celphones');
        $scope.gender = document.getElementById('gender');
        $scope.bio    = document.getElementById('bio') ;
        $scope.birth  = document.getElementById('birth');

        if(response.data != null){
          $scope.name.value = response.data[0].name;
          $scope.phone.value  = response.data[0].phone;
          $scope.gender.value = response.data[0].gender == 'Masculino' ? 0 : 1;          
          $scope.bio.value    = response.data[0].bio;
          $scope.birth.value  = $scope.formatDate(response.data[0].birth);
  
          $scope.getAddressFromFreelancer();
        }else{
          swal("Erro ao buscar os dados","Um erro inesperado aconteceu!","error");
        }

      });

    }

    $scope.getAddressFromFreelancer = function(){

      AddressModel.getAddressFromFreelancer($rootScope.id).then((response) =>{
        console.log(response.data);

        $scope.cep = '';
        $scope.uf = '';
        $scope.number = '';
        $scope.public_place = '';
        $scope.city = '';
        $scope.neighborhood = '';

        if(response.data != 0){
          $scope.cep = response.data[0].cep;
          $scope.uf = response.data[0].uf;
          $scope.number = response.data[0].number;
          $scope.public_place = response.data[0].public_place;
          $scope.city = response.data[0].city;
          $scope.neighborhood = response.data[0].neighborhood;
        }

        $state.go("profilefreelancer");

      });

    }

    if($rootScope.pageSelect == 'profilefreelancer'){
      $scope.getFreelancerById();
    }

    //SELECT  F.id, F.name, F.phone, F.speciality_id, F.birth, F.gender, F.cpf,F.bio, A.number, A.cep, A.public_place, A.uf, A.neighborhood, A.city FROM freelancers F INNER JOIN addresses A on A.freelancer_id = F.id where F.id = 9;

    let event = document.querySelector('#file-input') != null ? document.querySelector('#file-input').addEventListener("change", $scope.imageUploadPreview) : null;
  }
]);