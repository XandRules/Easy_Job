easyjob.controller('JobController', [
  'JobModel','$scope','$rootScope',
  function (JobModel,$scope,$rootScope) { 

    console.log("Job");

    window.addEventListener("load", ()=>{
      $scope.pushAnnouncementFromFreelancer();
    })

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;

    $scope.dataFreelancer = {
      "title": "profissional Garçom",
      "description": "Tenho mais de 2 anos de experiência",
      "period": "Manhã Tarde Noite",
      "amount": "70",
      "city": "Santa Rita do Sapucaí",
      "day_of_week": "Domingo Segunda Terça Quarta Quinta Sexta Sábado",
      "bio": "Experiência de mais de 2 anos como Garçom",
      "name": "Alexandre da Silva Ribeiro",
      "speciality_function": "Garçom/Garçonete"
  }

  $scope.dataFreelancer.day_of_week = $scope.dataFreelancer.day_of_week.split(" ");
  $scope.dataFreelancer.period = $scope.dataFreelancer.period.split(" ");

    if(!$rootScope.announcementSelectId){
      $rootScope.announcementSelectId = JSON.parse(localStorage.getItem("anuncio_id"));
    }


    $scope.pushAnnouncementFromFreelancer = () =>{
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      JobModel.getAnnouncementsFromFreelancer($rootScope.announcementSelectId).then(response =>{
        console.log(response);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      });
    }

    $scope.openChat = function(){
      console.log($rootScope.id);
    }

  },
]);