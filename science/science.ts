const angular = require('angular');

export default angular.module('rr0.science', ['ngResource'])
  .factory('Disciplines', function ($resource) {
    "use strict";
    return $resource('/science/disciplines.json');
  });