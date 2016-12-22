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
  
  
  angular.module('angular-khorzu-utils.services', [
    'angularLocalStorage',
    'ngMaterial'
  ]);

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
  var backend = {
    api_url : document.getElementById('api_url').getAttribute('value'),
    login_state : 'login'
  };

  angular
  .module('angular-khorzu-utils')
  .service('backend', function($rootScope, $state, $q, $timeout, $http, $mdToast, $mdDialog, storage) {    
    backend.call = function(route, method, data, errors, successMessage){
      return $http({
        method: method,
        data: data,
        url: backend.api_url + '' + route,
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
              backend.logout();
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

    /**
     * Authentication method
     */
    storage.bind($rootScope, 'user');
    backend.login = function (credits, response_user_item) {
      return backend.call('auth/login', 'POST', credits,{
        401: 'نام کاربری یا رمز عبور اشتباه است !'
      }, 'سلام؛ خوش آمدید !').success(function(response){
        $rootScope.user = response_user_item ? response[response_user_item] : response;
      });
    };
    backend.logout = function(){
      $rootScope.user = null;
      $state.go(backend.login_state);
      return $q.resolve();
    };

    /**
     * show a toast alert
     */
    backend.toast = function(message, css_class, delay){
      delay = delay ? delay : 5000;
      $mdToast.show({
        template: '<md-toast class="' + css_class + '"><span flex>' + message + '</span></md-toast>',
        position: 'top left',
        hideDelay: delay
      });      
    }

    /**
     * show an alert
     */
    backend.alert = function(content, title, ok){
      $mdDialog.show(
        $mdDialog.alert()
        .title(title ? title : 'اطلاع')
        .textContent(content)
        .ok(ok ? ok : 'خُب')
      );
    };    

    /**
     * get now
     
    backend.now = function(format){
      return moment().format(format ? format : 'jD jMMMM jYYYY ساعت HH:mm:ss');
    };*/

    return backend;
  });
})();