import { NgModule } from '@angular/core';

import { NavModule } from '../nav/nav.module';
import { CommonsService, constantClass } from '../Commons.service';
import { NetModule } from '../net.module';
import { TimeService } from './Time.service';
import { PeopleService } from '../people/people.service';
import { NetService } from '../Net.service';
import { PeopleModule } from '../people/people.module';
import {NavService} from "../nav/Nav.service";

declare var google;

@NgModule({
  imports: [NavModule, NetModule, PeopleModule],
  declarations: []
})
export class TimeModule {
  constructor(commonsService: CommonsService, netService: NetService, navigationService: NavService, timeService: TimeService, peopleService: PeopleService) {
    'use strict';
    navigationService.addStart({
      dir: timeService.timeRoot,
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
  }
}
