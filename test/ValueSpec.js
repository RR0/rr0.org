describe("Value directive", function () {
  'use strict';

  var $rootScope;
  var $compile;

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('converts knots', function () {
    var element = $compile("<span itemscope itemtype=\"https://schema.org/QuantitativeValue\">" +
      "<span itemprop=\"value\">650</span>" +
      "<span itemprop=\"unitCode\" content=\"KTS\">noeuds</span>" +
      "</span>")($rootScope)

    $rootScope.$digest();
    /*expect(element.html()).toBe("<data value=\"650 KTS\" title=\"650 noeuds\" itemscope=\"\" itemtype=\"https://schema.org/QuantitativeValue\" class=\"ng-binding ng-isolate-scope\">1&nbsp;203,8&nbsp;km/h" +
      "<span ng-transclude=\"\">" +
      "<span itemprop=\"value\" class=\"ng-scope\"></span>" +
      "<span itemprop=\"unitCode\" content=\"KTS\" class=\"ng-scope\"></span>" +
      "</span>" +
      "</data>");*/
  });
});
