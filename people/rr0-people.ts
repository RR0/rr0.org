import {org} from "../js/common"
import people from "./people.old"

interface PeopleScope extends ng.IScope {
  id: string;
  href: string;
  people: {
    name: string;
  };
}

export default peopleModule => {
  peopleModule
    .directive('people', ['peopleService', function (peopleService) {
      'use strict';
      return {
        restrict: 'C',
        transclude: true,
        scope: true,
        template: "<a href='{{::href}}' translate='no' ng-transclude></a>",
        link: function (scope: PeopleScope, elem, attrs) {
          scope.id = 'people' + scope.id;
          var txt = org.text(elem[0]);
          var nameKey = attrs.title;    // Alternate (correct for link) name?
          var peopleName = txt;
          if (peopleName.length <= 0) {
            peopleName = nameKey;
            elem.val(peopleName);
          }
          scope.href = peopleService.peopleLink(nameKey ? nameKey : peopleName);
        }
      };
    }])
    .directive('people', ['peopleService', function (peopleService) {
      'use strict';
      return {
        restrict: 'A',
        scope: {
          people: '='
        },
        template: "<a href='{{::href}}' translate='no'>{{::people.name}}</a>",
        link: function (scope: PeopleScope, elem, attrs) {
          scope.id = 'people' + scope.id;
          var txt = scope.people.name;
          var nameKey = attrs.title;    // Alternate (correct for link) name?
          var peopleName = txt;
          if (peopleName.length <= 0) {
            peopleName = nameKey;
            elem.val(peopleName);
          }
          scope.href = peopleService.peopleLink(nameKey ? nameKey : peopleName);
        }
      };
    }]);
}
