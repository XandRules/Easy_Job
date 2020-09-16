easyjob.factory('MainModel', ['config', '$http',
    function (config, $http) {

        var MainFactory = {};

        MainFactory.getMainMenu = function () {

            return $http.get('mock/getmenuvalues.json', config.defaultHeader);
        };

        MainFactory.getHeaderMenu = function () {

            return $http.post('/getheadermenuvalues', config.defaultHeader);
        };

        return MainFactory;
    }
]);