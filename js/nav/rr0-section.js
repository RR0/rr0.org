angular.module('rr0.nav')
/**
 * Registers each encountered HTML5 "section" tag as an document outline entry
 */
    .directive('section', ['navigationService', function (navigationService) {
        'use strict';
        function addSec(sectionTitle, scope, elem) {
            var section = navigationService.addSection(sectionTitle, elem);
            scope.level = section.level;
            scope.sectionTitle = section.label;
            elem[0].id = section.id;
        }

        return {
            restrict: 'E',
            transclude: true,
            scope: {title: '@title'},
            link: {
                pre: function (scope, elem, attrs) {
                    var sectionTitle = attrs.title;
                    if (sectionTitle) {
                        addSec(sectionTitle, scope, elem);
                    }
                },
                post: function (scope, elem, attrs) {
                    if (!scope.title) {
                        var titleElem = angular.element(elem.children()[1]).children()[0];
                        var sectionTitle = titleElem.outerHTML;
                        angular.element(titleElem).remove();
                        addSec(sectionTitle, scope, elem);
                    }
                    navigationService.currentLevel--;
                    scope.level = navigationService.currentLevel;
                }
            },
            template: '<span ng-bind-html="sectionTitle"></span><div ng-transclude></div> '
        };
    }]);