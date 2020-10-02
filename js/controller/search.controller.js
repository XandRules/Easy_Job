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

    window.addEventListener('load', () => {
      $scope.buscarCidadesBrasil();
      $scope.getSpecilities();
      $scope.searchAnnouncements();
    });

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

        console.log($scope.specilities);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      });

    };
    // 
    // Função responsavel por buscar os anuncios mais recentes sem categoria
    // 

    $scope.searchAnnouncements = function () {
      SearchModel.getAllAnnouncements().then(response => {
        console.log(response.data);
      })
    }


    // 
    // Função responsavel por buscar os anuncios por Filtro
    // 

    $scope.searchAnnouncementsByFilter = function () {

    }
  },
]);