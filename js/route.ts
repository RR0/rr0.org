function handleUrlRedirect() {
  'use strict';
  return null;
  /*  var path = location.pathname;
   if (path.indexOf('index.new') < 0) {
   location.href = '/index.new.html?p=' + path;
   path = null;
   } else {
   path = location.search.substring(location.search.indexOf('?p=') + 3);
   }
   return path;*/
}
function pageContents(template) {
  'use strict';
  const startMark = '<div class="text">';
  const startIndex = template.indexOf(startMark);
  const endMark = '</div><!--text-->';
  const endIndex = template.indexOf(endMark);
  const templateContents = template.substring(startIndex + startMark.length, endIndex);
  return templateContents;
}
angular.module('rr0')
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    'use strict';
    $stateProvider
      .state('any', {
        url: '*path',
        views: {
          'textView': {
            templateProvider: function ($stateParams, $http) {
              const url = location.pathname;
              return $http.get(url).then(function (response) {
                const template = response.data;
                return pageContents(template);
              });
            },
            controller: function () {
              console.log('time controller');
            }
          }
        }      })
      .state('page', {
        url: '/index.new.html?p =:path',
        templateUrl: function ($stateParams) {
          return $stateParams.path;
        },
        controller: function ($scope) {
          console.log('ok');
        }
      })
      .state('home', {
        url: '^/dist/home',
        views: {
          'textView': {
            templateUrl: '/home.html',
            controller: function ($scope) {
              console.log('home controller');
            }
          }
        }
      })
      .state('time', {
        url: '^/dist/time',
        views: {
          'textView': {
            templateProvider: function ($stateParams, $http) {
              return $http.get('/time').then(function (response) {
                const template = response.data;
                return pageContents(template);
              });
            },
            controller: function () {
              console.log('time controller');
            }
          }
        }
      })
    ;

    /*  $urlRouterProvider.otherwise(function($injector, $location) {
     var path = $location.path(), normalized = path.toLowerCase();
     if (path !== normalized) {
     //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
     $location.replace().path(normalized);
     }
     });*/
  }])
  .run(function ($state, $rootScope) {
    'use strict';
    $state.go('home');
    /*    var page = handleUrl();
     if (page) {
     $state.go('page', {path:page}, {location:false});
     }*/
  });