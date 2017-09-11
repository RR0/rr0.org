const angular = require('angular');

import {TitleScope} from "./nav/rr0-title";

import nav from './nav/nav';
import place from '../place/place';
import foot from './note/foot';
import context from './rr0-context';
import science from "../science/science";

export interface RR0Window extends Window {
  copyright: string;
}

let ngModule = angular.module('rr0', ['rr0.nav', 'rr0.place', 'rr0.foot', 'rr0.context', 'ui.router', 'rr0.science']);
nav(ngModule);
place(ngModule);
foot(ngModule);
context(ngModule);
science(ngModule);
ngModule
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

