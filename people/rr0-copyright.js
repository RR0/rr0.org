angular.module('rr0.people')
    .directive('copyright', ['peopleService', function (peopleService) {
        'use strict';
        return {
            restrict: 'EC',
            scope: {
                url: '@',
                defaultName: '@'
            },
            template: '<a href="{{::url}}">Copyright &copy; {{::name}}</a>',
            link: function ($scope, $element) {
                var copyright = peopleService.getCopyright();
                $scope.name = copyright ? copyright : $scope.defaultName;
            }
        };
    }]);