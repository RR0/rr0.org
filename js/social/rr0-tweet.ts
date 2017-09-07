angular.module('rr0.social')
    .directive('rr0Tweet', function () {
        "use strict";
        return {
            restrict: 'C',
            template: '<a href="https://twitter.com/share" class="twitter-share-button" data-count="horizontal">Tweet</a>',
            link: function (scope, elem, attrs) {
                var fjs = document.getElementsByTagName('script')[0];
                var frag = document.createDocumentFragment();
                var js = document.createElement('script');
                js.src = '//platform.twitter.com/widgets.js';
                frag.appendChild(js);
                fjs.parentNode.insertBefore(frag, fjs);
            }
        };
    });