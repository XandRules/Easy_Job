easyjob.controller('SearchController', [
  'SearchModel',
  '$scope',
  '$rootScope',
  'MainModel',

  function (SearchModel, $scope, $rootScope, MainModel) {
    console.log('Search');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;

    $scope.cidades;
    $scope.city;
    $scope.busy = false;

    window.addEventListener('load', () => {
      $scope.buscarCidadesBrasil();
      $scope.getSpecilities();
      $scope.searchAnnouncements();
    });


    $scope.anuncios = [];

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name.split(" ")[0] : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    //
    //  Função para retornar apenas as cidades do sul de minas gerais.
    //
    $scope.buscarCidadesBrasil = function () {
      SearchModel.buscarCidades().then(response => {
        if (response.data != null) {
          $scope.cidades = response.data.filter(cidade => {
            return cidade.municipio.microrregiao.mesorregiao.UF.sigla === "MG" && cidade.municipio.microrregiao.mesorregiao.nome === "Sul/Sudoeste de Minas";
          }).map(cidadesDeMinas => {
            return cidadesDeMinas.nome;
          }).sort();
          console.log($scope.cidades);
        }
      })
    };

    //  
    // Função para autocompletar o nome da cidade 
    // 
    $scope.autoCompleteLocale = function () {
      $(function () {
        $("#localidade").autocomplete({
          source: $scope.cidades
        });
      });
    }

    //  
    // Função Buscar as especialidades cadastradas no Banco 
    // 

    $scope.getSpecilities = function () {

      MainModel.getSpecilities().then(function (response) {

        $rootScope.specilities = [];

        response.data.forEach((element) => {
          $rootScope.specilities.push(element);
        });

        console.log($rootScope.specilities);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      });

    };
    // 
    // Função responsavel por buscar os anuncios mais recentes sem categoria
    // 

    $scope.searchAnnouncements = function () {
      SearchModel.getAllAnnouncements().then(response => {
        if (response.data[0]) {
          response.data.forEach(element => {
            let period = element.period.split(" ");
            let day = element.day_of_week.split(" ");
            element.period = [];
            element.day_of_week = [];
            element.period.push(period);
            element.day_of_week.push(day);
            $scope.anuncios.push(element);

          });

          $scope.$apply();
        } else {
          $scope.searchAnnouncements();
        }
      })
    }


    // 
    // Função responsavel por buscar os anuncios por Filtro
    // 

    $scope.searchAnnouncementsByFilter = function () {

    }

    // 
    // Função para Criar um Scrool Infinito
    // 

    $scope.loadMore = function () {

      if ($scope.busy) return;

      $scope.busy = true;

      SearchModel.getAllAnnouncements().then(response => {
        if (response.data[0]) {
          response.data.forEach(element => {
            let period = element.period.split(" ");
            let day = element.day_of_week.split(" ");
            element.period = [];
            element.day_of_week = [];
            element.period.push(period);
            element.day_of_week.push(day);
            $scope.anuncios.push(element);
          });

          $scope.busy = false;
          $scope.$apply();
        } else {
          $scope.loadMore();
        }
      })

    }
  },
]);


easyjob.directive('infinitScrollPage', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      var elm = $(document);
      elm.bind('scroll', function () {
        var porcentagem = (($(window).scrollTop() + window.innerHeight) / $(this).height()).toFixed(2);
        if (porcentagem >= 0.95) { //só aplica o scroll se for maior igual a 95%
          scope.$apply(attr.infinitScrollPage);
        }
      });
    }
  };
});