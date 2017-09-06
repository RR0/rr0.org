const angular = require('angular');

import lang from '../lang';
import people from '../../people/people';
import time from '../../time/time';

export default angular.module('rr0.nav', ['ngSanitize', /*'sun.scrollable', */ lang, people, time])
    .value('host', location.host)
    .constant('hiddenPos', '-100em')
    .filter('unsafe', ['$sce', function ($sce) {
        'use strict';
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);