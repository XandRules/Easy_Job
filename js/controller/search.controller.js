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

    // function typeWrite(elemento, palavra) {
    //   const textoArray = palavra.split('');
    //   elemento.innerHTML = ' ';
    //   $scope.timeLapse = 0;
    //   textoArray.forEach(function (letra, i) {
    //     setTimeout(function () {
    //       elemento.innerHTML += letra;
    //       $scope.timeLapse += (150 * i);
    //     }, 150 * i);
    //   });

    //   setTimeout(function () {
    //     $scope.end = true;
    //     $scope.nextWord();
    //   }, $scope.timeLapse)

    //   return $scope.end;

    // }

    // $scope.typeWriter = function () {

    //   const titulo = document.querySelector('.especialidade');

    //   typeWrite(titulo, $scope.especialitiesLabel[index]);

    // }

    // $scope.nextWord = function () {
    //   if ($scope.end) {
    //     setTimeout(function () {
    //       if ($scope.especialitiesLabel.length > index) {
    //         index++;
    //       } else {
    //         index = 0;
    //       }
    //       $scope.typeWriter();
    //     }, 3000);
    //   }
    // }


    if ($rootScope.pageSelect == 'searchfreelancer') {
      $scope.getSpecilities();

      // $scope.typeWriter();

      console.log("teste");
    }
  },
]);