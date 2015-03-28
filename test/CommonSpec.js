describe("Common module", function () {
    'use strict';

    var commonsService;
    var $rootScope;
    var $provide;

    beforeEach(angular.mock.module('rr0.commons', function (_$provide_) {
        $provide = _$provide_;
    }));

    beforeEach(angular.mock.inject(function (_$rootScope_, _commonsService_) {
        commonsService = _commonsService_;
        $rootScope = _$rootScope_;
    }));

    it('convert strings into valid links', function () {
        expect(commonsService.validLink('Bjørn')).toEqual("Bjorn");
        expect(commonsService.validLink('MaussánJaime')).toEqual("MaussanJaime");
        expect(commonsService.validLink('Jérôme Beau')).toEqual("JeromeBeau");
    });
});