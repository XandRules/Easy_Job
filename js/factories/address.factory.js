easyjob.factory('AddressModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http ,$rootScope) {

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

    var AddressFactory = {};

    AddressFactory.getAddressFromFreelancer = function(id){
      return axios.get(config.baseUrl + `/address/freelancer/${id}`);

    }    

    AddressFactory.getAddressFromEstablish = function(id){
      return axios.get(config.baseUrl + `/address/establish/${id}`);

    }   

    AddressFactory.updateAddress = function(data, id){
      return axios.put(config.baseUrl + `/address/${id}`,data);
    }

    return AddressFactory;
  },
]);
