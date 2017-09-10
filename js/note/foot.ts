const angular = require('angular');

import social from "../social/social";

/*
 * Foot notes and sources references
 */

function footsources() {
}

function footnotes() {
}

export default footModule => {
  angular.module('rr0.foot', ['rr0.social']);
  social(footModule);
  return footModule
    .run(function () {
      'use strict';
      document.getElementsByTagName("footer")[0].innerHTML += "";
    })
    .service('footService', [function () {
      'use strict';
      this.notesCount = 0;
      this.sourcesCount = 0;
    }])
    .directive('note', ['footService', function (footService) {
      'use strict';
      return {
        restrict: 'C',
        scope: true,
        transclude: true,
        template: '<a href="#" title="Cliquez pour voir/cacher la note" data-ng-click="visible=!visible"> {{anchor}} </a>' +
        '<span data-ng-cloak data-ng-show="visible">&nbsp;– <span data-ng-transclude></span>' +
        '</span>',
        link: function (scope, elem, attrs) {
          var footCount = ++footService.notesCount;
          scope.anchor = String.fromCharCode(96 + footCount);
          scope.visible = false;
          elem[0].style.display = 'inline';
        }
      };
    }])
    .directive('source', ['footService', function (footService) {
      'use strict';
      return {
        restrict: 'C',
        scope: true,
        transclude: true,
        template: '<a href="#" title="Cliquez pour voir/cacher la source" data-ng-click="visible=!visible"> {{anchor}} </a>' +
        '<span data-ng-cloak data-ng-show="visible">&nbsp;– <span data-ng-transclude></span>' +
        '</span>',
        link: function (scope, elem, attrs) {
          var footCount = ++footService.sourcesCount;
          scope.anchor = '' + footCount;
          scope.visible = getComputedStyle(elem[0]).display !== 'none';
          elem[0].style.display = 'inline';
        }
      };
    }])
    .controller('FootCtrl', ['$scope', function ($scope) {
      'use strict';
      $scope.isFramed = function () {
        return window !== top;
      };
    }]);
}