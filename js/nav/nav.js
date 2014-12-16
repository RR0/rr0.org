angular.module('rr0.nav', ['ngSanitize', /*'sun.scrollable', */ 'rr0.lang', 'rr0.people', 'rr0.time'])
    .value('host', location.host)
    .constant('hiddenPos', '-100em')
    .filter('unsafe', ['$sce', function ($sce) {
        'use strict';
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);