const angular = require('angular');

// import nav from '../js/nav/nav';
import net from '../js/net';
import people from '../people/people';

declare var google;

export default angular.module('rr0.time', [/*nav, */ net, people])
  .constant('timeRoot', '/time/')
  .run(['timeRoot', 'commonsService', 'netService', 'navigationService', 'timeService', 'peopleService', 'constantClass', function (commonsService, timeRoot, netService, navigationService, timeService, peopleService, constantClass) {
    'use strict';
    navigationService.addStart({
        dir: timeRoot,
        label: "<span class='iconic clock'> <span class='label'>Historique</span></span>",
        title: "Historique"
      }
    );

    var preYearWords = ["en", "de", "à", "dès", "vers", "depuis", "jusqu'en", "année", "années", "fin", "début", "printemps", "été", "automne", "hiver", "avant", "entre", "et", "ou"];
    var preMonthWords = ["en", "de", "à", "dès", "vers", "depuis", "jusqu'en", "mois", "fin", "début", "avant", "entre", "et", "ou"];
    var preDayWords = ["au", "le", "du", "à", "vers", "jusqu'au",
      "Au", "Le", "Du", "À", "Vers", "Jusqu'au"];

    function initGoogleCharts(chartsApiLoaded) {
      google.load('visualization', '1.0', {
        'packages': ['corechart'],
        callback: chartsApiLoaded
      });
    }

    /*if (typeof google !== 'undefined') {
     initGoogleCharts(function () {
     timeService.chartZone = org.rr0.getSideZone("chart");
     var chart = new google.visualization.ColumnChart(timeService.chartZone);
     org.rr0.sideCallbacks = org.rr0.sideCallbacks.concat([timeService.drawChart]);

     for (var i = 0; i < onGoogleChartsLoaded.length; i++) {
     onGoogleChartsLoaded[i]();
     }
     });
     } else {
     console.warn("Google API is not loaded");
     }*/
  }]);
