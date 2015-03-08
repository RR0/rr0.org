angular.module('rr0.nav')
    .service('searchService', ['$rootScope', '$http', function ($rootScope, $http) {
        "use strict";
        return {
            search: function (toSearch) {
                $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=" + toSearch)
                    .success(function (data, status, headers, config) {
                        $rootScope.$emit('searchResult', data);
                    });
            }
        };
    }])
    .directive('search', ['hiddenPos', '$log', function () {
        'use strict';
        return {
            restrict: 'C',
            templateUrl: '/js/search/search.tmpl.html',
            controller: ['$scope', '$element', '$attrs', '$transclude', '$timeout', 'searchService', '$log', '$rootScope', function ($scope, $element, $attrs, $transclude, $timeout, searchService, $log, $rootScope) {
                $scope.searchInput = '';
                $scope.doSearch = function () {
                    searchService.search($scope.searchInput);
                };
                var searchListener = function (event, data) {
                    // $scope.searchResults = [];
                    if (data.searchInformation.totalResults > 0) {
                        $scope.searchResults = data.items;
                    } else {
                        $log.info("No results for '" + $scope.searchInput + "'");
                    }
                };
                $rootScope.$on('searchResult', searchListener);
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