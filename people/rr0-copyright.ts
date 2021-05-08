interface CopyrightScope {
  name: string;
  defaultName: string;
}

export default peopleModule => {
  peopleModule
    .directive('copyright', ['peopleService', function (peopleService) {
      'use strict';
      return {
        restrict: 'EC',
        scope: {
          url: '@',
          defaultName: '@'
        },
        template: '<a href="{{::url}}">Copyright &copy; {{::name}}</a>',
        link: function ($scope: CopyrightScope, $element) {
          var copyright = peopleService.getCopyright();
          $scope.name = copyright ? copyright : $scope.defaultName;
        }
      };
    }]);
}
