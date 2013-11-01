var docLang;
var userLang = "fr";
function setLang(l) {
    if (!l) l = document.documentElement.lang;
    docLang = l;
}
function notifyOrig(original, origFound) {
    org.rr0.net.onExists(original, function () {
        origFound(original);
    }, function () {
        origFound(null);
    });
}
function notifyTrans(translation, transFound) {
    org.rr0.net.onExists(translation, function () {
        transFound(translation);
    }, function () {
        transFound(null);
    });
}
/**
 * Get the URI of the original document, if any.
 * By convention, a suffixed document is a translation, and the original is without this suffix.
 * Thus, an original is always without suffix, typically index.html.
 * So an original english will be index.html (with html lang="en") and its translation index_fr.html,
 * and an original french will be index.html (with html lang="fr") and there will be no translation (or its translation will be index_en.html),
 * If the suffix is not explicit, we need to check.
 *
 * uri:http://rr0.org/data/a/a/a/a/m/Something/index_fr.html --> original is http://rr0.org/data/a/a/a/a/m/Something/index.html
 * uri:http://rr0.org/data/a/a/a/a/m/Something/index.fr --> original is the same
 * uri:http://rr0.org/data/a/a/a/a/m/Something/ --> if http://rr0.org/data/a/a/a/a/m/Something/index_fr.html exists, original is http://rr0.org/data/a/a/a/a/m/Something/index.html
 *
 * @param uri
 */
function checkAlternate(uri, origStatus, transStatus) {
    var dotPos = uri.lastIndexOf(".");
    var pageSpecified = dotPos > 0;
    var translation;
    if (pageSpecified) {    // index.html or index_fr.html
        var sPos = uri.lastIndexOf('_');
        if (sPos == dotPos - 3) {
            var original = uri.substring(0, sPos) + uri.substring(sPos + 3);
            notifyOrig(original, origStatus);
            return;
        } else {
            translation = uri.substr(0, dotPos) + "_" + userLang + uri.substr(dotPos);
        }
    } else {
        translation = org.addEndingSlash(uri) + "index_" + userLang + ".html";
    }
    if (docLang != userLang) {
        notifyTrans(translation, transStatus);
    } else {
        var original = org.addEndingSlash(uri.substring(0, uri.lastIndexOf('/'))) + "index.html";
        notifyTrans(translation, function (trans) {  // If there is a translation it's myself (default priority is to my language)
            if (trans) {    // If there is an translation (myself), check for original
                notifyOrig(original, origStatus);
            }
        });
    }
}
setLang();