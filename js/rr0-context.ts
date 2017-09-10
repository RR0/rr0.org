const angular = require('angular');

export default contextModule => {
  var contextModule = angular.module('rr0.context', []);
  contextModule
    .directive('context', function () {
      'use strict';
      return {
        restrict: 'EAC',
        scope: {
          time: '@?',
          place: '@?'
        },
        link: function (scope, elem, attrs) {

        }
      };
    });
}