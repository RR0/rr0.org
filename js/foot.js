/*
 * Foot notes and sources references
 */

var notesCount = 0;
var sourcesCount = 0;

/**
 *
 * @param e The element to replace into
 * @param toReplace The text to link in the element contents
 * @param l The link address
 * @param replacement The replacement text, if different from toReplace
 * @param {boolean} cacheIt If the association text->link should be cached (if no fallback)
 * @param {string} t title on the link
 */
function checkedLink(e, toReplace, l, replacement, cacheIt, t) {
    if (l) {
        l = org.addEndingSlash(l);
    }
    if (e.className != constantClass) {
        if (!replacement) replacement = toReplace;
        var newText = org.text(e).replace(toReplace, replacement);  // Replace text early, the link will come later
        if (e.nodeType == Node.TEXT_NODE) {
            e.nodeValue = newText;
        } else {
            e.innerHTML = newText;
        }
        e.title = t;
        if (l && l != org.getUri()) {
            toReplace = replacement;
            var failProc = function () {
                var pLink = org.parentLink(l);
                if (org.getUri().indexOf("/time/") < 0) {
                    log("failed " + l + " trying " + pLink + " for e'sparent=" + e.parentNode);
                    cacheIt = false;
                    checkedLink(e, toReplace, pLink, replacement, cacheIt, t);
                }
            };
            org.rr0.net.onExists(l, function () {
                if (l != (time.uriPart + "0/0/")) {
                    org.rr0.net.onExists(l + "/index.html", function () {
                        log("found link " + l + " for e'sparent=" + e.parentNode);
                        e = org.linkify(e, replacement, l, replacement, cacheIt);
                        if (t) e.title = t;
                    }, failProc);
                }
            }, failProc);
        }
    }
}

function footerTagHandler(e) {
    var handled = e.tagName === "SPAN";
    if (handled) {
        handled = !e.id;
        if (handled) {
            var footHolder, footLabel, footCount, spanClass = e.className;
            if (spanClass === "note") {
                footHolder = document.getElementById("notes");
                footCount = ++notesCount;
                footLabel = String.fromCharCode(96 + footCount);
            } else if (spanClass === "source") {
                footHolder = document.getElementById("sources");
                footCount = ++sourcesCount;
                footLabel = footCount;
            } else
                footHolder = null;
            handled = footHolder !== null;
            if (handled) {
                var footId = footLabel, footContent = e.innerHTML;

                var footItem = document.createElement("li");
                footItem.id = footId;
                footItem.className = "foot";
                footItem.innerHTML = footContent;
                footHolder.appendChild(footItem);
                /*+ " <a href='#nlink"+count+"' title='retour au texte'>&#8617;</a></li>";*/

                e.id = "see" + footId;
                e.innerHTML = "<a href='#" + footId + "' title='" + org.strip(e) + "'>" + footLabel + "</a>";
            }
        }
    }
    return false;
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
    org.handleTags.apply(null, [footerTagHandler]);
    document.getElementsByTagName("footer").innerHtml += ""
}
org.onContentsLoaded(footnotes);
