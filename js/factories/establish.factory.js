easyjob.factory('EstablishModel', ['config', '$http',
    function (config, $http) {

        var EstablishFactory = {};

        EstablishFactory.getEstablish = function () {

            return $http.get('mock/getmenuvalues.json', config.defaultHeader);
        };

        return EstablishFactory;
    }
]);