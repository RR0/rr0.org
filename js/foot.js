/*
 * Foot notes and sources references
 */

/*
 var elements = document.body.getElementsByTagName("*");
 for (i = 0; i < elements.length; i++) {
 for (var h = 0; h < arguments.length; h++) {
 if (arguments[h](elements[i])) break;
 }
 }
 }
 */

function footsources() {
}
function footnotes() {
}
org.onContentsLoaded(footnotes);
angular.module('rr0.foot', [])
    .run(function () {
        document.getElementsByTagName("footer").innerHtml += "";
    })
    .service('footService', [function () {
        this.notesCount = 0;
        this.sourcesCount = 0;
    }])
    .directive('note', ['footService', function (footService) {
        return {
            restrict: 'C',
            scope: true,
            transclude: true,
            template: '<a href="#" title="Cliquez pour voir/cacher" ng-click="visible=!visible"> {{anchor}} </a><span ng-show="visible">– <span ng-transclude></span></span>',
            link: function (scope, elem, attrs) {
                var footCount = ++footService.notesCount;
                scope.anchor = String.fromCharCode(96 + footCount);
                scope.visible = false;
            }
        };
    }]).directive('source', ['footService', function (footService) {
        return {
            restrict: 'C',
            scope: true,
            transclude: true,
            template: '<a href="#" title="Cliquez pour voir/cacher" ng-click="visible=!visible"> {{anchor}} </a><span ng-show="visible">– <span ng-transclude></span></span>',
            link: function (scope, elem, attrs) {
                var footCount = ++footService.sourcesCount;
                scope.anchor = '' + footCount;
                scope.visible = false;
            }
        };
    }])
    .controller('FootCtrl', ['$scope', function ($scope) {
        $scope.isFramed = function () {
            return window !== top;
        };
    }])
;