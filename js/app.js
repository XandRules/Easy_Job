var easyjob = angular
    .module('easyjob', [
        'ui.router',
        'ngStorage'
    ]);

easyjob.run(
    ['$rootScope', '$state', '$localStorage', '$sessionStorage', function ($rootScope, $state, $localStorage, $sessionStorage) {

        $rootScope.local = $localStorage;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            $rootScope.sessionValidated = sessionStorage.getItem('sessionValidated');

            $rootScope.loggedUser = $localStorage.user;

            $rootScope.pageSelect = toState.name;

            if ($rootScope.sessionValidated) {
                if (toState.name === 'login') {

                    if ($rootScope.loggedUser) {
                        event.preventDefault();
                        if (fromState.name === '') { //se usuario tentar acessar o site diretamente pela a pagina de login, redireciona para sales
                            $state.go('sales');
                        }
                    }
                    return;
                } else {
                    if (!$rootScope.loggedUser) {
                        $state.go('login');
                    }
                }
            }else{
                $state.go('login');
            }
        });
    }]);

easyjob.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .state('selectprofile', {
            url: '/selectprofile',
            templateUrl: 'views/selectProfile.html',
            controller: 'MainController'
        })
        .state('signfreelancer', {
            url: '/freelancer/personal',
            templateUrl: 'views/signFreelancer.html',
            controller: 'MainController'
        })
        .state('signfreelancer2', {
            url: '/freelancer/endereco',
            templateUrl: 'views/signFreelancer2.html',
            controller: 'MainController'
        })
        .state('signfreelancer3', {
            url: '/freelancer/confirmacao',
            templateUrl: 'views/signFreelancer3.html',
            controller: 'MainController'
        })
        .state('signestablish', {
            url: '/establish/personal',
            templateUrl: 'views/signEstablish.html',
            controller: 'MainController'
        })
        .state('signestablish2', {
            url: '/establish/endereco',
            templateUrl: 'views/signEstablish2.html',
            controller: 'MainController'
        })
        .state('signestablish3', {
            url: '/establish/confirmacao',
            templateUrl: 'views/signEstablish3.html',
            controller: 'MainController'
        })
        .state('salesfreelancer', {
            url: '/sales/freelancer',
            templateUrl: 'views/salesfreelancer.html',
            controller: 'FreelancerController'
        })
        .state('salesestablish', {
            url: '/sales/establish',
            templateUrl: 'views/salesestablish.html',
            controller: 'EstablishController'
        });


});

easyjob.constant('config', {
    baseUrl: "http://localhost:3333",

    defaultDownloadUrl: 'main/download/',
    importUploadUrl: 'parameters/import/upload',
    outUpdateUrlPort: 9000,
    outUpdateUrl: "http://" + location.hostname + ":",
    webBridgeMaxCount: 4999,

    defaultHeader: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
        'Is-Ajax': 'true'
    },
    updateHeader: {
        'Content-Type': 'application/json',
        'Is-Ajax': 'true'
    },
    defaultHeaderNotify: {
        'Content-Type': 'application/json',
        'Is-Ajax': 'true',
        'notify': 'true'
    }
    
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
    HTTPVersionNotSupported: 505
});