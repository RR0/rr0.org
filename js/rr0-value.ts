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
      scope: {
        precision: '@?'
      },
      replace: true,
      template: '<data value="{{data}}" title="{{original}}">{{str}}<span ng-transclude></span></data>',
      transclude: true,
      controller: ['$scope', '$element', function ($scope, $element) {
        $scope.precision = parseInt($scope.precision || '0', 10);
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
            this.value = this.value * FOOT;
            if (this.value > 1000) {
              this.value = this.value / 1000;
              this.unit = "km";
            } else {
              this.unit = "m";
            }
          };
          this.inchToMetric = function () {
            $scope.original = this.value + ' pouces';
            var INCH = 2.54;
            this.value = this.value * INCH;
            if (this.value > 100) {
              this.value = this.value / 100;
              this.unit = "m";
            } else {
              this.unit = "cm";
            }
          };
          var NAUTICAL_MILE = 1.852;
          this.nauticalMileToMetric = function () {
            $scope.original = this.value + ' miles nautiques';
            this.unit = "km";
            this.value = this.value * NAUTICAL_MILE;
          };
          this.milesPerHourToMetric = function () {
            $scope.original = this.value + ' miles/h';
            var MILE = 1.609344;
            this.unit = "km/h";
            this.value = this.value * MILE;
          };
          this.mileToMetric = function () {
            $scope.original = this.value + ' miles';
            var MILE = 1.609344;
            this.unit = "km";
            this.value = this.value * MILE;
          };
          this.knotsToMetric = function () {
            $scope.original = this.value + ' noeuds';
            this.unit = "km/h";
            this.value = this.value * NAUTICAL_MILE;
          };
          this.toLocaleString = function (locale) {
            if (this.unit === 'FOT') {
              this.footToMetric();
            } else if (this.unit === 'NMI') {
              this.nauticalMileToMetric();
            } else if (this.unit === 'HM') {
              this.milesPerHourToMetric();
            } else if (this.unit === 'SMI') {
              this.mileToMetric();
            } else if (this.unit === 'KTS') {
              this.knotsToMetric();
            } else if (this.unit === 'INH') {
              this.inchToMetric();
            }
            console.log("$scope.precision=%o", $scope.precision);
            return this.value.toLocaleString(locale, {maximumFractionDigits: $scope.precision}) + '\u00A0' + this.unit;
          };
          this.setProperty = function (elem) {
            var property = elem.attr('itemprop');
            var setter = propertyHandlers[property];
            setter.apply(this, [elem]);
            if (this.value && this.unit) {
              $scope.data = this.value + ' ' + this.unit;
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
      link: function (scope, elem, attrs, itemscopeCtrl: any) {
        const item = itemscopeCtrl.item;
        item.setProperty(elem);
      }
    };
  });