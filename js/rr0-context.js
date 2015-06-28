angular.module('rr0.context')
.directive('context', function() {
    'use strict';
    return {
      restrict: 'EAC',
      scope: {
        time: '@?',
        place: '@?'
      },
      link: function(scope, elem, attrs) {

      }
    };
  });