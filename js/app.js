var easyjob = angular.module('easyjob', ['ui.router', 'ngStorage']);

easyjob.run(
  ['$rootScope', '$state', '$localStorage', '$sessionStorage', function ($rootScope, $state, $localStorage, $sessionStorage) {

    $rootScope.local = $localStorage;

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      $rootScope.sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

      $rootScope.token = 'Bearer ';

      if ($rootScope.sessionValidated) {
        $rootScope.token = $rootScope.token + $rootScope.sessionValidated.token;
      }

      if($rootScope.sessionValidated.freelancer){
        $rootScope.loggedUser = $rootScope.sessionValidated.freelancer;
      }else if($rootScope.sessionValidated.establishment){
        $rootScope.loggedUser = $rootScope.sessionValidated.establishment;
      }

      $rootScope.pageSelect = toState.name;

      if ($rootScope.sessionValidated) {
        if (toState.name === 'loginfreelancer' || toState.name === "home") {

          if ($rootScope.loggedUser) {
            event.preventDefault();
            if (fromState.name === '') { //se usuario tentar acessar o site diretamente pela a pagina de login, redireciona para home
              $state.go('salesfreelancer');
              // location.href = "#!alarms/current";
            }
          }
          return;
        }
        if (toState.name === 'loginestablish' || toState.name === "home") {

          if ($rootScope.loggedUser) {
            event.preventDefault();
            if (fromState.name === '') { //se usuario tentar acessar o site diretamente pela a pagina de login, redireciona para home
              $state.go('salesestablish');
              // location.href = "#!alarms/current";
            }
          }
          return;
        }
      }
    });
  }]);


easyjob.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'MainController',
    })
    /*===================================================
     **********************FREELANCER*********************
     *===================================================*/
    .state('loginfreelancer', {
      url: '/login/freelancer',
      templateUrl: 'views/freelancer/loginfreelancer.html',
      controller: 'LoginController',
    })
    .state('freelancerannouncement', {
      url: '/freelancer/announcement',
      templateUrl: 'views/freelancer/freelancerAnnouncements.html',
      controller: 'AnnouncementController',
    })
    .state('freelancerannouncementedit', {
      url: '/freelancer/announcement/edit',
      templateUrl: 'views/freelancer/editFreelancerAnnouncements.html',
      controller: 'AnnouncementController',
    })
    .state('freelanceractivate', {
      url: '/freelancer/activate',
      templateUrl: 'views/freelancer/freelancerActivate.html',
      controller: 'FreelancerController',
    }).state('signfreelancer', {
      url: '/freelancer/personal',
      templateUrl: 'views/freelancer/signFreelancer.html',
      controller: 'MainController',
    })
    .state('signfreelancer2', {
      url: '/freelancer/endereco',
      templateUrl: 'views/freelancer/signFreelancer2.html',
      controller: 'MainController',
    })
    .state('signfreelancer3', {
      url: '/freelancer/confirmacao',
      templateUrl: 'views/freelancer/signFreelancer3.html',
      controller: 'MainController',
    })
    .state('salesfreelancer', {
      url: '/sales/freelancer',
      templateUrl: 'views/freelancer/salesfreelancer.html',
      controller: 'FreelancerController',
    })
    .state('announcementfreelancer', {
      url: '/announcement/freelancer',
      templateUrl: 'views/freelancer/announcementFreelancer.html',
      controller: 'AnnouncementController',
    })
    .state('profilefreelancer', {
      url: '/profile/freelancer',
      templateUrl: 'views/freelancer/profileFreelancer.html',
      controller: 'FreelancerController',
    })
    /*===================================================
     ******************END FREELANCER*********************
     *===================================================*/

    /*===================================================
     **********************ESTABLISH*********************
     *===================================================*/
    .state('loginestablish', {
      url: '/login/establish',
      templateUrl: 'views/establish/loginEstablish.html',
      controller: 'LoginController',
    })
    .state('signestablish', {
      url: '/establish/personal',
      templateUrl: 'views/establish/signEstablish.html',
      controller: 'MainController',
    })
    .state('signestablish2', {
      url: '/establish/endereco',
      templateUrl: 'views/establish/signEstablish2.html',
      controller: 'MainController',
    })
    .state('signestablish3', {
      url: '/establish/confirmacao',
      templateUrl: 'views/establish/signEstablish3.html',
      controller: 'MainController',
    })
    .state('salesestablish', {
      url: '/sales/establish',
      templateUrl: 'views/establish/salesestablish.html',
      controller: 'EstablishController',
    })
    .state('profileestablish', {
      url: '/profile/establish',
      templateUrl: 'views/establish/profileEstablish.html',
      controller: 'EstablishController',
    })
    .state('searchfreelancer', {
      url: '/search/freelancer',
      templateUrl: 'views/establish/searchFreelancer.html',
      controller: 'SearchController',
    })

    /*===================================================
     ******************END ESTABLISH*********************
     *===================================================*/
    .state('selectprofile', {
      url: '/selectprofile',
      templateUrl: 'views/general/selectProfile.html',
      controller: 'SelectController',
    })
    .state('selectprofilelogin', {
      url: '/profilelogin',
      templateUrl: 'views/general/selectProfileLogin.html',
      controller: 'SelectController',
    })
    .state('chat', {
      url: '/chat',
      templateUrl: 'views/general/chat.html',
      controller: 'ChatController',
    });


});

easyjob.constant('config', {
  // baseUrl: 'http://localhost:3333',

  baseUrl: 'https://easyjob-app.herokuapp.com',

  defaultHeader: {
    'Access-Control-Allow-Origin': true,
    'Content-Type': 'application/json',
    'Is-Ajax': 'true',
  },
  updateHeader: {
    'Content-Type': 'application/json',
    'Is-Ajax': 'true',
  },
  defaultHeaderToken: {
    'Access-Control-Allow-Origin': true,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': '',
    'Is-Ajax': 'true',

  },
  defaultHeaderNotify: {
    'Content-Type': 'application/json',
    'Is-Ajax': 'true',
    notify: 'true',
  },
});

easyjob.constant('HTTP_STATUS_CODES', {
  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  TemporaryRedirect: 307,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  RequestEntityTooLarg: 413,
  RequestURITooLong: 414,
  UnsupportedMediaType: 415,
  RequestedRangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
});