import * as angular from "angular";

interface BookScope extends ng.IScope {
  bibkeys: string;
  book: {};
}

export default commonsModule => {
  commonsModule
    .directive('book', ['$http', function ($http) {
      'use strict';
      return {
        restrict: 'EA',
        scope: {
          bibkeys: '@'  // List of IDs to request the information. The API supports ISBNs, LCCNs, OCLC numbers and OLIDs (Open Library IDs).
        },
        templateUrl: '/js/note/cite/book/rr0-book.html',
        link: function (scope: BookScope) {
          $http.jsonp('https://openlibrary.org/api/books?callback=JSON_CALLBACK&bibkeys=' + scope.bibkeys + '&jscmd=data')
            .success(function (data) {
              var books = angular.fromJson(data);
              for (var bookId in books) {
                if (books.hasOwnProperty(bookId)) {
                  scope.book = books[bookId];
                }
              }
            });
        }
      };
    }]);
}