angular.module('rr0.commons')
/**
 * Example:
 * <pre><code>
 * <span itemscope itemtype="http://schema.org/QuantitativeValue">
 *   <span itemprop="value">370</span> <span itemprop="unitCode" content="FOT">pieds</span>
 * </span>
 * </code></pre>
 */
  .directive('itemscope', function () {
    'use strict';
    return {
      restrict: 'A',
      scope: {},
      replace: true,
      template: '<span title="{{original}}">{{str}}<span ng-transclude></span></span>',
      transclude: true,
      controller: ['$scope', '$element', function ($scope, $element) {
        function QuantitativeItem() {
          this.unitCodeHandler = function (elem) {
            this.unit = elem.attr('content');
            elem.empty();
          };
          this.valueHandler = function (elem) {
            this.value = elem.text();
            elem.empty();
          };
          var propertyHandlers = {
            'unitCode': this.unitCodeHandler,
            'value': this.valueHandler
          };
          this.footToMetric = function () {
            $scope.original = this.value + ' pieds';
            var FOOT = 0.3048;
            this.unit = "m";
            this.value = this.value * FOOT;
          };
          this.nauticalMileToMetric = function () {
            $scope.original = this.value + ' miles nautiques';
            var NAUTICAL_MILE = 1.852;
            this.unit = "km";
            this.value = this.value * NAUTICAL_MILE;
          };
          this.toLocaleString = function (locale) {
            if (this.unit === 'FOT') {
              this.footToMetric();
            } else
            if (this.unit === 'NMI') {
              this.nauticalMileToMetric();
            }
            return this.value.toLocaleString(locale, {maximumFractionDigits: 2}) + '\u00A0' + this.unit;
          };
          this.setProperty = function (elem) {
            var property = elem.attr('itemprop');
            var setter = propertyHandlers[property];
            setter.apply(this, [elem]);
            if (this.value && this.unit) {
              $scope.str = this.toLocaleString();
            }
          };
        }

        var ItemTypes = {
          'http://schema.org/QuantitativeValue': QuantitativeItem
        };
        var itemTypeKey = $element.attr('itemType');
        var ItemType = ItemTypes[itemTypeKey];
        this.item = new ItemType();
      }]
    };
  })
  .directive('itemprop', function () {
    'use strict';
    return {
      restrict: 'A',
      scope: true,
      require: '^itemscope',
      link: function (scope, elem, attrs, itemscopeCtrl) {
        var item = itemscopeCtrl.item;
        item.setProperty(elem);
      }
    };
  });