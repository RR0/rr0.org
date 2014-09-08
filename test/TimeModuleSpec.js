describe("Time directive", function () {
    var $compile;
    var $rootScope;

    beforeEach(angular.mock.module('rr0.time'));
    org.rr0.context.language = 'fr';

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

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
        expect(element.html()).toContain("10&nbsp;jours et 5&nbsp;secondes");
    });
    it('display dates', function () {
        spyOn(org.rr0.net, "onExists").and.returnValue(true);

        var element = $compile("<time datetime='1997-06-29'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Dimanche 29 Juin 1997");

        element = $compile("<time datetime='1998-07-25 17:20'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Samedi 25 Juillet 1998 à 17:20");
    });
/*    it('display time intervals', function () {
        spyOn(org.rr0.net, "onExists").and.returnValue(true);

        var element = $compile("<time datetime='1997-06-29/1998-05-20'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Mardi 29 Juin 1997 au Mercredi 20 Mai 1998");
    });*/
    it('display dates contextually', function () {
        spyOn(org.rr0.net, "onExists").and.returnValue(true);

        var element = $compile("<time datetime='1997-06-29'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Dimanche 29 Juin 1997");

        element = $compile("<time datetime='1997-06-29 17:20'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("à 17:20");

        element = $compile("<time datetime='1997-06-30'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("lendemain");

        element = $compile("<time datetime='1997-06-31 20:05'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("lendemain à 20:05");

        element = $compile("<time datetime='1997-06-30 19:08'></time>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("veille à 19:08");
    });
});