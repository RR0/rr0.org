var peopleUriPart = "/people/";

var peoples = {

};
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
    return context.people;
}
function setPeopleName(name) {
    if (name && name.length > 0) {
        context.people = new People(name);
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
                pLink = cache[getPeople().lastName];
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
        cache[p] = pLink;
        cache[getPeople().lastName] = pLink;
    } else {
        pLink = null;
    }
    return pLink;
}
var authorElement;
function setAuthor(a, aLink) {
    if (a) {
        var t = document.createTextNode(a);
        setPeopleName(a);
        authorElement = org.newElement("p", org.linkElement(peopleLink(a, aLink), t, "Crédit"));
        authorElement.innerHTML += ": ";
    }
}
function setCopyright(c, cLink) {
    if (!authorElement) {
        authorElement = document.createElement("p");
    }
    copyright = c;
    authorElement.appendChild(org.linkElement(cLink, document.createTextNode(c), "Copyright"));
    authorElement.innerHTML += ", ";
}
function addAuthor(a, aLink, c, cLink) {
    if (a) {
        setAuthor(a, aLink);
    }
    if (c) {
        setCopyright(c, cLink);
    }
    if (authorElement) {
        authorElement.setAttribute("class", "Author");
        authorElement.innerHTML += time.addDate(authorElement);
    }
}
var handleWitness = function (scope, elem, attrs) {
    var txt = elem.text();
    var e = elem[0];
    e.style.width = txt.length + 'em';
    e.innerHTML = '<a href="/FAQ.html#privacy">témoin' + (scope.witnessId ? ' ' + scope.witnessId : '') + '</a>';
    e.title = 'Nom du témoin anonymisé';
    if (e.id) e.innerHTML += ' ' + id;
};

angular.module('rr0.people', [])
    .directive('people', function () {
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                if (elem[0].tagName !== 'TITLE') {
                    var txt = elem.text();
                    var e = elem[0];
                    var nameKey = attrs.title;    // Alternate (correct for link) name?
                    var nameDisplay = txt;
                    if (nameDisplay.length <= 0) {
                        nameDisplay = nameKey;
                    }
                    var linkedPeople = org.linkify(e, nameDisplay, peopleLink(nameKey ? nameKey : nameDisplay));
                    linkedPeople.setAttribute('translate', 'no');
                }
            }
        }
    })
    .directive('meta', [function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var name = attrs.name;
                var content = attrs.content;
                var urlPos = content.indexOf(';url=');
                var link = urlPos > 0 ? content.substring(urlPos) : undefined;
                switch (name) {
                    case 'author':
                        setAuthor(content, link);
                        break;
                    case 'copyright':
                        setCopyright(content, link);
                        break;
                }
            }
        };
    }])
    .directive('body', function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (authorElement) {
                    var contentsNode = org.textZone;
                    contentsNode.insertBefore(authorElement, contentsNode.firstChild);
                }
            }
        }
    })
    .directive('temoin', function () {
        return {
            restrict: 'C',
            scope: true,
            link: handleWitness
        }
    })
    .directive('temoin1', function () {
        return {
            restrict: 'C',
            scope: true,
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '1';
            }],
            link: handleWitness
        }
    })
    .directive('temoin2', function () {
        return {
            restrict: 'C',
            scope: true,
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '2';
            }],
            link: handleWitness
        }
    })
    .directive('temoin3', function () {
        return {
            restrict: 'C',
            scope: true,
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
                $scope.witnessId = '3';
            }],
            link: handleWitness
        }
    })
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
