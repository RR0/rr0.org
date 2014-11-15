describe("People directive", function () {
    var $compile;
    var $rootScope;

    beforeEach(angular.mock.module('rr0.people'));
    org.rr0.context.language = 'fr';

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('deduces people link', function () {
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
    });
});