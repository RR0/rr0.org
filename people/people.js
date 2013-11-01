var peopleUriPart = "/people/";

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
function setPeople(name) {
    if (name && name.length > 0) {
        context.people = new People(name);
    }
}
/**
 * @param {String} p People's name
 * @param {String} pLink a href link, or a symbolic link, or null
 */
function peopleLink(p, pLink) {
    if (!pLink) {
        pLink = org.cache[p];
        if (!pLink) {
            setPeople(p);
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
    return pLink;
}
function peopleTagHandler(e) {
    var handled = org.hasClass(e, "people");
    if (handled) {
        var l = e.getAttribute("title");    // Alternate (correct for link) name?
        var k = text(e);
        org.linkify(e, k, peopleLink(l ? l : k));
    } else if (e.nodeType != 3) {
        handled = org.hasClass(e, "caviar") || org.hasClass(e, "temoin") || org.hasClass(e, "temoin1") || org.hasClass(e, "temoin2" || org.hasClass(e, "temoin3"));
        if (handled) {
            e.style.width = text(e).length + "em";
            e.innerHTML = "témoin";
            e.title = "Nom du témoin anonymisé";
            if (e.id) e.innerHTML += ' ' + id;
        }
    }
    return false;
}
var authorElement;
function addAuthor(a, aLink, c, cLink) {
    if (a) {
        var t = document.createTextNode(a);
        setPeople(a);
        authorElement = org.newElement("p", org.linkElement(peopleLink(a, aLink), t, "Crédit"));
        authorElement.innerHTML += ": ";
    }
    if (c) {
        if (!authorElement) authorElement = document.createElement("p");
        copyright = c;
        authorElement.appendChild(org.linkElement(cLink, document.createTextNode(c), "Copyright"));
        authorElement.innerHTML += ", ";
    }
    if (authorElement) {
        authorElement.setAttribute("class", "Author");
        authorElement.innerHTML += time.addDate(authorElement);
    }
}
starts.push({
        dir: peopleUriPart,
        label: "<span class='iconic user'></span>",
        title: "Personnes"
    }
);
function peopleInit() {
    if (authorElement) {
        var contentsNode = org.contentsZone;
        contentsNode.insertBefore(authorElement, contentsNode.firstChild);
    }

    org.nounToLink(peopleUriPart + "pilotes.html", "pilote");
    org.nounToLink(peopleUriPart + "ufologues.html", "ufologue");
    org.nounToLink(peopleUriPart + "Astronomes.html", "astronome");
    org.nounToLink(peopleUriPart + "temoins.html", "temoin");
    org.handleTags.apply(null, [peopleTagHandler]);
}
org.onContentsLoaded(peopleInit);
