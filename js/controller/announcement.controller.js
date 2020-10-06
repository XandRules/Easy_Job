easyjob.controller('AnnouncementController', [
  'AnnouncementModel',
  '$scope',
  '$rootScope',
  '$state',
  function (AnnouncementModel, $scope, $rootScope, $state) {
    console.log('Anuncios');


    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;   

    window.addEventListener("load", () => {

      if ($rootScope.pageSelect == 'profilefreelancer') {
        $scope.getFreelancerData();
      }

      $rootScope.specialities = JSON.parse(localStorage.getItem("specialities"));

      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

    });

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
    $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");

    $scope.records = [];

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;    

    $scope.getAnnouncementsFromFreelancer = function () {
      console.log("buscar anuncios")

      //$scope.loading = angular.element('#loading').addClass("loader loader-default is-active");

      AnnouncementModel.getAnnouncementsFromFreelancer().then(response => {
        // $scope.records = response.data;

        if(response.data[0]){
          response.data.forEach(element => {
            let period = element.period.split(" ");
            let day = element.day_of_week.split(" ");
            element.period = [];
            element.day_of_week = [];
            element.period.push(period);
            element.day_of_week.push(day);
            $scope.records.push(element);
  
          });
  
          $scope.$apply();
        }else{
          $scope.getAnnouncementsFromFreelancer();
        }


       // $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

      });

    }


    $scope.deleteAnnouncementById = function (id) {

      $scope.records.splice($scope.records.indexOf(id), 1);

      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      AnnouncementModel.deleteAnnouncementById(id).then(response => {


        if (response.data.error == undefined) {
          swal("Anúncio removido!", "Seu Anúncio foi removido com sucesso!", "success");
          $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
          //$scope.getAnnouncementsFromFreelancer();
          $scope.$apply();

        } else {
          $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
          swal("Ooops!", "Seu Anúncio não foi removido, tente novamente!", "error");
        }
      });
    }

    $scope.edit = function (item) {
      console.log(item);
      $rootScope.announcement_item = item;
      localStorage.setItem("anuncio_edit", JSON.stringify($rootScope.announcement_item));
      $state.go('freelancerannouncementedit');
    }

    $scope.update = function () {

      //$scope.salvar.className = 'fa fa-spinner fa-spin fa-fw';

      var domingo = $scope.domingo == true ? 'Domingo' : '';
      var segunda = $scope.segunda == true ? ' Segunda' : '';
      var terca = $scope.terca == true ? ' Terça' : '';
      var quarta = $scope.quarta == true ? ' Quarta' : '';
      var quinta = $scope.quinta == true ? ' Quinta' : '';
      var sexta = $scope.sexta == true ? ' Sexta' : '';
      var sabado = $scope.sabado == true ? ' Sábado' : '';
      var manha = $scope.manha == true ? ' Manhã' : '';
      var tarde = $scope.tarde == true ? ' Tarde' : '';
      var noite = $scope.noite == true ? ' Noite' : '';

      $scope.day_of_week =
        domingo +
        segunda +
        terca +
        quarta +
        quinta +
        sexta +
        sabado;

      $scope.period = manha + tarde + noite;

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

      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");

      AnnouncementModel.update(data, $rootScope.announcement_item.id).then(response => {
        console.log(response.data);

        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

      })

    }

    $scope.createAnnouncement = function () {
      console.log('criar anuncio');

      $scope.salvar.className = 'fa fa-spinner fa-spin fa-fw';

      var domingo = $scope.domingo == true ? 'Domingo' : '';
      var segunda = $scope.segunda == true ? ' Segunda' : '';
      var terca = $scope.terca == true ? ' Terça' : '';
      var quarta = $scope.quarta == true ? ' Quarta' : '';
      var quinta = $scope.quinta == true ? ' Quinta' : '';
      var sexta = $scope.sexta == true ? ' Sexta' : '';
      var sabado = $scope.sabado == true ? ' Sábado' : '';
      var manha = $scope.manha == true ? ' Manhã' : '';
      var tarde = $scope.tarde == true ? ' Tarde' : '';
      var noite = $scope.noite == true ? ' Noite' : '';

      $scope.day_of_week =
        domingo +
        segunda +
        terca +
        quarta +
        quinta +
        sexta +
        sabado;

      $scope.period = manha + tarde + noite;

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

        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

        if (response.data.error == null) {
          swal(
            'Anúncio criado!',
            'Seu anúncio foi criado com sucesso!',
            'success'
          );
          $scope.amount = 0;
          $scope.description;
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

          $scope.$apply();
        } else {
          swal(
            'Anúncio não criado!',
            'Seu anúncio não foi criado!',
            'error'
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

    $scope.initAnnouncement = async function () {

      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      await $scope.getAnnouncementsFromFreelancer();

    }

    if ($rootScope.pageSelect == 'freelancerannouncement') {
      $scope.initAnnouncement();

    } else if ($rootScope.pageSelect == 'announcementfreelancer') {
      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

    } else if ($rootScope.pageSelect == 'freelancerannouncementedit') {


      if($rootScope.announcement_item == null){
        $rootScope.announcement_item = JSON.parse(localStorage.getItem("anuncio_edit"));
      }

      let amount = $rootScope.announcement_item.amount;
      $scope.amount = parseInt(amount);

      $scope.title = $rootScope.announcement_item.title;
      $scope.description = $rootScope.announcement_item.description;
      $scope.speciality = parseInt($rootScope.announcement_item.speciality_id -1);

      $scope.city = $rootScope.announcement_item.city;

      $scope.manha = $rootScope.announcement_item.period[0].includes("Manhã") ? true : false;
      $scope.tarde = $rootScope.announcement_item.period[0].includes("Tarde") ? true : false;
      $scope.noite = $rootScope.announcement_item.period[0].includes("Noite") ? true : false;

      $scope.domingo = $rootScope.announcement_item.day_of_week[0].includes("Domingo") ? true : false;
      $scope.segunda = $rootScope.announcement_item.day_of_week[0].includes("Segunda") ? true : false;
      $scope.terca = $rootScope.announcement_item.day_of_week[0].includes("Terça") ? true : false;
      $scope.quarta = $rootScope.announcement_item.day_of_week[0].includes("Quarta") ? true : false;
      $scope.quinta = $rootScope.announcement_item.day_of_week[0].includes("Quinta") ? true : false;
      $scope.sexta = $rootScope.announcement_item.day_of_week[0].includes("Sexta") ? true : false;
      $scope.sabado = $rootScope.announcement_item.day_of_week[0].includes("Sábado") ? true : false;

      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

    }

  },
]);