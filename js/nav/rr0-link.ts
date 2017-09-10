export default navModule => {
  navModule
  /**
   * Sets navigation menu items from relationship links meta tags.
   */
    .directive('link', ['navigationService', function (navigationService) {
      'use strict';
      return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
          var rel = attrs.rel;
          if (rel) {
            rel = rel.toLowerCase();
          }
          var text = attrs.title;

          var link = attrs.href;
          switch (rel) {
            case 'alternate':
              var alternatelang = attrs.hreflang;
              break;
            case 'prev':
              navigationService.setPrev(text, link);
              break;
            case 'next':
              navigationService.setNext(text, link);
              break;
            case 'start':
              navigationService.setStart(text, link);
              break;
            case 'contents':
              navigationService.setContents(text, link);
              break;
          }
        }
      };
    }]);
}