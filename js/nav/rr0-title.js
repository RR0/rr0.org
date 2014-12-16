angular.module('rr0.nav')
/**
 * Sets controller's title to be displayed from the title header tag.
 */
    .directive('title', [function () {
        'use strict';
        return {
            restrict: 'E',
            /**
             *
             * @param scope inherited scope
             * @param elem
             * @param attrs
             */
            link: function (scope, elem, attrs) {
                scope.title = elem.text();
            }
        };
    }]);