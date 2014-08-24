/*
 * Foot notes and sources references
 */

/**
 *
 * @param e The element to replace into
 * @param toReplace The text to link in the element contents
 * @param l The link address
 * @param replacement The replacement text, if different from toReplace
 * @param {boolean} cacheIt If the association text->link should be cached (if no fallback)
 * @param {string} [t] title on the link
 */
function checkedLink(e, toReplace, l, replacement, cacheIt, t) {
    if (l) {
        l = org.addEndingSlash(l);
    }
    if (e.className != org.constantClass) {
        if (!replacement) replacement = toReplace;
        var newText = org.text(e).replace(toReplace, replacement);  // Replace text early, the link will come later
        if (e.nodeType == Node.TEXT_NODE) {
            e.nodeValue = newText;
        } else {
            e.innerHTML = newText;
        }
        if (t) {
            e.title = t;
        }
        if (l && l != org.getUri()) {
            toReplace = replacement;
            var failProc = function () {
                var pLink = org.parentLink(l);
                if (org.getUri().indexOf("/time/") < 0) {
                    org.log("failed " + l + " trying " + pLink + " for e'sparent=" + e.parentNode);
                    cacheIt = false;
                    checkedLink(e, toReplace, pLink, replacement, cacheIt, t);
                }
            };
            org.rr0.net.onExists(l, function () {
                if (l != (org.rr0.time.uriPart + "0/0/")) {
                    org.rr0.net.onExists(l + "/index.html", function () {
                        org.log("found link " + l + " for e'sparent=" + e.parentNode);
                        e = org.linkify(e, replacement, l, replacement, cacheIt);
                        if (t) e.title = t;
                    }, failProc);
                }
            }, failProc);
        }
    }
}

/*
 var elements = document.body.getElementsByTagName("*");
 for (i = 0; i < elements.length; i++) {
 for (var h = 0; h < arguments.length; h++) {
 if (arguments[h](elements[i])) break;
 }
 }
 }
 */

function footsources() {
}
function footnotes() {
}
org.onContentsLoaded(footnotes);
angular.module('rr0.foot', [])
    .run(function () {
        document.getElementsByTagName("footer").innerHtml += "";
    })
    .service('footService', [function () {
        this.notesCount = 0;
        this.sourcesCount = 0;
    }])
    .directive('note', ['footService', function (footService) {
        return {
            restrict: 'C',
            scope: true,
            transclude: true,
            template: '<a href="#" title="Cliquez pour voir/cacher" ng-click="visible=!visible"> {{anchor}} </a><span ng-show="visible">– <span ng-transclude></span></span>',
            link: function (scope, elem, attrs) {
                var footCount = ++footService.notesCount;
                scope.anchor = String.fromCharCode(96 + footCount);
                scope.visible = false;
            }
        };
    }]).directive('source', ['footService', function (footService) {
        return {
            restrict: 'C',
            scope: true,
            transclude: true,
            template: '<a href="#" title="Cliquez pour voir/cacher" ng-click="visible=!visible"> {{anchor}} </a><span ng-show="visible">– <span ng-transclude></span></span>',
            link: function (scope, elem, attrs) {
                var footCount = ++footService.sourcesCount;
                scope.anchor = '' + footCount;
                scope.visible = false;
            }
        };
    }])
    .controller('FootCtrl', ['$scope', function ($scope) {
        $scope.isFramed = function () {
            return window !== top;
        };
    }])
;