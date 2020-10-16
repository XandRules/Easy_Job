easyjob.factory('SearchModel', [
  'config',
  '$http',
  '$rootScope',
  function (config, $http, $rootScope) {
    var SearchFactory = {};

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

    SearchFactory.getEstablish = function () {
      return $http.get('mock/getmenuvalues.json', config.defaultHeader);
    };

    SearchFactory.buscarCidades = function () {
      return $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos', config.defaultHeader);
    };

    SearchFactory.getAllAnnouncements = function () {
      return axios.get(config.baseUrl + '/announcements');
    };

    SearchFactory.fetchNotificationChat = function(id){
      return axios.get(config.baseUrl + '/chat/index');
    }

    SearchFactory.fetchNotificationJob = function(id){
      return axios.get(config.baseUrl + '/job/index');
    }

    return SearchFactory;
  },
]);