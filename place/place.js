function Place(n) {
  this.name = n;
}

angular.module('rr0.place', [])
  .service('mapService', [function ($timeout) {
    "use strict";

    var geocoder;
    var myMap;
    var totalBounds;
    var peoplePoints = [];
    var mapZone;
    var latestPlaceOnMap;
    var planetarium;

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

        if (planetarium) {
          planetarium.setLatitude(m.position.lat());
          planetarium.setLongitude(m.position.lng());
          planetarium.draw();
        }

        latestPlaceOnMap = me;
        fitBounds(place.bounds);
      };
      this.close = function () {
        iw.close();
      };
    }

    function initGoogleMaps(mz, callback) {
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
            mapTypeId: mapType
//                ,minZoom: zoomMin
          };
          myMap = new google.maps.Map(document.getElementById(mapZone.id), mapOptions);
          totalBounds = new google.maps.LatLngBounds();
          peoplePath = new google.maps.Polyline({
            path: peoplePoints,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 3
          });
          peoplePath.setMap(myMap);
          callback(geocoder);
        }
      });
    }

    function initSkyMap() {
      planetarium = $.virtualsky({
        id: 'starmap',
        langurl: 'lang/%LANG%.json',
        language: 'fr',
        meteorshowers: true,
        showstarlabels: true,
        showorbits: true,
        ground: true,
        fov: 5,
        projection: 'stereo'
      });
    }

    var init = function (mz, callback) {
      initGoogleMaps(mz, callback);
      initSkyMap();
    };

    var toGeocode = [];

    function geocodeNow(place, callback) {
      geocoder.geocode({'address': place.name}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var loc = results[0].geometry.location;
          peoplePath.getPath().push(loc);
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
      if (z > zoomMax) {
        z = zoomMax;
      }
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

    function addMapButton() {
      var element = document.querySelector('.toggleMap');
      element.style.display = 'inline-block';
      element.title = 'Affiche carte';
      element.onclick = toggleMap;
    }

    var mapUpdateCallbacks = [mapResize];

    function onceMapIsLoaded() {
      geocodeAll(toGeocode);
      addMapButton();
//            if (org.rr0.getScreenWidth() > 1024) {
//                mapShow();
//            }
      onTransitionEnd(org.rr0.contentsZone, mapUpdateCallbacks);
    }

    function isMapWidthAvailable() {
      return org.rr0.getScreenWidth() > 320;
    }

    function isPlanetariumWidthAvailable() {
      return org.rr0.getScreenHeight() > 400;
    }

    function isMapVisible() {
      return org.rr0.leftWidth < org.rr0.getScreenWidth();
    }

    function mapShow() {
      var sideWidth = org.rr0.getScreenWidth() - org.rr0.leftWidth;
      if (sideWidth <= 0) {
        org.rr0.leftWidth = org.rr0.getScreenWidth() * ((100 - 28) / 100);
      }
      splitWithMap(org.rr0.leftWidth);
      //org.rr0.time.drawChart();
    }

    function planetariumShow() {
      $('#starmap').css('height', '25%');
      $('#map-canvas').css('height', '75%');
      planetarium.createSky();
    }

    function splitWithMap(contentWidth) {
      org.rr0.leftWidth = contentWidth;
      org.rr0.updateDivision();
    }

    var mySwipe;

    function getSwipe() {
      if (!mySwipe) {
        mySwipe = new Swipe(org.rr0.contentsZone.parentNode.parentNode, // Create slider after adding zone it will manage
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
      var mapVisible = isMapVisible();
      if (mapVisible) {
        mapHide();
      } else {
        mapShow();
      }
    }

    return {
      geocode: function (p, callback) {
        if (!geocoder) {
          if (toGeocode.length === 0) {
            init(org.rr0.getSideZone("map-canvas"), onceMapIsLoaded);
          }
          toGeocode.push({place: p, callback: callback});
        } else {
          geocodeNow(p, callback);
        }
      },
      focusOn: function (placeOnMap) {
        if (isMapWidthAvailable()) {
          mapShow();
        }
        if (isPlanetariumWidthAvailable()) {
          planetariumShow();
        }
        if (isMapVisible()) {
          placeOnMap.show();
        }
      },
      refresh: function () {
        mapResize();
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
          if (zoom) {
            map.setZoom(zoom);
          }
          var ctaLayer = new google.maps.KmlLayer(kmlUrl);
          ctaLayer.setMap(map);
          peoplePath = new google.maps.Polyline({
            path: peoplePoints,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 3
          });
          peoplePath.setMap(map);
        });
      }
    };
  }])
  .service('placeService', [function () {
    'use strict';
    var places = [];

    return {
      addPlace: function (placeName) {
        var place = new Place(placeName);
        places.push(place);
        place.id = places.length;
        angular.element('.contents').removeClass('no-side');
        return place;
      }
    };
  }]);