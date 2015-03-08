describe("Search module", function () {
    'use strict';

    var searchService;
    var $rootScope;
    var $compile;

    beforeEach(angular.mock.module('rr0.nav'));
   // beforeEach(angular.mock.module('rr0-templates'));

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _searchService_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        searchService = _searchService_;
    }));

    describe("Search service", function () {
        it('sends event when results are found', inject(function ($rootScope) {
            $rootScope.$on('searchResult', function (event, data) {
                expect(data.searchInformation.totalResults.length).toBeGreaterThan(0);
            });
            searchService.search('something');
        }));
    });

    describe("Search directive", function () {
        it('display durations in minutes', function () {
     /*       var element = $compile("<div class='search'></div>")($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain("<form");*/
        });
    });
});