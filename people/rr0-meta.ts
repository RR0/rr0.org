import angular = require("angular")

export interface MetaScope extends ng.IScope {
  titleUrl: string;
}

angular.module('rr0.people')
  .directive('meta', ['peopleService', function (peopleService) {
    'use strict';
    return {
      restrict: 'E',
      link: function (scope: MetaScope, elem, attrs) {
        var name = attrs.name;
        var content = attrs.content;
        var urlPos = content.indexOf(';url=');
        var link = urlPos > 0 ? content.substring(urlPos) : undefined;
        switch (name) {
          case 'url':
            scope.titleUrl = content;
            break;
          case 'authors?':
            peopleService.setAuthor(content, link);
            break;
          case 'copyright?':
            peopleService.setCopyright(content, link);
            break;
        }
      }
    };
  }]);
