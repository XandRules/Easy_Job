easyjob.factory('LoginModel', ['config', '$http',
    function (config, $http) {

        var LoginFactory = {};

        LoginFactory.login = function (data) {

            return $http.post(config.baseUrl+ route,data, config.defaultHeader);
        };

        return LoginFactory;
    }
]);