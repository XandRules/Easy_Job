easyjob.controller('AnnouncementController', [
  'AnnouncementModel',
  '$scope',
  '$rootScope',
  '$state',
  function (AnnouncementModel, $scope, $rootScope, $state) {
    console.log('Anuncios');

    $rootScope.headerDefault = true;
    $rootScope.headerDefaultLogout = false;
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
    $scope.salvar = document.getElementById('salvar');
    
    $scope.records = [];

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    $scope.getAnnouncementsFromFreelancer = function(){
      console.log("buscar anuncios")

      AnnouncementModel.getAnnouncementsFromFreelancer().then(response =>{
        console.log(response.data);
        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementById("content2").style.display = "block";
      });

    }

    $scope.deleteAnnouncementById = function(id){
      AnnouncementModel.deleteAnnouncementById(id).then(response =>{
        console.log(response.data);
      });
    }

    $scope.edit = function(item){
      console.log(item);
      $rootScope.announcement_item = item;
      $state.go('freelancerannouncementedit');
    }

    $scope.update = function(){

      //$scope.salvar.className = 'fa fa-spinner fa-spin fa-fw';

      var domingo = $scope.domingo == true ? 'Domingo |' : '';
      var segunda = $scope.segunda == true ? 'Segunda |' : '';
      var terca = $scope.terca == true ? 'Terça |' : '';
      var quarta = $scope.quarta == true ? 'Quarta |' : '';
      var quinta = $scope.quinta == true ? 'Quinta |' : '';
      var sexta = $scope.sexta == true ? 'Sexta |' : '';
      var sabado = $scope.sabado == true ? 'Sábado ' : '';
      var manha = $scope.manha == true ? 'Manhã |' : '';
      var tarde = $scope.tarde == true ? 'Tarde |' : '';
      var noite = $scope.noite == true ? 'Noite ' : '';

      $scope.day_of_week =
        domingo +
        segunda +
        terca +
        quarta +
        quinta +
        sexta +
        sabado;

      $scope.period = manha +  tarde +  noite;

      data = {
        amount: $scope.amount,
        title: $scope.title,
        period: $scope.period,
        city: $scope.city,
        description: $scope.description,
        day_of_week: $scope.day_of_week,
        freelancer_id: $rootScope.id,
        speciality_id: $scope.speciality.id,
      };

      console.log(data);

    }

    $scope.createAnnouncement = function () {
      console.log('criar anuncio');

      $scope.salvar.className = 'fa fa-spinner fa-spin fa-fw';

      var domingo = $scope.domingo == true ? 'Domingo |' : '';
      var segunda = $scope.segunda == true ? 'Segunda |' : '';
      var terca = $scope.terca == true ? 'Terça |' : '';
      var quarta = $scope.quarta == true ? 'Quarta |' : '';
      var quinta = $scope.quinta == true ? 'Quinta |' : '';
      var sexta = $scope.sexta == true ? 'Sexta |' : '';
      var sabado = $scope.sabado == true ? 'Sábado ' : '';
      var manha = $scope.manha == true ? 'Manhã |' : '';
      var tarde = $scope.tarde == true ? 'Tarde |' : '';
      var noite = $scope.noite == true ? 'Noite ' : '';

      $scope.day_of_week =
        domingo +
        segunda +
        terca +
        quarta +
        quinta +
        sexta +
        sabado;

      $scope.period = manha +  tarde +  noite;

      data = {
        amount: $scope.amount,
        title: $scope.title,
        period: $scope.period,
        description: $scope.description,
        day_of_week: $scope.day_of_week,
        city: $scope.city,
        freelancer_id: $rootScope.id,
        speciality_id: $scope.speciality.id,
      };

      console.log(data);

      AnnouncementModel.createAnnoucement(data).then((response) => {
        console.log(response.data);

        if (response.data.error == null) {
          swal(
            'Anúncio criado!',
            'Seu anúncio foi criado com sucesso!',
            'success'
          );
        }

        $scope.salvar.className = '';
      });
    };

    $scope.setAmount = function (value) {
      $scope.auxAmount = $scope.amount;

      $scope.auxAmount += value;

      if ($scope.auxAmount > 0) {
        $scope.amount = $scope.auxAmount;
      } else if ($scope.auxAmount <= 0) {
        $scope.amount = 0;
        $scope.auxAmount = 0;
      }
    };

    if($rootScope.pageSelect == 'freelancerannouncement'){
      $scope.getAnnouncementsFromFreelancer();
      document.getElementById("loading").style.display = "block";
      document.getElementById("content").style.display = "none";
      document.getElementById("content2").style.display = "none";
    }else if($rootScope.pageSelect == 'freelancerannouncementedit'){
      let amount = $rootScope.announcement_item.amount.split('R$')[1];
      $scope.amount = parseInt(amount);

      $scope.title = $rootScope.announcement_item.title;
      $scope.description = $rootScope.announcement_item.description;
      $scope.speciality = $rootScope.announcement_item.speciality_id;

      $scope.manha = $rootScope.announcement_item.period.includes("Manhã") ? true : false;
      $scope.tarde = $rootScope.announcement_item.period.includes("Tarde") ? true : false;
      $scope.noite = $rootScope.announcement_item.period.includes("Noite") ? true : false;

      $scope.domingo = $rootScope.announcement_item.day_of_week.includes("Domingo") ? true : false;
      $scope.segunda = $rootScope.announcement_item.day_of_week.includes("Segunda") ? true : false;
      $scope.terca = $rootScope.announcement_item.day_of_week.includes("Terça") ? true : false;
      $scope.quarta = $rootScope.announcement_item.day_of_week.includes("Quarta") ? true : false;
      $scope.quinta = $rootScope.announcement_item.day_of_week.includes("Quinta") ? true : false;
      $scope.sexta = $rootScope.announcement_item.day_of_week.includes("Sexta") ? true : false;
      $scope.sabado = $rootScope.announcement_item.day_of_week.includes("Sábado") ? true : false;

    }


  },
]);
