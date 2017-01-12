(function() {
  'use strict';

  angular
  .module('angular-khorzu-utils.directives')
  .directive('kLoading',  function() {
      return {
        restrict: 'A',
        replace: false,
        transclude: true,
        templateUrl: 'angular-khorzu-utils/directives/loading.tpl.html',
        controller: loadingController,
        scope: {
          show: '=kLoading'
        }
      };
  });
  /** @ngInject */
  function loadingController($element, $scope){
    /*$scope.$watch('show',function(){
      if($scope.show){
        $element.shoW();
      }else{
        $element.hide();
      }
    }, $scope.show);*/
  }
})();