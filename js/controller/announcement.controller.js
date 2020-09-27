easyjob.controller('AnnouncementController', [
  'AnnouncementModel',
  '$scope',
  '$rootScope',
  function (AnnouncementModel, $scope, $rootScope) {
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
    
    $scope.announcements = {
      "title": "Meu Título",
      "description": "description",
      "amount": "R$40,00",
      "name": "Alexandre",
      "speciality": "Segurança",
      "period": "Quarta Sexta",
      "city": "Caxambu"
    };

    $scope.records = [{
      "title": "Meu Título",
      "description": "description",
      "amount": "R$40,00",
      "name": "Alexandre",
      "speciality": "Segurança",
      "period": "Quarta | Sexta",
      "city": "Caxambu"
    },{
      "title": "Meu Título",
      "description": "description",
      "amount": "R$40,00",
      "name": "Alexandre",
      "speciality": "Segurança",
      "period": "Quarta | Sexta",
      "city": "Caxambu"
    }];

    $scope.getAnnouncementsFromFreelancer = function(){
      console.log("buscar anuncios")

      document.getElementById("loading").style.display = "none";
      document.getElementById("content").style.display = "block";
      document.getElementById("content2").style.display = "block";
    }

    $scope.createAnnouncement = function () {
      console.log('criar anuncio');

      $scope.salvar.className = 'fa fa-spinner fa-spin fa-fw';

      var domingo = $scope.domingo == true ? 'Domingo ' : '';
      var segunda = $scope.segunda == true ? 'Segunda ' : '';
      var terca = $scope.terca == true ? 'Terça ' : '';
      var quarta = $scope.quarta == true ? 'Quarta ' : '';
      var quinta = $scope.quinta == true ? 'Quinta ' : '';
      var sexta = $scope.sexta == true ? 'Sexta ' : '';
      var sabado = $scope.sabado == true ? 'Sábado ' : '';
      var manha = $scope.manha == true ? 'Manhã ' : '';
      var tarde = $scope.tarde == true ? 'Tarde ' : '';
      var noite = $scope.noite == true ? 'Noite ' : '';

      $scope.day_of_week =
        domingo +
        '|' +
        segunda +
        '|' +
        terca +
        '|' +
        quarta +
        '|' +
        quinta +
        '|' +
        sexta +
        '|' +
        sabado;

      $scope.period = manha + '|' + tarde + '|' + sexta;

      data = {
        amount: $scope.amount,
        title: $scope.title,
        period: $scope.period,
        description: $scope.description,
        day_of_week: $scope.day_of_week,
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
    }


  },
]);
