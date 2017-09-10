export default navModule => {
  navModule.directive('rr0Head', function () {
    'use strict';
    return {
      restrict: 'EA',
      templateUrl: '/js/head/rr0-head.html',
      transclude: true,
      replace: true,
      controller: function ($scope) {
        window.console.log('head');
      }
    };
  });
}