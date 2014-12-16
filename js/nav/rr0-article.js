angular.module('rr0.nav')
/**
 * Registers each encountered HTML5 "article" tag as an document outline entry
 */
    .directive('article', ['navigationService', function (navigationService) {
        'use strict';
        function addArt(sectionTitle, scope, elem) {
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
                        addArt(sectionTitle, scope, elem);
                    }
                },
                post: function (scope, elem, attrs) {
                    if (!scope.title) {
                        var titleElem = angular.element(elem.children()[0]).children()[0];
                        var sectionTitle = titleElem.outerHTML;
                        addArt(sectionTitle, scope, elem);
                    }
                    navigationService.currentLevel--;
                    scope.level = navigationService.currentLevel;
                }
            },
            template: '<p ng-transclude></p> '
        };
    }]);