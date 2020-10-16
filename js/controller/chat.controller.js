easyjob.controller('ChatController', [
  '$scope','$rootScope','SearchModel',
  function ($scope, $rootScope,SearchModel) {
    console.log('Chat');
    $scope.message;

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;
    $scope.salesUser;


    var socket = io.connect("https://easyjob-app.herokuapp.com");
    var ready = false;   

    var time = new Date();

    ready = true;
    $scope.login = function () {
      socket.emit($rootScope.chatRoom, $rootScope.name);
    }

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));    

    if(sessionValidated.freelancer != undefined){
      $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.freelancer.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesfreelancer'

    }else{
      $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
      $rootScope.id_hash = sessionValidated != undefined ? sessionValidated.establishment.id_hash : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
      $scope.salesUser = 'salesestablish'
    }

    $scope.returnToFather = function(){
      $state.go($scope.salesUser);
    }
    
    socket.on("update", function (msg) {
      if (ready) {
        console.log(msg);
        $('.chat').append('<li class="info">' + msg + '</li>')
      }
    });

    socket.on($rootScope.chatRoom, function (client, msg) {
      if (ready) {
        var time = new Date();

        $scope.client = client;

        console.log($scope.client);

        $scope.time = time.getHours() + ':' + time.getMinutes();
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

    $scope.sendMessage = function () {

      var text = $scope.message;
      var time = new Date();
      $scope.time = time.getHours() + ':' + time.getMinutes();

      $('.msg_history').append(`
      <div class="media "><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
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

    $scope.fetchDataChatUsers = function(){
      SearchModel.fetchDataChatUsers($rootScope.chatRoom).then(response =>{
        console.log(response.data)
      });
    }

    $scope.fetchDataChatUsers();

    $scope.login();


  },
]);