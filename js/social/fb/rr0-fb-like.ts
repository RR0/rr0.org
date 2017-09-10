import angular = require("angular");

interface FbScope extends ng.IScope {
  urlToLike: string;
}

angular.module('rr0.social')
    .directive('rr0FbLike', ['$location', function ($location) {
        "use strict";
        return {
            restrict: 'C',
            template: '<span id="fb-root"></span>' +
            '<div class="fb-like" style="line-height: 0.7em" data-href="{{urlToLike}}" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>',
            link: function (scope: FbScope, elem, attrs) {
                scope.urlToLike = $location.absUrl();
                var fjs = document.getElementsByTagName('script')[0];
                var frag = document.createDocumentFragment();
                var id = 'facebook-jssdk';
                if (!document.getElementById(id)) {
                    var js = document.createElement('script');
                    js.src = '//connect.facebook.net/fr_FR/sdk.js#xfbml=1&appId=104233660507&version=v2.0';
                    js.id = id;
                    frag.appendChild(js);
                }
                fjs.parentNode.insertBefore(frag, fjs);
            }
        };
    }]);