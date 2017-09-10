const angular = require('angular');

export default scienceModule => {
  var scienceModule = angular.module('rr0.science', ['ngResource']);
  scienceModule
    .factory('Disciplines', function ($resource) {
      "use strict";
      return $resource('/science/disciplines.json');
    });
}