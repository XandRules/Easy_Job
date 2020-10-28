easyjob.factory('LoginModel', ['config', '$http',
    function (config, $http) {

        var LoginFactory = {};

        LoginFactory.login = function (data,route) {

            return $http.post(config.baseUrl+ route,data, config.defaultHeader);
        };

        LoginFactory.verifyEmail = function (data,route) {

            return $http.post(config.baseUrl+ route,data, config.defaultHeader);
        };

        return LoginFactory;
    }
]);