angular.module('rr0', ['rr0.nav', 'rr0.place', 'rr0.foot', 'rr0.context'])
.config(['$logProvider', function($logProvider) {
    'use strict';
    $logProvider.debugEnabled(false);
  }]);