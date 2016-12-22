(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angular-khorzu-utils.config', [])
      .value('angular-khorzu-utils.config', {
          debug: true
      });

  // Modules
  
  angular.module('angular-khorzu-utils.directives', []);
  
  
  angular.module('angular-khorzu-utils.filters', []);
  
  
  angular.module('angular-khorzu-utils.services', []);
  
  
    angular.module('angular-khorzu-utils.controllers', []);
  
  angular.module('angular-khorzu-utils',
      [
        'angular-khorzu-utils.config',
        'angular-khorzu-utils.directives',
        'angular-khorzu-utils.filters',
        'angular-khorzu-utils.services',
        'angular-khorzu-utils.controllers'
      ]);

})(angular);

(function(){
  'use strict';
  var backend = {};
  angular.module('angular-khorzu-utils').factory('backend', [
    function($rootScope, $state, $q, $timeout, $http, $mdToast, $mdDialog) {
      backend.call = function(route, method, data, errors, successMessage){
        return $http({
          method: method,
          data: data,
          url: api_url + '' + route,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': $rootScope.user ? $rootScope.user.token : null
          }
        }).success(function(){
          if(successMessage != -1){
            $timeout(function(){
              backend.toast(successMessage ? successMessage : 'درخواست شما با موفقیت انجام شد.', 'success', 2000);
            }, 500);
          }
        }).error(function (data, status, header, config){
          var message = errors ? errors[status] : null;
          if(!message){
            switch(status){
              case -1:
                message = 'متاسفانه تلاش برای اتصال به سرور موفقیت آمیز نبود !'
                break;
              case 422:
                message = 'لطفا اطلاعات درخواست شده را به صورت صحیح وارد کنید.';
                break;
              case 401:
                message = 'دسترسی شما به این قسمت مورد تایید نمی باشد.';
                _this.logout();
                break;
              case 500:
                message = 'متاسفانه سرور دچار اشکال شده !';
                break;
              default:
                message = 'خطای ' + status;
                break;
            }
          }
          console.error(message);
          backend.toast(message, 'error');
        });
      };
      backend.toast = function(message, css_class, delay){
        delay = delay ? delay : 5000;
        $mdToast.show(
          $mdToast.simple()
          .textContent(message)
          .position('top left')
          .hideDelay(delay)
        );      
      }
      // Public API
      return backend;
    }
  ]);
})();