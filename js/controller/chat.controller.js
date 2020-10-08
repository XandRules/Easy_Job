easyjob.controller('ChatController', [
  '$scope','$rootScope',
  function ($scope, $rootScope) {
    console.log('Chat');
    $scope.message;

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;


    var socket = io.connect("https://easyjob-app.herokuapp.com");
    var ready = false;   

    var time = new Date();

    ready = true;
    $scope.login = function () {
      socket.emit("join", $rootScope.name);
    }

    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));    

    if(sessionValidated.freelancer != undefined){
      $rootScope.name = sessionValidated != undefined ? sessionValidated.freelancer.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.freelancer.id : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
    }else{
      $rootScope.name = sessionValidated != undefined ? sessionValidated.establishment.name.split(" ")[0] : null;
      $rootScope.id = sessionValidated != undefined ? sessionValidated.establishment.id : null;
      $rootScope.token = sessionValidated != undefined ? sessionValidated.token : null;
    }

    
    socket.on("update", function (msg) {
      if (ready) {
        $('.chat').append('<li class="info">' + msg + '</li>')
      }
    });

    socket.on("chat", function (client, msg) {
      if (ready) {
        var time = new Date();

        $scope.client = client;

        console.log($scope.client);

        $scope.time = time.getHours() + ':' + time.getMinutes();
        $scope.messageClient = msg;

        $scope.contacts = $scope.client;
        $scope.contactMessage = $scope.messageClient;

        $('.msg_history').append(`
        <div class="outgoing_msg">
            <div class="sent_msg">
                <p>${$scope.client } diz:  ${$scope.messageClient}</p>
                <span class="time_date"> ${$scope.time}</span>
            </div>
        </div>
        `);
      }
    });

    $scope.sendMessage = function () {

      var text = $scope.message;
      var time = new Date();
      $scope.time = time.getHours() + ':' + time.getMinutes();


      $('.msg_history').append(`
      <div class="incoming_msg">
      <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
      <div class="received_msg">
          <div class="received_withd_msg">
              <p>${$scope.message}</p>
              <span class="time_date"> ${$scope.time}</span>
          </div>
      </div>
    </div>
      `);
      socket.emit("send", text);

      $scope.message = '';
    }

    $scope.login();


  },
]);