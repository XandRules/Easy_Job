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
    $scope.room;

    $scope.note = 4.89;

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    $scope.dataFreelancer;    
    $rootScope.announcementSelectId = JSON.parse(localStorage.getItem("anuncio_id")); 

    $scope.pushAnnouncementFromFreelancer = () =>{
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      JobModel.getAnnouncementsFromFreelancer($rootScope.announcementSelectId.anuncio_id).then(response =>{
        console.log(response.data);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

        localStorage.setItem("freelancer_id",response.data.freelancer_id);

        $scope.dataFreelancer = response.data;        
        $scope.dataFreelancer.day_of_week = $scope.dataFreelancer.day_of_week.split(" ");
        $scope.dataFreelancer.period = $scope.dataFreelancer.period.trim().split(" ");

        $scope.$apply();
        
      });
    }

    $scope.openChat = function(){
      console.log($rootScope.announcementSelectId.anuncio_id);

      $rootScope.freelancer_id = JSON.parse(localStorage.getItem("freelancer_id")); 

      JobModel.createChat({room : `anuncio_${$rootScope.id}_${$rootScope.announcementSelectId.anuncio_id}_${$rootScope.freelancer_id}`}).then(response =>{

        if(response.data){
          $scope.room = response.data.room;
        }

      });

      $scope.createChatRoom();
    }

    $scope.createChatRoom = function(){
      var data = {
        room: $scope.room,
        stablish_id: $rootScope.id,
        anuncio_id: $rootScope.announcementSelectId.anuncio_id
      }

      console.log(data)

      JobModel.createNotificationFreelancer(data).then(response =>{
        console.log(response.data)
      })
    }

    $scope.generateHash = function(){
      var hash = 0, i, chr;
      var code = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (i = 0; i < 30; i++) {
         hash +=  code[Math.floor(Math.random() * code.length)]
        }
        return hash;
    }

    console.log($scope.generateHash());

    $scope.pushAnnouncementFromFreelancer();

  },
]);