easyjob.factory('AnnouncementModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http, $rootScope) {

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
    var AnnoucementFactory = {};

    AnnoucementFactory.createAnnoucement = function (data) {
      return axios.post(config.baseUrl + '/announcement', data);
    };

    AnnoucementFactory.update = function (data, id) {
      return axios.put(config.baseUrl + `/announcements/${id}`, data);
    };

    AnnoucementFactory.getAnnouncementsFromFreelancer = function () {
      return axios.get(config.baseUrl + `/announcements/${$rootScope.id}`);
    };

    AnnoucementFactory.getAnnouncementsById = function (id) {
      return axios.get(config.baseUrl + `/announcements/search/${id}`);
    };

    AnnoucementFactory.deleteAnnouncementById = function (id) {
      return $http.delete(config.baseUrl + `/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer ${$rootScope.token}`,
          'Content-Type': 'application/json'
        }
      });
    };

    return AnnoucementFactory;
  },
]);