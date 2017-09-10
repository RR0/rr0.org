const angular = require('angular');

import nav from "./nav";

export interface TitleScope extends ng.IScope {
  title: string;
  author: string;
  copyright: string;
  setTitle(text): void;
}

angular.module(nav)
/**
 * Sets controller's title to be displayed from the title header tag.
 */
  .directive('title', [function () {
    'use strict';
    return {
      restrict: 'E',
      /**
       *
       * @param scope inherited scope
       * @param elem
       * @param attrs
       */
      link: function (scope: TitleScope, elem, attrs) {
        if (elem.text().indexOf('{{') < 0) {
          scope.setTitle(elem.text());
        }
      }
    };
  }]);