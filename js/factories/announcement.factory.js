easyjob.factory('AnnouncementModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http,$rootScope) {

    let token = $rootScope.token;

    axios.interceptors.request.use(
      config =>{
        config.headers.authorization = token;
        return config;
      },
      error =>{
        return Promisse.reject(error);
      }
    );

    var AnnoucementFactory = {};

    AnnoucementFactory.createAnnoucement = function (data) {
      return axios.post(config.baseUrl + '/announcement',data);
    };

    return AnnoucementFactory;
  },
]);
