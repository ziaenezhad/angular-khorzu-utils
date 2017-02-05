(function() {
  'use strict';

  angular
  .module('angular-khorzu-utils')
  .directive('kLoading',  function() {
      return {
        restrict: 'A',
        replace: false,
        transclude: true,
        templateUrl: 'directives/loading/@.html',
        controller: loadingController,
        scope: {
          show: '=kLoading'
        }
      };
  });
  /** @ngInject */
  function loadingController($element, $scope){
  }
})();