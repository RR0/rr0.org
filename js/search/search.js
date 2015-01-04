angular.module('rr0.nav')
    .directive('search', ['hiddenPos', '$log', function (hiddenPos, $log) {
        'use strict';

        return {
            restrict: 'C',
            templateUrl: '/js/search/search.html',
            controller: ['$scope', '$element', '$attrs', '$transclude', '$http', '$timeout', function ($scope, $element, $attrs, $transclude, $http, $timeout) {
                $scope.doSearch = function () {
                    $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=" + $scope.searchInput)
                        .success(function (data, status, headers, config) {
                            $scope.searchResults = [];
                            if (data.searchInformation.totalResults > 0) {
                                $scope.searchResults = data.items;
                            } else {
                                $log.info("No results for '" + $scope.searchInput + "'");
                            }
                        });
                };
                $scope.searchInput = '';
                $scope.searchKey = function (event, item) {
                    if (event.keyCode === 40) {
                        $scope.searchClick(item);
                    }
                };
                $scope.searchClick = function (item) {
                    document.body.className += ' wait';
                    $timeout(function () {
                        window.location = item.link;
                    }, 10);
                };
            }]
        };
    }]);