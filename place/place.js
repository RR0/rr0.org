var place = (function () {

    var latestPlaceContext;
    var peoplePoints = [];
    var peoplePath;
    var totalBounds;

    function fitBounds(bounds) {
        myMap.fitBounds(bounds);
        var z = myMap.getZoom();
        if (z > zoomMax) z = zoomMax;
        myMap.setZoom(z);
    }

    function Place(name, latestBounds) {
        var me = this;
        var m = new google.maps.Marker({
            position: latestBounds.getCenter(),
            map: myMap,
            title: name
        });
        m.setMap(myMap);
        var iw = new google.maps.InfoWindow({
            content: name
        });
        google.maps.event.addListener(m, 'click', function () {
            me.show();
        });
        this.show = function () {
            if (latestPlaceContext) {
                latestPlaceContext.close();
            }
            iw.open(myMap, m);
            latestPlaceContext = me;
            fitBounds(latestBounds);
        };
        this.close = function () {
            iw.close();
        };
    }

    var places = [];

    this.parseForPlaces = function () {
//        org.handleTags.apply(this, [placeTagHandler]);
    };

    /**
     *
     * @param lat
     * @param lng
     * @param kmlUrl
     * @param zoom
     * @param mapType "hybrid", "terrain"
     * @param anchor The id of the element that will contain the map. "map-canvas" by default.
     */
    this.loadMap = function (lat, lng, kmlUrl, zoom, mapType, anchor) {
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
    };

    this.geocoder = null;
    var myMap;
    var mapZone;
    var placeCount = 0;
    var zoomMin = 1;
    var zoomMax = 10;
    var mapToggled;
    var mainDiv = document.getElementById("main");

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

    function splitWithMap(contentWidth) {
        mainDiv.style.width = org.rr0.getScreenWidth() + "px";
        org.rr0.leftWidth = contentWidth;
        org.updateDivision();
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

    function mapHide() {
        if (isMapWidthAvailable()) {
            splitWithMap(org.rr0.getScreenWidth());
        } else {
            getSwipe().prev();
        }
    }

    this.toggleMap = function () {
        if (isMapVisible()) {
            mapHide();
        } else {
            mapShow();
        }
    };

    this.focusMap = function (i) {
        if (isMapWidthAvailable()) {
            mapShow();
        }
        if (isMapVisible()) {
            mainDiv.style.width = org.rr0.getScreenWidth() + "px";
            places[i].show();
        }
    };

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

    function getGeocoder(callback) {
        if (!this.geocoder) {
            google.load("maps", "3", {
                other_params: "sensor=false",
                callback: function () {
                    place.sideCallbacks = place.sideCallbacks.concat(mapUpdateCallbacks);
                    mapZone = org.getSideZone("map-canvas");
                    onTransitionEnd(org.rr0.contentsZone, mapUpdateCallbacks);
                    mapZone.addEventListener('DOMMouseScroll', function (e) {   // Disable map slide propagation to container sliding zone
                        e.stopPropagation();
                    }, false);

                    this.geocoder = new google.maps.Geocoder();
                    var mapType = "hybrid";
                    var mapOptions = {
                        mapTypeId: mapType, language: "fr"
//                ,minZoom: zoomMin
                    };
                    myMap = new google.maps.Map(document.getElementById(mapZone.id), mapOptions);
                    totalBounds = new google.maps.LatLngBounds();

                    createNavLink("<span class='iconic map_pin_fill'></span>", "javascript:place.toggleMap()", "Affiche carte", "toggleMap", "");
                    headResized();
                    callback(this.geocoder);
                }
            });
        } else {
            callback(this.geocoder);
        }
    }

    function geocode(placeName, element) {
        getGeocoder(function (geocoder) {
            geocoder.geocode({ 'address': placeName}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    peoplePoints.push(loc);
                    totalBounds.extend(loc);
                    var latestBounds = new google.maps.LatLngBounds();
                    latestBounds.extend(loc);
                    var newPlace = new Place(placeName, latestBounds);
                    var parent = element.parentElement;
                    if (parent.tagName == "P" || parent.tagName == "LI") {
                        places.push(newPlace);
                        element.setAttribute("onclick", "place.focusMap(" + (places.length - 1) + ")");
                        element.style.cursor = "pointer";
                        element.title = "Cliquez pour voir la carte";
                    }
                }
            });
        });
    }

    this.setPlace = function (placeName, element) {
        if (placeName) {
            element.id = "place" + ++placeCount;
            geocode(placeName, element);
        }
    };

    return this;
}());

angular.module('rr0.place', [])
    .directive('place', function () { // or lieu
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                var element = elem[0];
                var placeName = element.title ? element.title : org.text(element);
                place.setPlace(placeName, element);
            }
        }
    })
;
