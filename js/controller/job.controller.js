easyjob.controller('JobController', [
  'JobModel','SearchModel','MainModel','AnnouncementModel','$scope','$rootScope',
  function (JobModel, SearchModel,MainModel,AnnouncementModel, $scope,$rootScope) { 

    //console.log("Job");

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
    $scope.establishmentOptions = false;
    $scope.jobId;

    $scope.jobList;
    $scope.jobCount = 0;
    $scope.job = [];
    $scope.rate = 0;
    $scope.messageRate = '';
    
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
      $rootScope.email = sessionValidated != undefined ? sessionValidated.freelancer.email: null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.freelancer.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesfreelancer'
      $scope.showOptions = false;
      $scope.role = "freelancer";

    }else{
      $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name : null;
      $rootScope.email = sessionValidated != undefined ? sessionValidated.establishment.email : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.establishment.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesestablish'
      $scope.showOptions = true;
      $scope.role = "establish";
    }

    $scope.dataFreelancer;    

    $scope.formatDate = function(data){

      let date = new Date(data);

      let year;
      let month;
      let day;

      day = date.getDate();
      year = date.getFullYear();
      month = date.getMonth() + 1;

      return day + " / " + month + " / " + year;

    }

    $rootScope.announcementSelectId = JSON.parse(localStorage.getItem("anuncio_id")); 

    $scope.refuseById = function(id){
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      data = {
        accepted : 'Rejeitado'
      }
      JobModel.refuseById(id, data).then(function(response){
        $scope.showOptions = true;
        $scope.fetchNotification();
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

      })
    }

    $scope.acceptedById = function(id){
      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
      data = {
        accepted : 'Aceito'
      }
      JobModel.refuseById(id, data).then(function(response){

        $scope.user = JSON.parse(localStorage.getItem("dataUser"));
        $scope.showOptions = true;
        
        data = {
          name : $rootScope.name,
          email:  $rootScope.email,
          role: $scope.role,
          type: 2,
          begin_time : $scope.jobList[0].begin_time,
          end_time : $scope.jobList[0].end_time,
          amount: $scope.jobList[0].amount,
          endereco : `${$scope.jobList[0].establishment.company_name} ${$scope.jobList[0].establishment.address.public_place} ${$scope.jobList[0].establishment.address.number} ${$scope.jobList[0].establishment.address.neighborhood} ${$scope.jobList[0].establishment.address.city}`,
        }

        MainModel.sendEmail(data).then(response => {
          //console.log(response);  
        });

        let establishment_id;
        let announcement_id;

        $scope.jobList.forEach(item =>{

          if(item.id == id){
            establishment_id = item.establishment_id;
            announcement_id = item.announcement_id;
          }
        })

        job = {
          initial_job_id : id,
          establishment_id: establishment_id,
          announcement_id: announcement_id,
          date: new Date(),
        }

        JobModel.createJob(job).then(response =>{
          console.log(response.data);
        })

        //console.log(response);
        $scope.fetchNotification();
        $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      })
    }

    $scope.deleteById = function(id){
      $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

      JobModel.deleteById(id).then(function(response){
        $scope.fetchNotification();
        $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      })
    }

    $scope.pushAnnouncementFromFreelancer = function(){
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");

      JobModel.getAnnouncementsFromFreelancer($rootScope.announcementSelectId.anuncio_id).then(response =>{
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

      $scope.applyJob = $scope.dataFreelancer.day_of_week.find(dayOfWeek =>{
        $scope.applyJob = week[day] === dayOfWeek;
        return $scope.applyJob;
      });

      if($scope.applyJob == undefined){
        swal("Atenção!","A data selecionada para o serviço não atende o critério de disponibilidade do anunciante!","info");
      }
    }

    $scope.openChat = function(){

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

      data = {
        to_user : $scope.dataFreelancer.freelancer_id_hash,
        from_user : $rootScope.id_hash,
        amount : $scope.amountService,
        comment : $scope.comment,
        date : $scope.date.toISOString(),
        begin_time : beginTime,
        end_time : endTime,
        announcement_id : $rootScope.announcementSelectId.anuncio_id,
        establishment_id : $rootScope.id,
        accepted: 'Pendente',
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
  
        //console.log(data)
  
        JobModel.createNotificationFreelancer(data).then(response =>{
          //console.log(response.data)
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

            
            $scope.jobList.forEach((job, index) =>{

              AnnouncementModel.getAnnouncementsById(job.announcement_id).then(function(response){
          
                $scope.jobList[index].title = response.data.title;
                                          
                $scope.$apply();
                $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
              })
              
            });
            
          }
        });

      }
      if($rootScope.pageSelect === "freelancerjoblist"){

        SearchModel.fetchNotificationJobList($rootScope.id_hash).then(response =>{
          if(response.data.length > 0){
            $scope.jobList = response.data;

            $scope.jobList.forEach((job, index) =>{

              if(job.accepted != false){
                $scope.jobCount++;
              }

              AnnouncementModel.getAnnouncementsById(job.announcement_id).then(function(response){
          
                $scope.jobList[index].title = response.data.title;   
                                                    
                $scope.$apply();
                $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
              })
              
            });

          }else{
            $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
          }
        });

      }
    }

    $scope.endService = function(id){
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      data = {
        accepted : 'Finalizado'
      }
      JobModel.refuseById(id, data).then(function(response){
        $scope.showOptions = true;
        $scope.fetchNotification();
        $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");

      })


    }

    $scope.openModalrate = function(id){

      $scope.jobId = id;
      
    }

    $scope.rateService = function(id){
      console.log($scope.rate);
      console.log($scope.messageRate);

      let data;

      if($rootScope.pageSelect == 'establishjoblist'){

        data ={        
          establishment_evaluation: $scope.rate,
          establishment_comment : $scope.messageRate
        }        
      }else{
        data ={         
          freelancer_evaluation: $scope.rate,
          freelancer_comment : $scope.messageRate
        }
      }

      JobModel.rateUser($scope.jobId,data).then(function(response){
        console.log(response.data[0]);
      })

      $('myModal').hide();
      $scope.rate = 0;
      $scope.messageRate = '';
      swal("Avaliação Enviada","Sua avaliação foi feita com sucesso", "success");

    }

    $scope.fetchNotification();
    if($rootScope.pageSelect === 'freelancerjob'){
      $scope.pushAnnouncementFromFreelancer();
    }

  },
]);