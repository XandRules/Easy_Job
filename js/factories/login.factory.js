easyjob.factory('LoginModel', ['config', '$http',
    function (config, $http) {

        var LoginFactory = {};

        LoginFactory.login = function (data) {

            return $http.post(config.baseUrl+'/sessionsfreelancer',data, config.defaultHeader);
        };

        return LoginFactory;
    }
]);