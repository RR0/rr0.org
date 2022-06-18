describe("Navigation module", function () {
    'use strict';

    var $compile;
    var $rootScope;
    var $provide;

    beforeEach(angular.mock.module('rr0.nav', function (_$provide_) {
        $provide = _$provide_;
    }));

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $provide.value('host', 'rr0.org');
    }));

    it('detect inner links', function () {
        var element = $compile("<a href=\"https://rr0.org/path/file.html\">same site link</a>")($rootScope);
        $rootScope.$digest();
        expect(element[0].target).not.toEqual("_blank");
    });
    it('detect local links', function () {
        var element = $compile("<a href=\"#anchor\">local anchor</a>")($rootScope);
        $rootScope.$digest();
        expect(element[0].target).not.toEqual("_blank");
    });
    it('detect outer links', function () {
        var element = $compile("<a href=\"https://example.com/path/file.html\">external link</a>")($rootScope);
        $rootScope.$digest();
        expect(element[0].target).toEqual("_blank");
    });
});
