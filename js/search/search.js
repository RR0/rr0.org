angular.module('rr0.nav')
    .directive('search', [function () {
        function isSearchVisible() {
            return search.style.top === hiddenPos;
        }

        return {
            restrict: 'C',
            templateUrl: '/js/search/search.html',
            controller: ['$scope', '$element', '$attrs', '$transclude', '$http', '$timeout', function ($scope, $element, $attrs, $transclude, $http, $timeout) {
                function showSearch() {
                    if ($scope.getHeadingHeight) {
                        search.style.top = $scope.getHeadingHeight() + 'px';
                    }
                }

                $scope.doSearch = function () {
                    $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=" + $scope.searchInput)
                        .success(function (data, status, headers, config) {
                            $scope.searchResults = [];
                            if (data.searchInformation.totalResults > 0) {
                                $scope.searchResults = data.items;
                            } else {
                                log("No results for '" + $scope.searchInput + "'");
                            }
                            showSearch();
                        });
                };
                $scope.searchInput = '';
                $scope.searchKey = function (event, item) {
                    if (event.keyCode === 40) {
                        if (!isSearchVisible()) {
                            showSearch();
                        } else {
                            // Focus next search result
                        }
                        $scope.searchClick(item);
                    }
                };
                $scope.searchClick = function (item) {
                    document.body.className += ' wait';
                    $timeout(function () {
                        window.location = item.link;
                    }, 10);
                };
                $scope.searchOver = function () {
                    showSearch();
                };
                $scope.searchLeave = function () {
                    search.style.top = hiddenPos;
                };
            }]
        }
    }]);