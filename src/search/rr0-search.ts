const angular = require('angular');

import nav from '../nav/nav'

angular.module(nav)
  .directive('search', function () {
    'use strict';
    return {
      restrict: 'C',
      templateUrl: '/js/search/rr0-search.html',
      controller: function ($scope, $element, $attrs, $transclude, $timeout, searchService, $log, $rootScope) {
        $scope.searchInput = '';
        $scope.doSearch = function () {
          searchService.search($scope.searchInput);
        };
        const searchListener = function (event, data) {
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
            (<any>window).location = item.link;
          }, 10);
        };
      }
    };
  });
