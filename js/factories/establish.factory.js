easyjob.factory('EstablishModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http, $rootScope) {

    let token = $rootScope.token;

    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = token;
        return config;
      },
      (error) => {
        return Promisse.reject(error);
      }
    );

    var EstablishFactory = {};

    EstablishFactory.getEstablish = function (id) {
      return axios.get(config.baseUrl + `/establishments/${id}`);
    };

    EstablishFactory.updateStablish = function (data, id) {
      return axios.put(config.baseUrl + `/establishments/${id}`,data);
    };

    EstablishFactory.checkPassword = function (data, id) {
      return axios.post(config.baseUrl + `/establishments/password/${id}`,data);
    };

    return EstablishFactory;
  },
]);
