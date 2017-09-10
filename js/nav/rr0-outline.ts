import * as angular from "angular";

interface SectionScope extends ng.IScope {
  level: number;
  title: string;
}

export default navModule => {
  navModule
    .service('outlineService', [
      '$rootScope', '$q',
      'commonsService',
      function ($rootScope, $q,
                commonsService) {
        "use strict";

        const sections = [];

        return {
          addSection: function (s, elem) {
            let l;
            let outlineL;
            const hPos = s.indexOf('<h');
            if (hPos < 0) {
              l = '<h1>' + s + '</h1>';
              const tag = 'h' + (this.currentLevel) + '>';
              outlineL = '<' + tag + s + '</' + tag;
            } else {
              l = s;
              outlineL = l;
              const hPosEnd = s.indexOf('>', hPos + 1);
              const h2Pos = s.indexOf('</h', hPosEnd + 1);
              s = s.substring(hPosEnd + 1, h2Pos);
            }
            this.currentLevel++;
            let levelSections = sections[this.currentLevel];
            const typ: string = typeof levelSections;
            if (typ !== 'array') {
              levelSections = sections;
            }
            levelSections.push(l);

            const idLink = commonsService.validLink(s);
            const sectionId = commonsService.camelize(idLink, this.currentLevel);
            const section = {
              label: l,
              outlineLabel: outlineL,
              id: sectionId,
              level: this.currentLevel,
              elem: elem
            };
            $rootScope.$broadcast('sectionAdded', section);
            return section;
          }
        };
      }])
    /**
     * Registers each encountered HTML5 "section" tag as an document outline entry
     */
    .directive('section', ['outlineService', function (outlineService) {
      'use strict';

      function addSec(sectionTitle, scope, elem) {
        const section = outlineService.addSection(sectionTitle, elem);
        scope.level = section.level;
        scope.sectionTitle = section.label;
        elem[0].id = section.id;
      }

      return {
        restrict: 'E',
        transclude: true,
        scope: {title: '@'},
        link: {
          pre: function (scope: SectionScope, elem, attrs) {
            const sectionTitle = attrs.title;
            if (sectionTitle) {
              addSec(sectionTitle, scope, elem);
            }
          },
          post: function (scope: SectionScope, elem, attrs) {
            if (!scope.title) {
              const titleElem = angular.element(elem.children()[1]).children()[0];
              const sectionTitle = titleElem.outerHTML;
              angular.element(titleElem).remove();
              addSec(sectionTitle, scope, elem);
            }
            outlineService.currentLevel--;
            scope.level = outlineService.currentLevel;
          }
        },
        template: '<span ng-bind-html="sectionTitle"></span><div ng-transclude></div> '
      };
    }])
    /**
     * Registers each encountered HTML5 "article" tag as an document outline entry
     */
    .directive('article', ['outlineService', function (outlineService) {
      'use strict';

      function addArt(sectionTitle, scope, elem) {
        const section = outlineService.addSection(sectionTitle, elem);
        scope.level = section.level;
        scope.sectionTitle = section.label;
        elem[0].id = section.id;
      }

      return {
        restrict: 'E',
        transclude: true,
        scope: {title: '@'},
        link: {
          pre: function (scope, elem, attrs) {
            const sectionTitle = attrs.title;
            if (sectionTitle) {
              addArt(sectionTitle, scope, elem);
            }
          },
          post: function (scope: SectionScope, elem, attrs) {
            if (!scope.title) {
              const titleElem = angular.element(elem.children()[0]).children()[0];
              const sectionTitle = titleElem.outerHTML;
              addArt(sectionTitle, scope, elem);
            }
            outlineService.currentLevel--;
            scope.level = outlineService.currentLevel;
          }
        },
        template: '<p ng-transclude></p> '
      };
    }]);
}