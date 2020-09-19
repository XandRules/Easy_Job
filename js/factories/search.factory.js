easyjob.factory('SearchModel', [
  'config',
  '$http',
  function (config, $http) {
    var SearchFactory = {};

    SearchFactory.getEstablish = function () {
      return $http.get('mock/getmenuvalues.json', config.defaultHeader);
    };

    return SearchFactory;
  },
]);
