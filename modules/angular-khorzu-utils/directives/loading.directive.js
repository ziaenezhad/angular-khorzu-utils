(function() {
  'use strict';

  angular
  .module('angular-khorzu-utils.directives')
  .directive('kLoading',  function() {
      return {
        restrict: 'A',
        replace: false,
        transclude: true,
        templateUrl: 'modules/angular-khorzu-utils/directives/loading.tpl.html',
        controller: loadingController,
        scope: {
          show: '=kLoading'
        }
      };
  });
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