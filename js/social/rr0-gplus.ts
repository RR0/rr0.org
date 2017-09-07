angular.module('rr0.social')
    .directive('rr0Gplus', function () {
        "use strict";
        return {
            restrict: 'C',
            template: '<div class="g-plusone" data-size="medium" data-count="true"></div>',
            link: function (scope, elem, attrs) {
                var fjs = document.getElementsByTagName('script')[0];
                var frag = document.createDocumentFragment();
                var js = document.createElement('script');
                js.src = 'http://apis.google.com/js/plusone.js';
                frag.appendChild(js);
                fjs.parentNode.insertBefore(frag, fjs);
            }
        };
    });