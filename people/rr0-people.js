angular.module('rr0.people')
    .directive('people', ['peopleService', function (peopleService) {
        'use strict';
        return {
            restrict: 'C',
            transclude: true,
            scope: true,
            template: "<a href='{{::href}}' translate='no' ng-transclude></a>",
            link: function (scope, elem, attrs) {
                scope.id = 'people' + scope.id;
                var txt = org.text(elem[0]);
                var nameKey = attrs.title;    // Alternate (correct for link) name?
                var peopleName = txt;
                if (peopleName.length <= 0) {
                    peopleName = nameKey;
                    elem.val(peopleName);
                }
                scope.href = peopleService.peopleLink(nameKey ? nameKey : peopleName);
            }
        };
    }]);