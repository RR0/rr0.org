describe("Time module", function () {
  'use strict';

  beforeEach(angular.mock.module('rr0.time'/*, function($provide) {
   var mockCommonsService = function() {
   return {
   initStructure: function() { },
   nounToLink: function() { },
   getUri: function() { return 'https://rr0.org/time/something'; },
   zero: function() { },
   capitalizeFirstLetter: function() { },
   addEndingSlash: function() { }
   };
   };
   $provide.service('commonsService', mockCommonsService);
   }*/));

  var $rootScope;
  var $compile;
  var netService;
  var timeService;
  var $q;

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _$q_, _netService_, _timeService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    netService = _netService_;
    timeService = _timeService_;
  }));

  describe("timeService", function () {
    describe("date", function () {
      it("provides months", function () {
        expect(timeService.monthNames()[0]).toBe('janvier');
        expect(timeService.monthNames()[11]).toBe('décembre');
      });
    });
    describe("parse", function () {
      /*  it("parses ISO date", function () {
       var dateMoment1 = org.rr0.time.NewMoment();
       dateMoment1.set
       });*/
      it("parses ISO date", function () {
        var dateMoment = timeService.NewMoment();
        var date = dateMoment.fromString('1998-08-30');
        expect(date.getYear()).toBe(1998);
        expect(date.getMonth()).toBe(8);
        expect(date.getDayOfMonth()).toBe(30);
      });
      it("parses ISO datetime", function () {
        var dateMoment = timeService.NewMoment();
        var date = dateMoment.fromString('1998-08-31 17:35');
        expect(date.getYear()).toBe(1998);
        expect(date.getMonth()).toBe(8);
        expect(date.getDayOfMonth()).toBe(31);
        expect(date.getHour()).toBe(17);
        expect(date.getMinutes()).toBe(35);

        date = dateMoment.fromString('1998-08-31 17:35EDT');
        expect(date.getYear()).toBe(1998);
        expect(date.getMonth()).toBe(8);
        expect(date.getDayOfMonth()).toBe(31);
        expect(date.getHour()).toBe(17);
        expect(date.getMinutes()).toBe(35);
        expect(date.getTimeZone()).toBe(-4);
      });
      /*        describe("contextually", function () {
       var dateMoment = timeService.NewMoment();
       var date = dateMoment.fromString('1998-08-30');

       it("parses day", function () {
       date = dateMoment.fromString('31');
       expect(date.getYear()).toBe(1998);
       expect(date.getMonth()).toBe(8);
       expect(date.getDayOfMonth()).toBe(31);
       });
       });*/
    });
  });
  describe("encode", function () {
    it("ISO string", function () {
      var dateMoment = timeService.NewMoment();
      dateMoment.setYear(1998);
      dateMoment.setMonth(8);
      dateMoment.setDayOfMonth(31);
      expect(timeService.toISOString(dateMoment)).toBe('1998-08-31');

      var timeMoment = timeService.NewMoment();
      timeMoment.setYear(1998);
      timeMoment.setMonth(8);
      timeMoment.setDayOfMonth(31);
      timeMoment.setHour(16);
      timeMoment.setMinutes(38);
      expect(timeService.toISOString(timeMoment)).toBe('1998-08-31T16:38');
    });
  });
  describe("Time directive", function () {
    org.rr0.context.language = 'fr';

    var httpMock = {};
    httpMock.success = function (req) {
      return httpMock;
    };
    httpMock.error = function (req) {
    };

    it("find day of week", function () {
      //expect(timeService.getDayOfWeek(1998, 8, 31)).toBe(1);
      expect(timeService.dayOfWeekName(0)).toBe('dimanche');
      expect(timeService.dayOfWeekName(1)).toBe('lundi');
    });
    it("sets current month", function () {
      timeService.setMonth(2);
      expect(timeService.getMonth()).toBe(2);
    });
    describe("URLs", function () {
      it("recognizes chronology URLs", function () {
        expect(timeService.isTimeURL("/time/1/9/9/0/index.html")).toBe(true);
        expect(timeService.isTimeURL("/science/index.html")).toBe(false);
      });
      it("produces links to chronology pages", function () {
        expect(timeService.yearLink("1990")).toBe("/time/1/9/9/0");
        expect(timeService.yearLink("1990", true)).toBe("/time/1/9/9/");
      });
    });
    it('display durations in minutes', function () {
      var element = $compile("<time datetime='P10M'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("10&nbsp;minutes");

      element = $compile("<time datetime='P1M'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("1&nbsp;minute");
    });
    it('display durations in seconds', function () {
      var element = $compile("<time datetime='P10S'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("10&nbsp;secondes");

      element = $compile("<time datetime='P1S'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("1&nbsp;seconde");
    });
    it('display durations in days', function () {
      var element = $compile("<time datetime='P10D'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("10&nbsp;jours");

      element = $compile("<time datetime='P1D'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("1&nbsp;jour");
    });
    it('display mixed durations', function () {
      var element = $compile("<time datetime='P10D12M5S'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("10&nbsp;jours, 12&nbsp;minutes et 5&nbsp;secondes");

      element = $compile("<time datetime='P12M5S'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("12&nbsp;minutes et 5&nbsp;secondes");

      element = $compile("<time datetime='P10D12M'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("10&nbsp;jours et 12&nbsp;minutes");

      element = $compile("<time datetime='P10D5S'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe("10&nbsp;jours et 5&nbsp;secondes");
    });
    it('display dates', function () {
      spyOn(netService, "onExists").and.returnValue(httpMock);

      var element = $compile("<time>1923-08-06</time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe("Lundi 6 août 1923");

      element = $compile("<time datetime='1997-06-29'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe("Dimanche 29 juin 1997");
    });
    it('display datetimes', function () {
      spyOn(netService, "onExists").and.returnValue(httpMock);

      var element = $compile("<time datetime='1998-07-25 17:20'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe("Samedi 25 juillet 1998 à 17:20");

      element = $compile("<time datetime='1998-07-25 17:00'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe("À 17:00");

      element = $compile("<time datetime='1998-08-26 00:32'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe("Samedi 26 août à 00:32");
    });
    it('display time intervals', function () {
      spyOn(netService, "onExists").and.returnValue(httpMock);

      var element = $compile("<time datetime='1997-06-29/1998-05-20'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("Dimanche 29 juin 1997 au mercredi 20 mai 1998");

      /*    element = $compile("<time datetime='1997-05-29/1997-06-30'></time>")($rootScope);
       $rootScope.$digest();
       expect(element.html()).toContain("Jeudi 29 Mai au Lundi 30 Juin");

       /*        element = $compile("<time datetime='1998-05-20/1998-05-25'></time>")($rootScope);
       $rootScope.$digest();
       expect(element.html()).toContain("Mercredi 20 Mai 1998 au lendemain");*/
    });
    it('display dates contextually', function () {
      spyOn(netService, "onExists").and.returnValue(httpMock);

      var element = $compile("<time datetime='1997-06-29'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("Dimanche 29 juin 1997");

      element = $compile("<time datetime='1997-06-29 17:20'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("À 17:20");

      element = $compile("<time datetime='1997-06-30'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("Lendemain");

      element = $compile("<time datetime='1997-06-31 20:05'></time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("Lendemain à 20:05");

      element = $compile("<time>1997-06-30 19:08</time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("Veille à 19:08");

      element = $compile("<time>19:10:24</time>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("19:10:24");
    });
  });
});
