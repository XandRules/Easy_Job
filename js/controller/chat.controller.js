
easyjob.controller('ChatController', [
  '$scope','$state','$rootScope','SearchModel','FreelancerModel', 'EstablishModel','JobModel',
  function ($scope,$state, $rootScope,SearchModel,FreelancerModel, EstablishModel,JobModel) {
    console.log('Chat');
    $scope.message;

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;
    $scope.salesUser;
    $scope.chatMessages;
    $scope.role;
    $scope.freelancerData;
    $scope.establishData;
    $scope.chatAnnouncementId;
    $scope.avatar;
    $scope.room;


    var socket = io.connect("https://easyjob-app.herokuapp.com");
    var ready = false;   

    var time = new Date();    

    $scope.showOptions = false;

    ready = true;
    $scope.login = function () {
      socket.emit("join", $rootScope.name);
    }

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));    

    if(sessionValidated.freelancer != undefined){
      $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.freelancer.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesfreelancer'
      $scope.showOptions = false;
      $scope.role = "freelancer";

    }else{
      $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.establishment.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesestablish'
      $scope.showOptions = true;
      
      $scope.role = "establishment";
    }

    $scope.returnToFather = function(){
      $state.go($scope.salesUser);
    }

    $scope.offerJob = function(){
      /// aqui preciso abrir o modal;
    }
    
    socket.on("update", function (msg) {
      if (ready) {
        console.log(msg);
        $('.chat').append('<li class="info">' + msg + '</li>')
      }
    });

    socket.on("chat", function (client, msg) {
      if (ready) {
        var time = new Date();

        $scope.client = client;

        console.log($scope.client);

        $scope.time =  time.getDate() +"/" + time.getMonth() +1 + "/"+  time.getFullYear() + time.getHours() + ':' + time.getMinutes();
        $scope.messageClient = msg;

        $scope.contacts = $scope.client;
        $scope.contactMessage = $scope.messageClient;

        $('.msg_history').append(`
        <div class="media w-50 ml-auto mb-3">
        <div class="media-body">
          <div class="bg-primary rounded py-2 px-3 mb-2">
            <p class="text-small mb-0 text-white">${$scope.client } diz:  ${$scope.messageClient}</p>
          </div>
          <p class="small text-muted">${$scope.time}</p>
        </div>
      </div>  
        `)

        $scope.$apply();
      }
    });

    $scope.openChat = function(msg){
      
      let messageDate = new Date();
      // messageDate = messageDate.toLocaleString('pt-BR', {});

      if($scope.role === 'freelancer'){
        var data = {
          room: $scope.room,
          establishment_id: $scope.establishData.id,
          announcement_id: $scope.chatAnnouncementId,
          freelancer_id: $scope.freelancerData.id,
          to_user: $scope.establishData.id_hash,
          from_user: $scope.freelancerData.id_hash,
          date: messageDate,
          message: msg,
        }
      }else{
        var data = {
          room: $scope.room,
          establishment_id: $scope.establishData.id,
          announcement_id: $scope.chatAnnouncementId,
          freelancer_id: $scope.freelancerData.id,
          to_user: $scope.freelancerData.id_hash,
          from_user: $scope.establishData.id_hash,
          date: messageDate,
          message: msg,
        }
      }

      JobModel.createNotificationFreelancer(data).then(response =>{
        console.log(response.data)
      });

    }

    $scope.sendMessage = function () {

      var text = $scope.message;
      var time = new Date();
      $scope.time = time.getHours() + ':' + time.getMinutes();

      $scope.openChat(text);

      $('.msg_history').append(`
      <div class="media "><img src="${$scope.avatar}" alt="user" width="50" class="rounded-circle">
      <div class="media-body ml-3">
        <div class="bg-light rounded py-2 px-3 mb-2">
          <p class="text-small mb-0 text-muted">${$scope.message}</p>
        </div>
        <p class="small text-muted">${$scope.time}</p>
      </div>
    </div>
      
      `)

      socket.emit("send", text);

      $scope.message = '';
    }

    // 
    // Buscar notificações de novas mensagens
    // 

    $scope.fetchNotification = function(){
        SearchModel.fetchNotificationChat($rootScope.id_hash).then(response =>{
          if(response.data.length > 0 ){
            console.log("chat", response.data)

            $scope.chatMessages = response.data;

            const messagesFromRender = $scope.chatMessages.map(messages =>{
              let message = {
                message_id: messages.id,
                from_user: messages.from_user,
                to_user: messages.to_user,
                message: messages.message,
                date: messages.updatedAt,
                room: messages.room,
                freelancer_id: messages.freelancer_id,
                establishment_id: messages.establishment_id,
                announcement_id : messages.announcement_id
              }

              return message;
            })

            console.log("messagesChat", messagesFromRender);

            $scope.loadChat(messagesFromRender);

            if(response.data[0].room != undefined){
              $scope.chatCount = response.data.length;
  
              $rootScope.chatRoom = response.data[0].room;
              $scope.fetchDataChatUsers();
  
              $scope.$apply();
            }
            
          }else if(response.data.error){
            $scope.fetchNotification();
          }
        })
    }

    $scope.fetchDataChatUsers = function(){
      SearchModel.fetchDataChatUsers($rootScope.chatRoom).then(response =>{
        console.log("menssagens",response.data)
      });
    }

    $scope.loadChat = function(data){    
      $scope.loading = angular.element('#loading').addClass("loader loader-default is-active");
      $scope.data
      
      data.map(msg=>{

        FreelancerModel.getFreelancerById(msg.freelancer_id).then(function(response){
          $scope.freelancerData = response.data[0];

          EstablishModel.getEstablish(msg.establishment_id).then(function(response){
            $scope.establishData = response.data[0];

            $scope.chatAnnouncementId = msg.announcement_id;
            $scope.room = msg.room;

            if($scope.role === 'freelancer'){

              $scope.avatar = 'https://easyjobapp.vercel.app/img/notre-dame.svg';  
              $scope.avatar2 = 'https://easyjobapp.vercel.app/img/seguran%C3%A7a.jpg';          

              if(msg.from_user == $scope.freelancerData.id_hash){
                $('.msg_history').append(`
                <div class="media "><img src="${$scope.avatar}" alt="user" width="50" class="rounded-circle">
                <div class="media-body ml-3">
                  <div class="bg-light rounded py-2 px-3 mb-2">
                    <p class="text-small mb-0 text-muted">${msg.message}</p>
                  </div>
                  <p class="small text-muted">${msg.date}</p>
                </div>
              </div>
                
                `)
                
                $scope.client = $scope.establishData.company_name;

               }else{
  
                $scope.messageClient = msg.message;
                $scope.time = msg.date;
                $scope.client = $scope.establishData.company_name;
  
                 $('.msg_history').append(`
                 <div class="media w-50 ml-auto mb-3">
                 <div class="media-body">
                   <div class="bg-primary rounded py-2 px-3 mb-2">
                     <p class="text-small mb-0 text-white">${$scope.establishData.company_name } diz:  ${msg.message}</p>
                   </div>
                   <p class="small text-muted">${msg.date}</p>
                 </div>
               </div>  
                 `)
               } 

               $scope.$apply();

            }else{

              $scope.avatar = 'https://easyjobapp.vercel.app/img/seguran%C3%A7a.jpg';
              $scope.avatar2 = 'https://easyjobapp.vercel.app/img/notre-dame.svg';

              
              if(msg.from_user == $scope.establishData.id_hash){
                $('.msg_history').append(`
                <div class="media "><img src="${$scope.avatar2}" alt="user" width="50" class="rounded-circle">
                <div class="media-body ml-3">
                  <div class="bg-light rounded py-2 px-3 mb-2">
                    <p class="text-small mb-0 text-muted">${msg.message}</p>
                  </div>
                  <p class="small text-muted">${msg.date}</p>
                </div>
              </div>
                
                `)

                $scope.client = $scope.freelancerData.name;

               }else{
   
                          
                $scope.messageClient = msg.message;
                $scope.time = msg.date;
                $scope.client = $scope.freelancerData.name;
   
                 $('.msg_history').append(`
                 <div class="media w-50 ml-auto mb-3">
                 <div class="media-body">
                   <div class="bg-primary rounded py-2 px-3 mb-2">
                     <p class="text-small mb-0 text-white">${$scope.client} diz:  ${msg.message}</p>
                   </div>
                   <p class="small text-muted">${msg.date}</p>
                 </div>
               </div>  
                 `)
               } 
               
               $scope.$apply();

            }
          })
          $scope.loading = angular.element('#loading').removeClass("loader loader-default is-active");
        });//.then
       }); //map
    }

    $scope.announcementSelect = function(){

      $rootScope.announcementSelectId = $scope.chatAnnouncementId;

      localStorage.setItem('anuncio_id',JSON.stringify({"anuncio_id" : $rootScope.announcementSelectId,}));

      $state.go('freelancerjob');
      
    }
    
    $scope.login();

    $scope.fetchNotification();

  },
]);