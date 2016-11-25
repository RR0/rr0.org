describe("Context service", function () {
  "use strict";

  var contextService;

  beforeEach(module('rr0.context'));

  beforeEach(inject(function (_contextService_) {
    contextService = _contextService_;
  }));

  it('reminds current time', function () {
    contextService.setTime('1952-11-24');
    expect(contextService.getCurrentContext().time).toEqual(time);
  });
  it('reminds current location', function () {
    var lat =12;
    var lng = 24;
    contextService.setLatLng(lat, lng);

    var currentLocation = contextService.getCurrentContext().space.position.location;
    expect(currentLocation.latitude).toEqual(lat);
    expect(currentLocation.longitude).toEqual(lng);
  });
});