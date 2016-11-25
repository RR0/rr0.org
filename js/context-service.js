angular.module('rr0.context', ['rr0.time'])
  .service('contextService', function () {
    'use strict';

    var Location = function (latitude, longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
    };
    /**
     *
     * @param azimuth degrees (ONES)
     * @param elevation degrees
     * @constructor
     */
    var Orientation = function (azimuth, elevation) {
      this.azimuth = azimuth;
      this.elevation = elevation;
    };
    var FieldOfVue = function (orientation, width, height) {
      this.orientation = orientation;
      this.width = width;
      this.height = height;
    };
    /**
     *
     * @param location
     * @param altitude
     * @param orientation
     * @constructor
     */
    var Position = function (location, altitude, orientation) {
      this.location = location;
      this.altitude = altitude;
      this.orientation = orientation;
    };

    var Dimension = function (width, height, depth) {
      this.width = width;
      this.height = height;
      this.depth = depth;
    };
    var Space = function (position, dimension) {
      this.position = position;
      this.dimension = dimension;
    };
    var Time = function (edtf) {
      this.edtf = edtf;
    };
    var Context = function (space, time) {
      this.space = space;
      this.time = time;
    };

    var currentPosition = new Position(new Location(), undefined, new Orientation());
    var currentSpace = new Space(currentPosition, new Dimension());
    var currentTime = new Time();
    var currentContext = new Context(currentSpace, currentTime);
    addContext(currentContext);

    var contexts = [];

    function setCurrentContext(context) {
      currentContext = context;
    }

    function addContext(context) {
      contexts.push(context);
      setCurrentContext(context);
    }

    return {
      setTime: function (edtf) {
        var newContext = angular.copy(currentContext);
        var newTime = new Time(edtf);
        angular.extend(newContext.time, newTime);
        addContext(newContext);
      },
      setSpace: function (newSpace) {
        var newContext = angular.copy(currentContext);
        angular.extend(newContext.space, newSpace);
        addContext(newContext);
      },
      setPosition: function (position) {
        var newPosition = angular.copy(currentContext.space.position);
        angular.extend(newPosition, position);
        var newSpace = {position: newPosition};
        this.setSpace(newSpace);
      },
      setLatLng: function (lat, lng) {
        this.setPosition({location: new Location(lat, lng)});
      },
      setOrientation: function (newOrientation) {
        this.setPosition({orientation: newOrientation});
      },
      getCurrentContext: function () {
        return contexts[contexts.length - 1];
      }
    };
  });