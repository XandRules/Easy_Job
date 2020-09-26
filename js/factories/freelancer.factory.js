easyjob.factory('FreelancerModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http ,$rootScope) {

    let token = 'Bearer ' + $rootScope.token;

      axios.interceptors.request.use(
        config =>{
          config.headers.authorization = token;
          return config;
        },
        error =>{
          return Promisse.reject(error);
        }
      );


    var FreelancerFactory = {};

    FreelancerFactory.getFreelancerById = function(id){

     return axios.get(config.baseUrl + `/freelancers/${id}`);

    }    

    return FreelancerFactory;
  },
]);
