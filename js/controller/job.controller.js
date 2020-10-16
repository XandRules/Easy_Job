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

        if(response.data.room){
          $scope.room = response.data.room;
          $scope.createChatRoom();
        }else{
          $scope.openChat();
        }

      });

    }

    $scope.createChatRoom = function(){

      swal({
        text: 'Para iniciar a conversa digite sua mensagem!',
        content: "input",
        button: {
          text: "Enviar",
          closeModal: false,
        },
      })
      .then(name => {
        if (!name) throw null;
       
        $scope.message = name;     
        var data = {
          room: $scope.room,
          establishment_id: $rootScope.id,
          announcement_id: $rootScope.announcementSelectId.anuncio_id,
          freelancer_id: $rootScope.freelancer_id,
          to_user: $rootScope.freelancer_id,
          from_user: $rootScope.id,
          message: $scope.message,
        }
  
        console.log(data)
  
        JobModel.createNotificationFreelancer(data).then(response =>{
          console.log(response.data)
          swal.stopLoading();
          swal.close();
          swal("Mensagem Enviada", `Sua Mensagem foi Enviada para ${$scope.dataFreelancer.name.trim().split(" ")[0]}`,"success");
        })
  
      });

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