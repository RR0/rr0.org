describe("People service", function () {
    "use strict";

    var $compile;
    var $rootScope;
    var peopleService;

    beforeEach(angular.mock.module('rr0.people'));

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _peopleService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        peopleService = _peopleService_;
    }));

/*    it('deduces people link', function () {
        var peopleLink = peopleService.peopleLink('BerlitzCharles');
        expect(peopleLink).toContain('/people/b/BerlitzCharles');
    });*/

});

describe("People directive", function () {
    'use strict';

    var $compile;
    var $rootScope;
    var $provide;
    var peopleService;

    var serviceMock = function() {
        return {
            peopleLink: function(nameKey) {
                return nameKey;
            }
        };
    };
    beforeEach(angular.mock.module('rr0.people'), function (_$provide_) {
        $provide = _$provide_;
        $provide.service('peopleService', serviceMock);
    });
    org.rr0.context.language = 'fr';

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

 /*   it('deduces people link', function () {
        var element = $compile("<span class='people'>Charles Berlitz</span>")($rootScope);
        $rootScope.$digest();
        var html = element.html();
        expect(html).toContain('"/people/b/BerlitzCharles" translate="no"');
    });
    it('supports people with a unique name', function () {
        var element = $compile("<span class='people'>Platon</span>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('/people/p/Platon');
    });
    it('supports people names with accents', function () {
        var element = $compile("<span class='people'>Jérôme Beau</span>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('/people/b/BeauJerome');
    });
    it('deduces link for people with middle name', function () {
        var element = $compile("<span class='people'>Josef Allen Hynek</span>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('/people/h/HynekJosefAllen');
    });
    it('supports title attribute as disambiguation', function () {
        var element = $compile("<span class='people' title='Josef Allen Hynek'>J. A. Hynek</span>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('/people/h/HynekJosefAllen');
    });*/
});