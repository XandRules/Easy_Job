easyjob.factory('FreelancerModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http ,$rootScope) {
    var FreelancerFactory = {};

    FreelancerFactory.getFreelancerById = function(id){

      let token = 'Bearer ' + $rootScope.token;

      axios.interceptors.request.use(
        config =>{
          config.headers.authorization = token;
          return config;
        },
        error =>{
          return Promisse.reject(error);
        }
      )



     return axios.get(config.baseUrl + `/freelancers/${id}`);

    }    

    return FreelancerFactory;
  },
]);
