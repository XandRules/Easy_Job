easyjob.factory('AddressModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http ,$rootScope) {
    var AddressFactory = {};

    AddressFactory.getAddressById = function(id){

      config.defaultHeaderToken.Authorization += $rootScope.token;


     return $http.get(config.baseUrl + `/address/${id}`, config.defaultHeaderToken);

    }    

    return AddressFactory;
  },
]);
