easyjob.factory('FreelancerModel', ['config', '$http',
    function (config, $http) {

        var MainFactory = {};

        MainFactory.getMainMenu = function () {

            return $http.get('mock/getmenuvalues.json', config.defaultHeader);
        };       

        return MainFactory;
    }
]);