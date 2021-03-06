easyjob.factory('FreelancerModel', [
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

    var FreelancerFactory = {};

    FreelancerFactory.getFreelancerById = function (id) {
      return axios.get(config.baseUrl + `/freelancers/${id}`);
    };

    FreelancerFactory.updateFreelancer = function (data, id) {
      return axios.put(config.baseUrl + `/freelancers/${id}`, data);
    };

    FreelancerFactory.checkPassword = function (data, id) {
      return axios.post(config.baseUrl + `/freelancers/password/${id}`, data);
    };    

    return FreelancerFactory;
  },
]);
