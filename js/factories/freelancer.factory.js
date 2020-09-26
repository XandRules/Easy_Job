easyjob.factory('FreelancerModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http ,$rootScope) {
    var FreelancerFactory = {};

    FreelancerFactory.getFreelancerById = function(id){

      config.defaultHeaderToken.Authorization += $rootScope.token;


     return $http.get(config.baseUrl + `/freelancers/${id}`, config.defaultHeaderToken);

    }    

    return FreelancerFactory;
  },
]);
