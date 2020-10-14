easyjob.factory('JobModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http, $rootScope) {
    var JobFactory = {};

    let token = $rootScope.token;
    axios.interceptors.request.use(
      config => {
        config.headers.authorization = token;
        return config;
      },
      error => {
        return Promisse.reject(error);
      }
    );

    JobFactory.getAnnouncementsFromFreelancer = function (id) {
      return axios.get(config.baseUrl + `/announcements/search/${id}`);
    };

    return JobFactory;
  },
]);