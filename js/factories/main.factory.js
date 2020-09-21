easyjob.factory('MainModel', [
  'config',
  '$http',
  function (config, $http) {
    var MainFactory = {};

    MainFactory.getSpecilities = function () {
      return $http.get(config.baseUrl + '/specialities', config.defaultHeader);
    };

    MainFactory.getCep = function (url) {
      return $http.get(url, config.defaultHeader);
    };

    MainFactory.findUFs = function () {
      return $http.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        config.defaultHeader
      );
    };

    MainFactory.createFreelancer = function(data){
      return $http.post(config.baseUrl + '/freelancers',data, config.defaultHeader);
    }

    MainFactory.saveAddress = function(data){
      return $http.post(config.baseUrl + '/address',data, config.defaultHeader);
    }

    return MainFactory;
  },
]);
