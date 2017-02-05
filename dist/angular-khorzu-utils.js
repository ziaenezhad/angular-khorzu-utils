/**
 * angular-khorzu-utils
 *
 * Some things in Typescript which helps rapidly develop angular 1.x apps.
 * https://github.com/sajjad-shirazy/angular-khorzu-utils
 *
 * License: MIT
 */

angular.module('angular-khorzu-utils', [
	'ui.router',
	'ngMaterial',
	'angular-jwt',
	'angularLocalStorage'
]);
(function() {
  'use strict';

  loadingController.$inject = ["$element", "$scope"];
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
angular.module("angular-khorzu-utils").run(["$templateCache", function($templateCache) {$templateCache.put("directives/loading/@.html","<div class=\"overally\" ng-show=\"show\" layout=\"\" layout-fill=\"\" layout-align=\"center center\" aria-hidden=\"true\" style=\"\">\r\n    <div class=\"\" aria-hidden=\"true\" style=\"\">\r\n        <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"96\"></md-progress-circular>\r\n    </div>\r\n</div>\r\n<ng-transclude></ng-transclude>");}]);