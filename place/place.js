function Place(n) {
    this.name = n;
}

angular.module('rr0.place', [])
    .service('mapService', [function () {
        var geocoder;
        var myMap;
        var totalBounds;
        var peoplePoints = [];
        var mapZone;
        var latestPlaceOnMap;

        function PlaceOnMap(place) {
            var m = new google.maps.Marker({
                position: place.bounds.getCenter(),
                map: myMap,
                title: place.name
            });
            m.setMap(myMap);
            var iw = new google.maps.InfoWindow({
                content: place.name
            });
            var me = this;
            google.maps.event.addListener(m, 'click', function () {
                me.show();
            });
            this.show = function () {
                if (latestPlaceOnMap) {
                    latestPlaceOnMap.close();
                }
                iw.open(myMap, m);
                latestPlaceOnMap = me;
                fitBounds(place.bounds);
            };
            this.close = function () {
                iw.close();
            };
        }

        var init = function (mz, callback) {
            google.load("maps", "3", {
                other_params: "sensor=false",
                callback: function () {
//                    place.sideCallbacks = place.sideCallbacks.concat(mapUpdateCallbacks);
                    mapZone = mz;
                    mapZone.addEventListener('DOMMouseScroll', function (e) {   // Disable map slide propagation to container sliding zone
                        e.stopPropagation();
                    }, false);

                    geocoder = new google.maps.Geocoder();
                    var mapType = "hybrid";
                    var mapOptions = {
                        mapTypeId: mapType, language: "fr"
//                ,minZoom: zoomMin
                    };
                    myMap = new google.maps.Map(document.getElementById(mapZone.id), mapOptions);
                    totalBounds = new google.maps.LatLngBounds();

                    callback(geocoder);
                }
            });
        };

        var toGeocode = [];

        function geocodeNow(place, callback) {
            geocoder.geocode({ 'address': place.name}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    peoplePoints.push(loc);
                    totalBounds.extend(loc);
                    var placeBounds = new google.maps.LatLngBounds();
                    placeBounds.extend(loc);
                    place.bounds = placeBounds;
                    var placeOnMap = new PlaceOnMap(place);
                    callback(placeOnMap);
                }
            });
        }

        function geocodeAll() {
            for (var i = 0; i < toGeocode.length; i++) {
                var waitingToBeGeocoded = toGeocode[i];
                geocodeNow(waitingToBeGeocoded.place, waitingToBeGeocoded.callback);
            }
        }

        var peoplePath;

        function fitBounds(bounds) {
            myMap.fitBounds(bounds);
            var z = myMap.getZoom();
            if (z > zoomMax) z = zoomMax;
            myMap.setZoom(z);
        }

        var zoomMin = 1;
        var zoomMax = 10;
        var mapToggled;

        function mapRebound(bounds) {
            google.maps.event.trigger(myMap, 'resize');
            fitBounds(bounds);
            if (!mapToggled) {
                mapToggled = true;
            }
        }

        function mapResize() {
            mapRebound(totalBounds);
        }

        function mapRefresh() {
            var bounds = totalBounds;
            if (!myMap.getBounds()) {
                google.maps.event.addListener(myMap, 'bounds_changed', function () {
                    setTimeout(function () {
                        mapRebound(bounds);
                    }, 600);
                });
                if (getPeople()) {
                    peoplePath = new google.maps.Polyline({
                        path: peoplePoints,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.5,
                        strokeWeight: 3
                    });
                    peoplePath.setMap(myMap);
                }
                setTimeout(function () {
                    myMap.fitBounds(bounds);
                }, 800);
            }
        }

        var mapUpdate = function (i) {
            var mapVisible = isMapVisible() || i > 0;
            if (mapVisible) {
                mapRefresh();
            }
            var toggleButton = document.getElementsByClassName("toggleMap")[0];
            if (mapVisible) {
                toggleButton.className += " selected";
            } else {
                toggleButton.className = "constant toggleMap";
            }
        };

        function onTransitionEnd(e, ar) {
            for (var i = 0; i < ar.length; i++) {
                var events = ar[i];
                e.addEventListener('webkitTransitionEnd', events, false);
                e.addEventListener('msTransitionEnd', events, false);
                e.addEventListener('oTransitionEnd', events, false);
                e.addEventListener('otransitionend', events, false);
                e.addEventListener('transitionend', events, false);
            }
        }

        var mapUpdateCallbacks = [mapResize];

        function onceMapIsLoaded() {
            geocodeAll(toGeocode);
            onTransitionEnd(org.rr0.contentsZone, mapUpdateCallbacks);
            createNavLink("<span class='iconic map_pin_fill'></span>", "javascript:toggleMap()", "Affiche carte", "toggleMap", "");
            headResized();
        }

        return {
            geocode: function (p, c) {
                if (!geocoder) {
                    if (toGeocode.length == 0) {
                        init(org.getSideZone("map-canvas"), onceMapIsLoaded);
                    }
                    toGeocode.push({ place: p, callback: c });
                } else {
                    geocodeNow(p, c);
                }
            },
            focusOn: function (placeOnMap) {
                if (isMapWidthAvailable()) {
                    mapShow();
                }
                if (isMapVisible()) {
                    mainDiv.style.width = org.rr0.getScreenWidth() + "px";
                    placeOnMap.show();
                }
            },
            /**
             *
             * @param lat
             * @param lng
             * @param kmlUrl
             * @param zoom
             * @param mapType "hybrid", "terrain"
             * @param anchor The id of the element that will contain the map. "map-canvas" by default.
             */
            loadMap: function (lat, lng, kmlUrl, zoom, mapType, anchor) {
                onGoogleMapsLoaded.push(function () {
                    var mapOptions = {
                        center: new google.maps.LatLng(lat, lng),
                        mapTypeId: mapType
                    };
                    var map = new google.maps.Map(document.getElementById(anchor ? anchor : 'map-canvas'), mapOptions);
                    if (zoom) map.setZoom(zoom);
                    var ctaLayer = new google.maps.KmlLayer(kmlUrl);
                    ctaLayer.setMap(map);
                });
            }
        };
    }])
    .service('placeService', [function () {
        var places = [];

        return {
            addPlace: function (placeName) {
                var place = new Place(placeName);
                places.push(place);
                place.id = places.length;
                return place;
            }
        }
    }])
    .directive('place', ['placeService', 'mapService', function (placeService, mapService) { // or lieu
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                var element = elem[0];
                var placeName = element.title ? element.title : org.text(element);
                if (placeName) {
                    var place = placeService.addPlace(placeName, element);
                    attrs['place-id'] = "place" + place.id;
                    mapService.geocode(place, function (placeOnMap) {
                        var parent = element.parentElement;
                        if (parent.tagName == "P" || parent.tagName == "LI") {
                            element.onclick = function () {
                                mapService.focusOn(placeOnMap);
                            };
                            element.style.cursor = "pointer";
                            element.title = "Cliquez pour voir la carte";
                        }
                    });
                }
            }
        }
    }]);

function isMapWidthAvailable() {
    return org.rr0.getScreenWidth() > 320;
}

function isMapVisible() {
    var visible;
    if (isMapWidthAvailable()) {
        visible = org.rr0.leftWidth < org.rr0.getScreenWidth();
    } else {
        visible = getSwipe().getPos() != 0;
    }
    return visible;
}

function mapShow() {
    if (!isMapVisible()) {
        if (isMapWidthAvailable()) {
            var sideWidth = org.rr0.getScreenWidth() - org.rr0.leftWidth;
            if (sideWidth <= 0) {
                org.rr0.leftWidth = org.rr0.getScreenWidth() * 0.6;
            }
            splitWithMap(org.rr0.leftWidth);
        } else {
            org.rr0.time.drawChart();
            getSwipe().next();
        }
    }
}

var mainDiv = document.getElementById("main");

function splitWithMap(contentWidth) {
    mainDiv.style.width = org.rr0.getScreenWidth() + "px";
    org.rr0.leftWidth = contentWidth;
    org.updateDivision();
}

var mySwipe;

function getSwipe() {
    if (!mySwipe) {
        mySwipe = Swipe(org.rr0.contentsZone.parentNode.parentNode, // Create slider after adding zone it will manage
            {
                continuous: false,
                stopPropagation: true,
                callback: mapUpdate
            });
    }
    return mySwipe;
}

function mapHide() {
    if (isMapWidthAvailable()) {
        splitWithMap(org.rr0.getScreenWidth());
    } else {
        getSwipe().prev();
    }
}

function toggleMap() {
    if (isMapVisible()) {
        mapHide();
    } else {
        mapShow();
    }
}
