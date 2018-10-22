import {TestBed, inject} from '@angular/core/testing';
import {CommonsService} from "./Commons.service";
import {TimeService} from "./time/Time.service";

describe("Context service", () => {
  "use strict";

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextService, TimeService]
    });
  });

  it('reminds current time', inject([ContextService, TimeService], (contextService: ContextService, timeService: TimeService) => {
    contextService.setTime('1952-11-24');
    expect(contextService.getCurrentContext().time).toEqual(timeService);
  }));

  it('reminds current location', inject([ContextService, TimeService], (contextService: ContextService) => {
    var lat = 12;
    var lng = 24;
    contextService.setLatLng(lat, lng);

    var currentLocation = contextService.getCurrentContext().space.position.location;
    expect(currentLocation.latitude).toEqual(lat);
    expect(currentLocation.longitude).toEqual(lng);
  }));*/
});