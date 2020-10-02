easyjob.factory('SearchModel', [
  'config',
  '$http',
  function (config, $http) {
    var SearchFactory = {};

    SearchFactory.getEstablish = function () {
      return $http.get('mock/getmenuvalues.json', config.defaultHeader);
    };

    SearchFactory.buscarCidades = function () {
      return $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos', config.defaultHeader);
    };

    return SearchFactory;
  },
]);