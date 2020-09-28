easyjob.factory('AnnouncementModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http,$rootScope) {

    let token = $rootScope.token;

    // axios.interceptors.request.use(
    //   config =>{
    //     config.headers.authorization = token;
    //     return config;
    //   },
    //   error =>{
    //     return Promisse.reject(error);
    //   }
    // );
    var AnnoucementFactory = {};

    AnnoucementFactory.createAnnoucement = function (data) {
      //return axios.post(config.baseUrl + '/announcement',data);

      return axios.post(config.baseUrl + `/announcement`, {
        headers: {
          'Authorization': `Bearer ${$rootScope.token}`,
          'Content-Type': 'application/json'
        }
      },data);
    };


    AnnoucementFactory.getAnnouncementsFromFreelancer = function () {
      return axios.get(config.baseUrl + `/announcements/${$rootScope.id}`,{
        headers: {
          'Authorization': `Bearer ${$rootScope.token}`,
          'Content-Type': 'application/json'
        }
      });
    };

    AnnoucementFactory.deleteAnnouncementById = function (id) {

      return axios.delete(config.baseUrl + `/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer ${$rootScope.token}`,
          'Content-Type': 'application/json'
        }
      });
    };

    return AnnoucementFactory; 
  },
]);
