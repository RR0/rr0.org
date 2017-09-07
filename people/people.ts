const angular = require('angular');


var peoples = {};
function People(p) {
    'use strict';
    var commaPos = p.indexOf(", ");
    if (commaPos > 0) {
        this.lastName = p.substring(0, commaPos);
        this.firstName = p.substring(commaPos + 2);
    } else {
        var namesSplitPos = p.lastIndexOf(' ');
        this.firstName = p.substring(0, namesSplitPos);
        this.lastName = p.substring(namesSplitPos + 1);
    }
    this.toString = function () {
        return this.firstName + ' ' + this.lastName;
    };
}
var handleWitness = function (scope, elem, attrs) {
    'use strict';
    var txt = elem.text();
    var e = elem[0];
    e.style.width = txt.length + 'em';
    var tint = 50 + (scope.witnessId * 10);
    var caviarBackgroundColor = "rgb(" + tint + ", " + tint + ", " + tint + ")";
    e.style.background = 'linear-gradient(left, white, ' + caviarBackgroundColor + ' 2%, ' + caviarBackgroundColor + ' 98%, white);';
    e.innerHTML = '<a href="/FAQ.html#privacy">témoin' + (scope.witnessId ? ' ' + scope.witnessId : '') + '</a>';
    e.title = 'Nom du témoin anonymisé';
    if (e.id) {
        e.innerHTML += ' ' + e.id;
    }
};

(<any>window).copyright = null;

export default angular.module('rr0.people', [/*nav*/])
    .constant('peopleRoot', '/people/')
    .directive('temoin', function () {
        'use strict';
        return {
            restrict: 'C',
            link: handleWitness
        };
    })
    .directive('temoin1', function () {
        'use strict';
        return {
            restrict: 'C',
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '1';
            }],
            link: function (scope, elem, attrs) {
                handleWitness(scope, elem, attrs);
            }
        };
    })
    .directive('temoin2', function () {
        'use strict';
        return {
            restrict: 'C',
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '2';
            }],
            link: function (scope, elem, attrs) {
                handleWitness(scope, elem, attrs);
            }
        };
    })
    .directive('temoin3', function () {
        'use strict';
        return {
            restrict: 'C',
            scope: true,
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '3';
            }],
            link: function (scope, elem, attrs) {
                handleWitness(scope, elem, attrs);
            }
        };
    })
    .controller('AuthorCtrl', ['$scope', 'peopleService', 'timeService', function ($scope, peopleService, timeService) {
        'use strict';
        $scope.authors = peopleService.getAuthors();
        $scope.copyright = peopleService.getCopyright();
        $scope.docTime = timeService.toString(timeService.NewMoment(), timeService.getTime()).replacement;
    }])
    .run(['peopleRoot', 'navigationService', 'commonsService', function (peopleRoot, navigationService, commonsService) {
        'use strict';
        navigationService.addStart({
                dir: peopleRoot,
                label: "<i class='fa fa-user'></i> <span class='label'>Personnes</span></span>",
                title: "Personnes"
            }
        );

        commonsService.nounToLink(peopleRoot + "pilotes.html", "pilote");
        commonsService.nounToLink(peopleRoot + "ufologues.html", "ufologue");
        commonsService.nounToLink(peopleRoot + "Astronomes.html", "astronome");
        commonsService.nounToLink(peopleRoot + "temoins.html", "temoin");
    }]);
