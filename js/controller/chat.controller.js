easyjob.controller('ChatController', [
  '$scope',
  function ($scope) {
    console.log('Chat');
    $scope.message;

    var ready = false;
    
    $scope.contacts = 'Pedro';
    $scope.contactMessage = 'ola tudo bem com vc?';
    
    $scope.name;
    
    var time = new Date();
    
    ready = true;

    var socket = io.connect("https://easyjob-app.herokuapp.com");    
    socket.emit("join", 'Alexandre');
    
    socket.on("update", function (msg) {
      if (ready) {
        $('.chat').append('<li class="info">' + msg + '</li>')
      }
    });

    socket.on("chat", function (client, msg) {
      if (ready) {
        var time = new Date();
        $scope.client = client;
        $scope.time = time.getHours() + ':' + time.getMinutes();
        $scope.messageClient = msg;

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


  },
]);