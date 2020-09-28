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


    AnnoucementFactory.getAnnouncementsFromFreelancer = function () {
      return axios.get(config.baseUrl + `/announcements/${$rootScope.id}`);
    };

    AnnoucementFactory.deleteAnnouncementById = function (id) {

      return axios.delete(config.baseUrl + `/announcements/${id}`);
    };

    return AnnoucementFactory; 
  },
]);
