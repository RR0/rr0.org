describe("Navigation module", function () {
  'use strict';

  var $compile;
  var $rootScope;
  var $provide;
  var outlineService;

  beforeEach(angular.mock.module('rr0.nav', function (_$provide_) {
    $provide = _$provide_;
  }));

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _outlineService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    outlineService = _outlineService_;
    spyOn($rootScope, '$broadcast');
  }));

  it('detect inner links', function () {
    var title1Elem = angular.element('<h2 class="ng-scope">Un premier signe</h2>');
    outlineService.addSection('<h2 class="ng-scope">Un premier signe</h2>', title1Elem);
    expect($rootScope.$broadcast).toHaveBeenCalledWith('sectionAdded', {
      label: '<h2 class="ng-scope">Un premier signe</h2>',
      outlineLabel: '<h2 class="ng-scope">Un premier signe</h2>',
      id: 'Unpremiersigne',
      level: NaN,
      elem: title1Elem
    });
  });
});