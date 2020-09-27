easyjob.controller('FreelancerController', [
  'FreelancerModel',
  'AddressModel',
  'MainModel',
  '$scope',
  '$rootScope',
  '$state',
  function (FreelancerModel, AddressModel, MainModel,$scope, $rootScope, $state) {
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
    $scope.salvar = document.getElementById('salvar');

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    $scope.createAnnouncement = function () {
      console.log("criar anuncio");

      var domingo = $scope.domingo == true ? "Domingo " : null ; 
      var segunda = $scope.segunda == true ? "Segunda ": null; 
      var terca = $scope.terca == true ? "Terça ": null; 
      var quarta = $scope.quarta == true ? "Quarta ": null; 
      var quinta = $scope.quinta == true ? "Quinta ": null; 
      var sexta = $scope.sexta == true ? "Sexta ": null; 
      var sabado = $scope.sabado == true ? "Sábado ": null; 
      var manha = $scope.manha == true ? "Manhã " : null;
      var tarde = $scope.tarde == true ? "Tarde " : null;
      var noite = $scope.noite == true ? "Noite " : null;

      $scope.day_of_week = (
        domingo + segunda + terca + quarta + quinta + sexta + sabado
       );

      $scope.period = (
        manha + tarde + sexta
      )  

      data = {
        "amount" : $scope.amount,
        "title": $scope.title,
        "period":$scope.period,
        "description": $scope.description,
        "day_of_week":$scope.day_of_week,
        "freelancer_id":$rootScope.id,
        "speciality_id":$scope.speciality,
      }

      console.log(data);

    }

    $scope.updateFreelancer = function(){

      $scope.salvar.className = "fa fa-spinner fa-spin fa-fw";

      freelancer_data = {      
        "gender": $scope.gender.value == 0 ?"Masculino" : "Feminino",
        "birth": $scope.birth.value,
        "name" : $scope.name.value,
        "phone" : $scope.phone.value,
        "bio": $scope.bio.value
      };

      freelancer_address = {
        "cep" : $scope.cep.value,
        "uf": $scope.uf.value,
        "number": $scope.number.value,
        "city": $scope.city.value,
        "public_place" : $scope.public_place.value,
        "neighborhood": $scope.neighborhood.value 

      };


      console.log(freelancer_data);
      console.log(freelancer_address);

      FreelancerModel.updateFreelancer(freelancer_data, $rootScope.id).then(function(response){
        console.log(response.data);
        $scope.updateFreelancerAddress();

      });

    }

    $scope.updateFreelancerAddress = function(){
      AddressModel.updateAddress(freelancer_address,$scope.addressId).then(function(response){
       
        if(typeof(response.data) !== "string" || response.data != 'Validation Fails' || response.data.error != null){
          swal("Dados atualizados com sucesso!","Seus dados foram atualizados!","success");
        }else{
          swal("Ooops!","Seus dados não foram atualizados!","error");
        }

        $scope.salvar.className = "";

      })
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

    $scope.findByCep = function () {
      let url = `https://viacep.com.br/ws/${$scope.cep.value}/json/`;

      MainModel.getCep(url).then(function (response) {
        console.log(response);
        $scope.uf.value = response.data.uf;
        $scope.city.value = response.data.localidade;
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

        if(value == 0){
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

    $scope.formatDate = function(date){

      let data = new Date(date);

      let year = parseInt(data.getUTCFullYear());
      let month = parseInt(data.getUTCMonth());
      let day = parseInt(data.getDay());

      month = (month + 1) < 10 ? "0" + (month+1) : (month+1);
      day = (day +1) < 10 ? "0" + (day +1) : (day +1);

      let fullDate = year + '-' + month + '-' + day;

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

    $scope.getAddressFromFreelancer = async function(){     

      AddressModel.getAddressFromFreelancer($rootScope.id).then((response) =>{
        console.log(response.data);

        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementById("content2").style.display = "block";

        $scope.cep = document.getElementById('inputCEP');
        $scope.addressId = '';
        $scope.uf = document.getElementById('uf');;
        $scope.number = document.getElementById('number');
        $scope.public_place = document.getElementById('public_place');
        $scope.city = document.getElementById('city');
        $scope.neighborhood = document.getElementById('neighborhood');

        if(response.data != 0){
          $scope.cep.value = response.data[0].cep;
          $scope.addressId = response.data[0].id;
          $scope.uf.value = response.data[0].uf;
          $scope.number.value = response.data[0].number;
          $scope.public_place.value = response.data[0].public_place;
          $scope.city.value = response.data[0].city;
          $scope.neighborhood.value = response.data[0].neighborhood;
        }
      });

    }

    $scope.getFreelancerData = async function(){     
      $scope.getFreelancerById();
      document.getElementById("loading").style.display = "block";
      document.getElementById("content").style.display = "none";
      document.getElementById("content2").style.display = "none";
    }


    if($rootScope.pageSelect == 'profilefreelancer'){
      $scope.getFreelancerData();
    }

    //SELECT  F.id, F.name, F.phone, F.speciality_id, F.birth, F.gender, F.cpf,F.bio, A.number, A.cep, A.public_place, A.uf, A.neighborhood, A.city FROM freelancers F INNER JOIN addresses A on A.freelancer_id = F.id where F.id = 9;

    let event = document.querySelector('#file-input') != null ? document.querySelector('#file-input').addEventListener("change", $scope.imageUploadPreview) : null;
  }
]);