var peopleUriPart = "/people/";

var peoples = {};
function People(p) {
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
function getPeople() {
    return org.rr0.context.people;
}
function setPeopleName(name) {
    if (name && name.length > 0) {
        org.rr0.context.people = new People(name);
        return org.rr0.context.people;
    }
}
/**
 * @param {String} p People's name
 * @param {String} [pLink] a href link, or a symbolic link, or null
 */
function peopleLink(p, pLink) {
    if (p) {
        if (!pLink) {
            pLink = org.cache[p];
            if (!pLink) {
                setPeopleName(p);
                pLink = org.cache[getPeople().lastName];
                if (!pLink) {
                    p = (getPeople().lastName + getPeople().firstName).replace(/[\. \'\-]/g, "");
                    pLink = org.validLink(p);
                } else
                    return pLink;
            } else
                return pLink;
        }
        var firstLinkChar = pLink.charAt(0);
        if (firstLinkChar !== '.' && firstLinkChar !== '/') {
            pLink = peopleUriPart + firstLinkChar.toLowerCase() + "/" + pLink;
        }
        pLink = org.validLink(pLink);
        org.cache[p] = pLink;
        org.cache[getPeople().lastName] = pLink;
    } else {
        pLink = null;
    }
    return pLink;
}
var handleWitness = function (scope, elem, attrs) {
    var txt = elem.text();
    var e = elem[0];
    e.style.width = txt.length + 'em';
    var tint = 50 + (scope.witnessId * 10);
    var caviarBackgroundColor = "rgb(" + tint + ", " + tint + ", " + tint + ")";
    e.style.background = 'linear-gradient(left, white, ' + caviarBackgroundColor + ' 2%, ' + caviarBackgroundColor + ' 98%, white);'
    e.innerHTML = '<a href="/FAQ.html#privacy">témoin' + (scope.witnessId ? ' ' + scope.witnessId : '') + '</a>';
    e.title = 'Nom du témoin anonymisé';
    if (e.id) e.innerHTML += ' ' + id;
};

angular.module('rr0.people', [])
    .service('peopleService', ['timeService', function (timeService) {
        var authors = [];
        var copyright;
        return {
            getCopyright: function () {
                return copyright;
            },
            getTime: function () {
                return timeService.getTime();
            },
            getAuthors: function () {
                return authors;
            },
            setAuthor: function (a, aLink) {
                if (a) {
                    var author = setPeopleName(a);
                    author.link = peopleLink(a, aLink);
                    authors.push(author);
                }
            },
            setCopyright: function (c, cLink) {
                copyright = c;
            },
            addAuthor: function (a, aLink, c, cLink) {
                if (a) {
                    this.setAuthor(a, aLink);
                }
                if (c) {
                    this.setCopyright(c, cLink);
                }
            }
        }
    }])
    .directive('people', function () {
        return {
            restrict: 'C',
            transclude: true,
            scope: true,
            template: "<a href='{{peopleLink}}' translate='no' ng-transclude></a>",
            link: function (scope, elem, attrs) {
                if (elem[0].tagName !== 'TITLE') {
                    var txt = elem.text();
                    var nameKey = attrs.title;    // Alternate (correct for link) name?
                    var peopleName = txt;
                    if (peopleName.length <= 0) {
                        peopleName = nameKey;
                        elem.val(peopleName);
                    }
                    scope.peopleLink = peopleLink(nameKey ? nameKey : peopleName);
                }
            }
        }
    })
    .directive('meta', ['peopleService', function (peopleService) {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var name = attrs.name;
                var content = attrs.content;
                var urlPos = content.indexOf(';url=');
                var link = urlPos > 0 ? content.substring(urlPos) : undefined;
                switch (name) {
                    case 'author':
                        peopleService.setAuthor(content, link);
                        break;
                    case 'copyright':
                        peopleService.setCopyright(content, link);
                        break;
                }
            }
        };
    }])
    .directive('temoin', function () {
        return {
            restrict: 'C',
            link: handleWitness
        }
    })
    .directive('temoin1', function () {
        return {
            restrict: 'C',
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '1';
            }],
            link: function (scope, elem, attrs) {
                handleWitness(scope, elem, attrs);
            }
        }
    })
    .directive('temoin2', function () {
        return {
            restrict: 'C',
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '2';
            }],
            link: function (scope, elem, attrs) {
                handleWitness(scope, elem, attrs);
            }
        }
    })
    .directive('temoin3', function () {
        return {
            restrict: 'C',
            scope: true,
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '3';
            }],
            link: function (scope, elem, attrs) {
                handleWitness(scope, elem, attrs);
            }
        }
    })
    .controller('AuthorCtrl', ['$scope', 'peopleService', function ($scope, peopleService) {
        $scope.authors = peopleService.getAuthors();
        $scope.copyright = peopleService.getCopyright();
        $scope.docTime = peopleService.getTime();
    }])
    .run(function () {
        starts.push({
                dir: peopleUriPart,
                label: "<span class='iconic user'></span>",
                title: "Personnes"
            }
        );

        org.nounToLink(peopleUriPart + "pilotes.html", "pilote");
        org.nounToLink(peopleUriPart + "ufologues.html", "ufologue");
        org.nounToLink(peopleUriPart + "Astronomes.html", "astronome");
        org.nounToLink(peopleUriPart + "temoins.html", "temoin");
    });
