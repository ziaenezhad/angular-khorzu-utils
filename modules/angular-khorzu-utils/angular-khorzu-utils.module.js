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
  
  angular.module('angular-khorzu-utils.directives', [
    'ngMaterial'
  ]);
  
  
  angular.module('angular-khorzu-utils.filters', []);
  
  
  angular.module('angular-khorzu-utils.services', [
    'angularLocalStorage',
    'ngMaterial',
    'angular-jwt'
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
