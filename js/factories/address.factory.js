easyjob.factory('AddressModel', [
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

    var AddressFactory = {};

    AddressFactory.getAddressFromFreelancer = function(id){

     config.defaultHeaderToken.Authorization = 'Bearer ' + $rootScope.token;

     return axios.get(config.baseUrl + `/address/${id}`);

    }    

    return AddressFactory;
  },
]);
