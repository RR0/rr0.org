var Location = function (latitude, longitude) {
  'use strict';
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
  'use strict';
  this.azimuth = azimuth;
  this.elevation = elevation;
};
var FieldOfVue = function (orientation, width, height) {
  'use strict';
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
  'use strict';
  this.location = location;
  this.altitude = altitude;
  this.orientation = orientation;
};

var Dimension = function (width, height, depth) {
  'use strict';
  this.width = width;
  this.height = height;
  this.depth = depth;
};
var Space = function (position, dimension) {
  'use strict';
  this.position = position;
  this.dimension = dimension;
};
var Time = function (edtf) {
  'use strict';
  this.edtf = edtf;
};
var Context = function (space, time) {
  'use strict';
  this.space = space;
  this.time = time;
};

angular.module('rr0.context',[])
  .service('contextService', function () {
    'use strict';

    var currentPosition = new Position(new Location(), undefined, new Orientation());
    var currentSpace = new Space(currentPosition, new Dimension());
    var currentTime = new Time();
    var currentContext = new Context(currentSpace, currentTime);

    var contexts = [];

    function setCurrentContext(context) {
      currentContext = context;
    }
    function addContext(context) {
      contexts.push(context);
      setCurrentContext(context);
    }
    return {
      setTime: function (newTime) {
        var newContext = angular.copy(currentContext);
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