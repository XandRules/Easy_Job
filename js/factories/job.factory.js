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

    JobFactory.getAnnouncementsById = function (id) {
      return axios.get(config.baseUrl + `/announcements/search/${id}`);
    };

    JobFactory.createJob = function (job) {
      return axios.post(config.baseUrl + `/jobs`, job);
    };

    JobFactory.getAnnouncementsFromFreelancer = function (anuncio_id) {
      return axios.get(config.baseUrl + `/announcements/${anuncio_id}`);
    };

    JobFactory.createChat = function(data){
      return axios.post(config.baseUrl + '/newchat', data);
    } 

    JobFactory.createNotificationFreelancer = function(data){
      return axios.post(config.baseUrl + '/create/chat',data);
    }

    JobFactory.sendNotificationJob = function(data){
      return axios.post(config.baseUrl + '/initialjob', data);
    }

    JobFactory.refuseById = function(id, data){
      return axios.put(config.baseUrl + `/initialjob/${id}`,data);
    }

    JobFactory.deleteById = function(id, data){
      return axios.delete(config.baseUrl + `/initialjob/${id}`);
    }

    JobFactory.rateUser = function(id, data){
      return axios.put(config.baseUrl + `/jobs/${id}`, data);
    }
    return JobFactory;
  },
]);