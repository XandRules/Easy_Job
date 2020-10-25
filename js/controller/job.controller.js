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

    $scope.beginTime;
    $scope.endTime;
    $scope.date;
    $scope.amountService;
    $scope.comment;
    $scope.acceptTerms;
    $scope.applyJob;

    const week = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ]

    $scope.note = 4.89;

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name : null;
    $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
    $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.establishment.id_hash : null;
    $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;

    $scope.dataFreelancer;    
    $rootScope.announcementSelectId = JSON.parse(localStorage.getItem("anuncio_id")); 

    $scope.pushAnnouncementFromFreelancer = () =>{
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      JobModel.getAnnouncementsFromFreelancer($rootScope.announcementSelectId.anuncio_id).then(response =>{
        console.log(response.data);
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

        localStorage.setItem("freelancer_id", JSON.stringify({"id" : response.data.freelancer_id, "id_hash": response.data.freelancer_id_hash}));

        $scope.dataFreelancer = response.data;        
        $scope.dataFreelancer.day_of_week = $scope.dataFreelancer.day_of_week.split(" ");
        $scope.dataFreelancer.period = $scope.dataFreelancer.period.trim().split(" ");
        $scope.amountService = parseInt($scope.dataFreelancer.amount);

        $scope.$apply();
        
      });
    }

    $scope.verifyDisponibilityDate = function(){
      const dateService  = new Date($scope.date);

      const day = dateService.getDay();

      console.log(week[day])

      $scope.applyJob = $scope.dataFreelancer.day_of_week.find(dayOfWeek =>{
        $scope.applyJob = week[day] === dayOfWeek;
        return $scope.applyJob;
      });

      if($scope.applyJob == undefined){
        swal("Atenção!","A data selecionada para o serviço não atende o critério de disponibilidade do anunciante!","info");
      }
    }

    $scope.openChat = function(){
      console.log($rootScope.announcementSelectId.anuncio_id);

      $rootScope.freelancer_id = JSON.parse(localStorage.getItem("freelancer_id")); 

      JobModel.createChat({room : `anuncio_${$rootScope.id}_${$rootScope.announcementSelectId.anuncio_id}_${$rootScope.freelancer_id.id}`}).then(response =>{

        if(response.data.room){
          $scope.room = response.data.room;
          $scope.createChatRoom();
        }else{
          $scope.openChat();
        }

      });

    }

    $scope.sendNotificationJob = function(){

      console.log($scope.beginTime);
      console.log($scope.endTime);
      console.log($scope.date);
      console.log($scope.amountService);
      console.log($scope.comment);
      console.log($scope.acceptTerms);

      console.log("Clicou em enviar notificação");

      let endTime;
      let beginTime;

      endTime = ($scope.endTime.getHours() > 9 ? $scope.endTime.getHours() : "0" + $scope.endTime.getHours()) 
      
      endTime += ":" + $scope.endTime.getMinutes() > 9 ? $scope.endTime.getMinutes() : "0" + $scope.endTime.getMinutes(); 

      beginTime = ($scope.beginTime.getHours() > 9 ? $scope.beginTime.getHours() : "0" + $scope.beginTime.getHours()) 
      
      beginTime += ":" + $scope.beginTime.getMinutes() > 9 ? $scope.beginTime.getMinutes() : "0" + $scope.beginTime.getMinutes(); 

      var year = $scope.date.getFullYear();
      var month = ($scope.date.getMonth() + 1);
      var day = $scope.date.getDay();

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      $scope.date = year + '-' + month + '-' + day;

      data = {
        to_user : $scope.dataFreelancer.freelancer_id_hash,
        from_user : $rootScope.id_hash,
        amount : $scope.amountService,
        comment : $scope.comment,
        date : $scope.date,
        begin_time : beginTime,
        end_time : endTime,
        accepted : $scope.acceptTerms,
      }



      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");

      JobModel.sendNotificationJob(data).then(response =>{
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

        if(response.data.error == null){
          swal('Solicitação enviada!',`Notificação enviada com sucesso para ${$scope.dataFreelancer.name.trim().split(" ")[0]} você receberá uma notificação informando a negociação!`, 'success')
        }
      })

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

        let messageDate = new Date();
        // messageDate = messageDate.toLocaleString('pt-BR', {});
        var data = {
          room: $scope.room,
          establishment_id: $rootScope.id,
          announcement_id: $rootScope.announcementSelectId.anuncio_id,
          freelancer_id: $rootScope.freelancer_id.id,
          to_user: $rootScope.freelancer_id.id_hash,
          from_user: $rootScope.id_hash,
          date: messageDate,
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

    $scope.pushAnnouncementFromFreelancer();

  },
]);