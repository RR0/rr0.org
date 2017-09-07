angular.module('rr0.place')
    .directive('place', ['placeService', 'mapService', function (placeService, mapService) { // or lieu
        'use strict';
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                var title = elem.attr('title');
                var placeName = title ? title : elem.text();
                if (placeName) {
                    var place = placeService.addPlace(placeName);
                    attrs['place-id'] = "place" + place.id;
                    mapService.geocode(place, function (placeOnMap) {
                        var parent = elem.parent();
                        var parentTagName = parent.prop('tagName');
                        if (parentTagName === "P" || parentTagName === "LI") {
                            elem.bind('click', function () {
                                mapService.focusOn(placeOnMap);
                            });
                            elem.css('cursor', 'pointer');
                            elem.attr('title', 'Cliquez pour voir la carte');
                        }
                        mapService.refresh();
                    });
                }
            }
        };
    }]);