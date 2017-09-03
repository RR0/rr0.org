angular.module('rr0.nav')
/**
 * Adds "target=_blank" to external links so they will be opened in separate tabs
 */
  .directive('a', ['host', function (host) {
    'use strict';
    return {
      restrict: 'E',
      link: function (scope, elem, attrs) {
        const e: any = elem[0];
        if (e.hostname && e.hostname.indexOf('.') > 0 && e.hostname !== host) {
          e.target = '_blank';
        }
      }
    };
  }]);