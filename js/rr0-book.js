angular.module('rr0.commons')
  .directive('book', function ($http) {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        /**
         * List of IDs to request the information. The API supports ISBNs, LCCNs, OCLC numbers and OLIDs (Open Library IDs).
         */
        bibkeys: '@'
      },
      replace: true,
      templateUrl: '/js/rr0-book.html',
      link: function (scope, elem, attrs) {
        $http.jsonp('https://openlibrary.org/api/books?callback=JSON_CALLBACK&bibkeys=' + scope.bibkeys + '&jscmd=data')
          .success(function (data) {
            var books = angular.fromJson(data);
            for (var bookId in books) {
              if (books.hasOwnProperty(bookId)) {
                var book = books[bookId];
                scope.title = book.title;
                scope.authors = [];
                for (var i = 0; i < book.authors.length; ++i) {
                  var author = book.authors[i];
                  scope.authors.push(author);
                }
                scope.publishDate = book.publish_date;
                scope.publisher = book.publishers[0].name;
                scope.publishPlace = book.publish_places[0].name;
              }
            }
          });
      }
    };
  });