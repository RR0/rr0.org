import {TitleScope} from "./nav/rr0-title";

const angular = require('angular');

import nav from './nav/nav';
import place from '../place/place';
import foot from './note/foot';
import context from './rr0-context';
import science from "../science/science";

export default angular.module('rr0', [nav, place, foot, context, 'ui.router', science])
  .config(['$logProvider', function ($logProvider) {
    'use strict';
    $logProvider.debugEnabled(false);
  }])
  .controller('AppController', ['$scope', function ($scope: TitleScope) {
    'use strict';
    $scope.title = '';
    $scope.setTitle = function(newTitle) {
      $scope.title = newTitle;
    };

    $scope.author = '';
    $scope.copyright = '';
  }]);