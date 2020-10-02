easyjob.controller('SearchController', [
  'SearchModel',
  '$scope',
  '$rootScope',
  'MainModel',
  function (EstablishModel, $scope, $rootScope, MainModel) {
    console.log('Search');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;
    $scope.speciality_label = ["Freelancer", "Garçom / Garçonete", "Segurança", "Recepcionista", "Banda / Músico", "Motoboy"];
    $scope.speciality_label_writer = "";
    var index = 0;
    $scope.timeLapse = 0;
    $scope.end = false;

    $scope.especialitiesLabel = [
      "Freelancer",
      "Cozinheiro(a)",
      "Banda/Músico",
      "Garçon",
      "Segurança",
      "Motoboy",
      "Recepcionista"
    ]

    $scope.speciality = "";

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
    // 
    // Função responsavel por buscar os anuncios mais recentes sem categoria
    // 

    $scope.searchAnnouncements = function(){

    }


    // 
    // Função responsavel por buscar os anuncios por Filtro
    // 

    $scope.searchAnnouncementsByFilter = function(){

    }



    if ($rootScope.pageSelect == 'searchfreelancer') {
      $scope.getSpecilities();

      // $scope.typeWriter();

      console.log("teste");
    }
  },
]);