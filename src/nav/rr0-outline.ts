import {CommonService} from "common"
import {NavModule} from "nav/nav"

interface SectionScope {
  level: number;
  title: string;
}

export class OutlineService {
  sections = []
  currentLevel: number

  constructor(private nav: NavModule, private commonsService: CommonService) {
  }

  addSection(s, elem) {
    let l
    let outlineL
    const hPos = s.indexOf('<h')
    if (hPos < 0) {
      l = '<h1>' + s + '</h1>'
      const tag = 'h' + (this.currentLevel) + '>'
      outlineL = '<' + tag + s + '</' + tag
    } else {
      l = s
      outlineL = l
      const hPosEnd = s.indexOf('>', hPos + 1)
      const h2Pos = s.indexOf('</h', hPosEnd + 1)
      s = s.substring(hPosEnd + 1, h2Pos)
    }
    this.currentLevel++
    let levelSections = this.sections[this.currentLevel]
    const typ: string = typeof levelSections
    if (typ !== 'array') {
      levelSections = this.sections
    }
    levelSections.push(l)

    const idLink = this.commonsService.validLink(s)
    const sectionId = this.commonsService.camelize(idLink, this.currentLevel)
    const section = {
      label: l,
      outlineLabel: outlineL,
      id: sectionId,
      level: this.currentLevel,
      elem: elem
    }
    this.nav.headController.sectionAdded(section)
    return section
  }
}

export default navModule => {
  navModule
    .service('outlineService', [
      '$rootScope', '$q',
      'commonsService',
    ])
    /**
     * Registers each encountered HTML5 "section" tag as an document outline entry
     */
    .directive('section', ['outlineService', function (outlineService) {
      'use strict'

      function addSec(sectionTitle, scope, elem) {
        const section = outlineService.addSection(sectionTitle, elem)
        scope.level = section.level
        scope.sectionTitle = section.label
        elem[0].id = section.id
      }

      return {
        restrict: 'E',
        transclude: true,
        scope: {title: '@'},
        link: {
          pre: function (scope: SectionScope, elem, attrs) {
            const sectionTitle = attrs.title
            if (sectionTitle) {
              addSec(sectionTitle, scope, elem)
            }
          },
          post: function (scope: SectionScope, elem, attrs) {
            if (!scope.title) {
              const titleElem = elem.children()[1].children()[0]
              const sectionTitle = titleElem.outerHTML
              titleElem.remove()
              addSec(sectionTitle, scope, elem)
            }
            outlineService.currentLevel--
            scope.level = outlineService.currentLevel
          }
        },
        template: '<span ng-bind-html="sectionTitle"></span><div ng-transclude></div> '
      }
    }])
    /**
     * Registers each encountered HTML5 "article" tag as an document outline entry
     */
    .directive('article', ['outlineService', function (outlineService) {
      'use strict'

      function addArt(sectionTitle, scope, elem) {
        const section = outlineService.addSection(sectionTitle, elem)
        scope.level = section.level
        scope.sectionTitle = section.label
        elem[0].id = section.id
      }

      return {
        restrict: 'E',
        transclude: true,
        scope: {title: '@'},
        link: {
          pre: function (scope, elem, attrs) {
            const sectionTitle = attrs.title
            if (sectionTitle) {
              addArt(sectionTitle, scope, elem)
            }
          },
          post: function (scope: SectionScope, elem, attrs) {
            if (!scope.title) {
              const titleElem = elem.children()[0].children()[0]
              const sectionTitle = titleElem.outerHTML
              addArt(sectionTitle, scope, elem)
            }
            outlineService.currentLevel--
            scope.level = outlineService.currentLevel
          }
        },
        template: '<p ng-transclude></p> '
      }
    }])
}
