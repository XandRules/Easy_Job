easyjob.controller('JobController', [
  'JobModel','SearchModel','$scope','$rootScope',
  function (JobModel, SearchModel, $scope,$rootScope) { 

    console.log("Job");

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

    $scope.jobList = [
      {
        id: 1,
        to_user: "06WrgKxLrmr6yjlKPK1KIU5G1jYRpRdvv2TAijjpbnUhmGgG8uNohRLFmmcIx",
        from_user: "0NSA8wPPY0XDA2H64jMI0sCLm0orydegWhYqy2QL6mHc1iBQ4ugFql6BynICR",
        comment: "gostaria de poder contar com seus serviços",
        begin_time: "22:07",
        end_time: "22:07",
        date: "2020-10-30T00:00:00.000Z",
        amount: 10,
        accepted: null,
        createdAt: "2020-10-27T01:08:07.107Z",
        updatedAt: "2020-10-27T01:08:07.107Z",
        announcement_id: 1,
        title: "Garçom experiente",
        establishment_id: 1,
        establishment: {
          id: 1,
          company_name: "Restaurante do Manuel",
          social_reason: "Bar e Restaurante Fecha Nunca",
          email: "alexandresilva58@gmail.com",
          cnpj: "1234567897899",
          bio: "Bar e Restaurante Fecha nunca aberto todos os dias.",
          phone: "(35) 99990-9612",
          password_hash: "$2a$08$CJPLewbhHuoUe./3ciW/u.KfLlDf3tGIKx6m0busDHd1m/VR.mhbq",
          active: false,
          terms_of_use: true,
          id_hash: "0NSA8wPPY0XDA2H64jMI0sCLm0orydegWhYqy2QL6mHc1iBQ4ugFql6BynICR",
          createdAt: "2020-10-27T00:38:27.052Z",
          updatedAt: "2020-10-27T01:03:33.693Z",
          avatar_id: null,
          address_id: 5,
          address: {
            id: 5,
            public_place: "rua Vicente Vono",
            uf: "MG",
            number: "116",
            city: "Santa Rita do Sapucaí",
            neighborhood: "Centro",
            cep: "37540-000",
            createdAt: "2020-10-27T00:31:54.534Z",
            updatedAt: "2020-10-27T00:31:54.534Z"
          }
        }
      }
    ]
    console.log($scope.jobList[0]);

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


    if(sessionValidated.freelancer != undefined){
      $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.freelancer.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesfreelancer'
      $scope.showOptions = false;

    }else{
      $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.establishment.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesestablish'
      $scope.showOptions = true;
    }

    $scope.dataFreelancer;    
    $rootScope.announcementSelectId = JSON.parse(localStorage.getItem("anuncio_id")); 

    $scope.pushAnnouncementFromFreelancer = function(){
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

      let endTime;
      let beginTime;

      let hour;
      let minutes;

      hour = ($scope.endTime.getHours() > 9 ? $scope.endTime.getHours() : "0" + $scope.endTime.getHours()) 
      
      minutes =  $scope.endTime.getMinutes() > 9 ? $scope.endTime.getMinutes() : "0" + $scope.endTime.getMinutes(); 

      endTime = hour + ":" + minutes;
      
      hour = ($scope.beginTime.getHours() > 9 ? $scope.beginTime.getHours() : "0" + $scope.beginTime.getHours()) 
      
      minutes = $scope.beginTime.getMinutes() > 9 ? $scope.beginTime.getMinutes() : "0" + $scope.beginTime.getMinutes(); 
      
      beginTime = hour + ":" + minutes;

      var year = $scope.date.getFullYear();
      var month = ($scope.date.getMonth() + 1);
      var day = $scope.date.getDate();

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
        announcement_id : $rootScope.announcementSelectId.anuncio_id,
        establishment_id : $rootScope.id,
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

    // 
    // Buscar notificações de novas mensagens e notificações de serviços
    // 

    $scope.fetchNotification = function(){
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      if($rootScope.pageSelect === "establishjoblist"){

        SearchModel.fetchNotificationJobList($rootScope.id_hash).then(response =>{
          if(response.data){
            $scope.jobList = response.data;
            $scope.$apply();
            $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
          }
        });

      }
      if($rootScope.pageSelect === "freelancerjoblist"){

        SearchModel.fetchNotificationJobList($rootScope.id_hash).then(response =>{
          if(response.data){
            $scope.jobList = response.data;
            $scope.$apply();
            $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
          }
        });

      }
    }

    $scope.fetchNotification();

    $scope.pushAnnouncementFromFreelancer();

  },
]);